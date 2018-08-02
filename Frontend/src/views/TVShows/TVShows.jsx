import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import { TVCard } from "components/TVShowCard/TVCard.jsx";

class TVShows extends Component {
  constructor(props) {
    super(props);
    this.editHandler = this.editHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.filterShows = this.filterShows.bind(this);
    this.sortShows = this.sortShows.bind(this);
  }
  componentDidMount() {
    var omdbapikey = "e5b9ae9d";;
    let shows = [];
    fetch('http://localhost:8181/tvShows')
      .then((response) => response.json())
      .then((responseData) => {
        shows = responseData;
        for (let count = 0; count < shows.length; count++) {
          let show = shows[count];
           fetch(`http://www.omdbapi.com/?apikey=${omdbapikey}&y=&plot=short&r=json&t=${show.showName}`)
              .then((response) => response.json())
              .then((data) => {
                show.imdbRating = data.imdbRating;
                if (show.stars == null || show.stars == undefined || show.stars == "undefined" || show.stars == "") {
                  show.stars = data.Actors;
                }
                if (show.imgUrl == null || show.imgUrl == undefined || show.imgUrl == "undefined" || show.imgUrl == "") {
                  show.imgUrl = data.Poster;
                }
                if (show.releaseYear == null || show.releaseYear == undefined || show.releaseYear == "undefined" || show.releaseYear == "") {
                  show.releaseYear = data.Year;
                }
                shows[count] = show;
                window.localStorage.setItem("completeShowList", JSON.stringify(shows));
                this.setState({
                  open: false,
                  myShows: shows
                });
              });
        }
      });


  }
  state = {
    redirect: false,
    myShows: []
  }
  addNewShow = () => {
    window.localStorage.setItem("selectedShow", null);
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='addShow' />
    }
  }
  editHandler(showId) {
    let shows = this.state.myShows;
    for (let index = 0; index < shows.length; index++) {
      if (shows[index].showId == showId) {
        window.localStorage.setItem("selectedShow", JSON.stringify(shows[index]));
        this.setState({
          redirect: true
        })
        break;
      }
    }
  }
  deleteHandler(showId) {
    let shows = this.state.myShows;
    for (let index = 0; index < shows.length; index++) {
      if (shows[index].showId == showId) {
        shows.splice(index, 1);
        fetch('http://localhost:8181/deleteShow?showId=' + showId)
          .then((response) => response.json())
          .then((responseData) => { })
        break;
      }
    }
    window.localStorage.setItem("completeShowList", JSON.stringify(shows));
    this.setState({
      open: false,
      myShows: shows
    });
  }
  filterShows(event) {
    var completeList = JSON.parse(window.localStorage.getItem("completeShowList"));
    let shows = completeList;
    let temp = [];
    if (event.target.value == "") {
      this.setState({
        open: false,
        myShows: completeList
      });
    } else {
      let count = -1;
      for (let show of shows) {
        count++;
        if ((show.showName.toLowerCase()).indexOf(event.target.value.toLowerCase()) != -1) {
          temp.push(show);
        }
      }
      this.setState({
        open: false,
        myShows: temp
      });
    }

  }
  sortShows(event) {
    var sortValue = event.target.value;
    var shows = this.state.myShows;
    if (sortValue == "showNameASC") {
      shows.sort(
        function (x, y) {
          return x.showName.toLowerCase() > y.showName.toLowerCase();
        }
      );
    } else if (sortValue == "showNameDESC") {
      shows.sort(
        function (x, y) {
          return x.showName.toLowerCase() < y.showName.toLowerCase();
        }
      );
    }
    this.setState({
      open: false,
      myShows: shows
    });
  }
  render() {

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={8} sm={6}>
              <div className="form-group has-feedback">
                <input type="text" className="form-control" placeholder="Search Shows By Name" onChange={(e) => this.filterShows(e)} />
                <span className="glyphicon glyphicon-search form-control-feedback"></span>
              </div>
            </Col>
            <Col lg={2} sm={3}>
              <select placeholder="Filter By" style={{ "width": "100%", "height": "35px" }} onChange={(e) => this.sortShows(e)}>
                <option value="">FIlter By</option>
                <option value="showNameASC">Show Name(ASC)</option>
                <option value="showNameDESC">Show Name(DESC)</option>
              </select>
            </Col>
            <Col lg={2} sm={3}>
              {this.renderRedirect()}
              <button type="button" className="btn btn-danger pullRight " onClick={() => this.addNewShow()} style={{ marginBottom: '1em', "float": "right" }}   >
                <span className="glyphicon glyphicon-plus"></span> Add New
            </button>
            </Col>
          </Row>

          <Row>
            {this.state.myShows.map((prop, key) => {
              return (
                <Col lg={3} sm={6}>
                  <TVCard
                    key={prop.showId}
                    showId={prop.showId}
                    showName={prop.showName} 
                    imgUrl={prop.imgUrl}
                    stars={prop.stars}
                    releaseYear={prop.releaseYear}
                    imdbRating={prop.imdbRating}
                    youtubeId={prop.youtubeId}
                    deleteHandler={this.deleteHandler}
                    editHandler={this.editHandler}
                  />
                </Col>);
            })}
          </Row>
        </Grid>
      </div >
    );
  }
}

export default TVShows;
