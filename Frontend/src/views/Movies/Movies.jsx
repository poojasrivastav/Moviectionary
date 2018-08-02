import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import { MovieCard } from "components/MovieCard/MovieCard.jsx";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
    redirect: false,
    myMovies: []
    } 

    this.editHandler = this.editHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.filterMovies = this.filterMovies.bind(this);
    this.sortMovies = this.sortMovies.bind(this);

  }
  componentDidMount() {
    var omdbapikey = "e5b9ae9d";;
    let movies = [];
    fetch('http://localhost:8080/movies')
      .then((response) => response.json())
      .then((responseData) => {
        movies = responseData;
        //console.log("response", movies);
        for (let count = 0; count < movies.length; count++) {
          let movie = movies[count]
            ; fetch(`http://www.omdbapi.com/?apikey=${omdbapikey}&y=&plot=short&r=json&t=${movie.movieName}`)
              .then((response) => response.json())
              .then((data) => {
                movie.imdbRating = data.imdbRating;
                if (movie.director == null || movie.director == undefined || movie.director == "undefined" || movie.director == "") {
                  movie.director = data.Director;
                }
                if (movie.actors == null || movie.actors == undefined || movie.actors == "undefined" || movie.actors == "") {
                  movie.actors = data.Actors;
                }
                if (movie.imgUrl == null || movie.imgUrl == undefined || movie.imgUrl == "undefined" || movie.imgUrl == "") {
                  movie.imgUrl = data.Poster;
                }
                movies[count] = movie;
                window.localStorage.setItem("completeMovieList", JSON.stringify(movies));
                //console.log("windows", window.localStorage.getItem("completeMovieList"))
                this.setState({
                  open: false,
                  myMovies: movies
                });
              });
        }
      });


  }
  componentDidUnMount(){
    window.localStorage.setItem("completeMovieList", null);
  }
 
  addNewMovie = () => {
    window.localStorage.setItem("selectedMovie", null);
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='addMovie' />
    }
  }
  editHandler(movieId) {

    let movies = this.state.myMovies;
    for (let index = 0; index < movies.length; index++) {
      if (movies[index].movieId == movieId) {
        window.localStorage.setItem("selectedMovie", JSON.stringify(movies[index]));
        this.setState({
          redirect: true
        })
        break;
      }
    }
  }
  deleteHandler(movieId) {
    let movies = this.state.myMovies;
    for (let index = 0; index < movies.length; index++) {
      if (movies[index].movieId == movieId) {
        movies.splice(index, 1);
        fetch('http://localhost:8080/deleteMovie?movieId=' + movieId)
          .then((response) => response.json())
          .then((responseData) => { })
        break;
      }
    }
    window.localStorage.setItem("completeMovieList", JSON.stringify(movies));
    this.setState({
      open: false,
      myMovies: movies
    });
  }
  filterMovies(event) {
    var completeList = JSON.parse(window.localStorage.getItem("completeMovieList"));
    let movies = completeList;
    let temp = [];
    if (event.target.value == "") {
      this.setState({
        open: false,
        myMovies: completeList
      });
    } else {
      let count = -1;
      for (let movie of movies) {
        count++;
        if ((movie.movieName.toLowerCase()).indexOf(event.target.value.toLowerCase()) != -1) {
          temp.push(movie);
        }
      }
      this.setState({
        open: false,
        myMovies: temp
      });
    }

  }
  sortMovies(event) {
    var sortValue = event.target.value;
    var movies = this.state.myMovies;
    if (sortValue == "movieNameASC") {
      movies.sort(
        function (x, y) {
          return x.movieName.toLowerCase() > y.movieName.toLowerCase();
        }
      );
    } else if (sortValue == "movieNameDESC") {
      movies.sort(
        function (x, y) {
          return x.movieName.toLowerCase() < y.movieName.toLowerCase();
        }
      );
    } 
    
    this.setState({
      open: false,
      myMovies: movies
    });
  }
  render() {

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={8} sm={6}>
              <div className="form-group has-feedback">
                <input type="text" className="form-control" placeholder="Search Movies By Name" onChange={(e) => this.filterMovies(e)} />
                <span className="glyphicon glyphicon-search form-control-feedback"></span>
              </div>
            </Col>
            <Col lg={2} sm={3}>
              <select placeholder="Filter By" style={{ "width": "100%", "height": "35px" }} onChange={(e) => this.sortMovies(e)}>
                <option value="">FIlter By</option>
                <option value="movieNameASC">Movie Name(ASC)</option>
                <option value="movieNameDESC">Movie Name(DESC)</option>
                
              </select>
            </Col>
            <Col lg={2} sm={3}>
              {this.renderRedirect()}
              <button type="button" className="btn btn-danger pullRight " onClick={() => this.addNewMovie()} style={{ marginBottom: '1em', "float": "right" }}   >
                <span className="glyphicon glyphicon-plus"></span> Add New
            </button>
            </Col>
          </Row>

          <Row>
            {this.state.myMovies.map((prop, key) => {
              return (
                <Col lg={3} sm={6}>
                  <MovieCard
                    key={prop.movieId}
                    movieId={prop.movieId}
                    movieName={prop.movieName}
                    certificate={prop.certificate}
                    imgUrl={prop.imgUrl}
                    director={prop.director}
                    releaseDate={prop.releaseDate}
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

export default Movies;
