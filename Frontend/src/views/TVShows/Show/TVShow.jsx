import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";

class TVShow extends Component {


  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      action: "Add",
      _notificationSystem: null,
      buttonLabel: "Save",
      redirect: false,
      redirectTo: "tvShows",
      showId: null,
      showName: "",
      releaseYear: "",
      genre: "",
      imgUrl: "",
      wikiUrl: "",
      stars: "",
      youtubeId: ""
    }
    this.save = this.save.bind(this);
    this.loadShowData = this.loadShowData.bind(this);
    this.back = this.back.bind(this);
  }

  componentDidMount() {
   if (window.localStorage.getItem("selectedShow") == null || window.localStorage.getItem("selectedShow") == "null") {
      this.setState({ "action": "Add" })
      this.setState({ "buttonLabel": "Save" })
    } else {
      this.setState({ "action": "Edit" })
      this.setState({ "buttonLabel": "Update" })
      this.loadShowData();
    }
  }
  componentDidUnMount() {
    window.localStorage.setItem("loadShowData", null);
  }

  loadShowData() {
    var show = JSON.parse(window.localStorage.getItem("selectedShow"));
    this.setState({
      showId: show.showId,
      showName: show.showName,
      releaseYear: show.releaseYear,
      genre: show.genre,
      imgUrl: show.imgUrl,
      wikiUrl: show.wikiUrl,
      stars: show.stars,
      youtubeId: show.youtubeId
    })

  }


  renderEditRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirectTo} />
    }
  }
  save() {
    var parent = this;
    fetch("http://localhost:8181/tvShow", {
      body: JSON.stringify({ "showId": this.state.showId, "showName": `${this.state.showName}`, "releaseYear": `${(this.state.releaseYear == null || this.state.releaseYear == undefined) ? null : this.state.releaseYear}`, "genre": `${this.state.genre}`, "imgUrl": `${this.state.imgUrl}`, "wikiUrl": `${this.state.wikiUrl}`, "stars": `${this.state.stars}`, "youtubeId": `${this.state.youtubeId}` }), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
      .then(function (res) { })
      .then(function (data) {
        parent.setState({
          redirect: true,
          redirectTo: "tvShows"
        });

      })
  }
  back() {
    this.setState({
      redirect: true,
      redirectTo: "tvShows"
    });
  }
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }
  buildOptions() {
    var arr = [];
    for (let i = 2008; i <= 2018; i++) {
      arr.push(<option value={i}>{i}</option>)
    }

    return arr;
  }
  releaseYear() {
    return (
      <select className="form-control" value={this.state.releaseYear} onChange={e => this.setState({ releaseYear: e.target.value })}>
        {this.buildOptions()}
        }
      </select>
    )
  }
  render() {
    return (
      <div className="content">
        {this.renderEditRedirect()}
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title={this.state.action + " TVShow"}
                content={
                  <div className="card-content">
                    <form>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-black required">
                            <label className="control-label">Show Name</label>
                            <input type="text" value={this.state.showName} onChange={e => this.setState({ showName: e.target.value })} className="form-control" placeholder="Enter TV Show Name" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-black required">
                            <label className="control-label">Release Year</label>
                            {this.releaseYear()}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-black required">
                            <label className="control-label">Stars</label>
                            <input type="text" value={this.state.stars} onChange={e => this.setState({ stars: e.target.value })} className="form-control" placeholder="Enter Star Actors" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-black required">
                            <label className="control-label">Genre</label>
                            <input type="text" value={this.state.genre} onChange={e => this.setState({ genre: e.target.value })} className="form-control" placeholder="Enter Genre" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group form-black required">
                            <label className="control-label">Poster URL</label>
                            <input type="text" value={this.state.imgUrl} onChange={e => this.setState({ imgUrl: e.target.value })} className="form-control" placeholder="Enter Poster Image URL" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-black required">
                            <label className="control-label">Wiki URL</label>
                            <input type="text" value={this.state.wikiUrl} onChange={e => this.setState({ wikiUrl: e.target.value })} className="form-control" placeholder="Enter Wikipedia Reference URL" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-black required">
                            <label className="control-label">Youtube Id</label>
                            <input type="text" value={this.state.youtubeId} onChange={e => this.setState({ youtubeId: e.target.value })} className="form-control" placeholder="Youtube Video ID" />
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-danger pull-left" onClick={this.back}>Back</button>
                      <button type="submit" className="btn btn-danger pull-right" onClick={this.save}>{this.state.buttonLabel}</button>
                      <div className="clearfix" ></div>
                    </form>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TVShow;
