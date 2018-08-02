import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";
import NotificationSystem from "react-notification-system";

import { Card } from "components/Card/Card.jsx";

class Movie extends Component {


  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      action: "Add",
      _notificationSystem: null,
      buttonLabel: "Save",
      redirect: false,
      redirectTo: "movies",
      movieId: null,
      movieName: "",
      releaseDate: "",
      certificate: "",
      imgUrl: "",
      wikiUrl: "",
      actors: "",
      director: "",
      youtubeId: ""
    }
    this.save = this.save.bind(this);
    this.loadMovieData = this.loadMovieData.bind(this);
    this.back = this.back.bind(this);


  }

  componentDidMount() {
    if (window.localStorage.getItem("selectedMovie") == null || window.localStorage.getItem("selectedMovie") == "null") {
      this.setState({ "action": "Add" })
      this.setState({ "buttonLabel": "Save" })
    } else {
      this.setState({ "action": "Edit" })
      this.setState({ "buttonLabel": "Update" })
      this.loadMovieData();
    }
  }
  componentDidUnMount() {
    window.localStorage.setItem("selectedMovie", null);
  }

  loadMovieData() {
    var movie = JSON.parse(window.localStorage.getItem("selectedMovie"));
    this.setState({
      movieId: movie.movieId,
      movieName: movie.movieName,
      releaseDate: movie.releaseDate,
      certificate: movie.certificate,
      imgUrl: movie.imgUrl,
      wikiUrl: movie.wikiUrl,
      actors: movie.actors,
      director: movie.director,
      youtubeId: movie.youtubeId
    })

  }


  renderEditRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirectTo} />
    }
  }
  save() {
    var parent = this;
    fetch("http://localhost:8080/movie", {
      body: JSON.stringify({ "movieId": `${(this.state.movieId == null || this.state.movieId == undefined) ? null : this.state.movieId}`, "movieName": `${this.state.movieName}`, "releaseDate": `${(this.state.releaseDate == null || this.state.releaseDate == undefined) ? null : this.state.releaseDate}`, "certificate": `${this.state.certificate}`, "imgUrl": `${this.state.imgUrl}`, "wikiUrl": `${this.state.wikiUrl}`, "actors": `${this.state.actors}`, "director": `${this.state.director}`, "youtubeId": `${this.state.youtubeId}` }), // must match 'Content-Type' header
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
          redirectTo: "movies"
        });

      })
  }
  back() {
    this.setState({
      redirect: true,
      redirectTo: "movies"
    });
  }
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }
  pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }
  releaseDate = () => {
    if (this.state.action == "Add") {
      return (
        <input type="date" value={this.state.releaseDate} onChange={e => this.setState({ releaseDate: e.target.value })} className="form-control" />
      )
    } else {
      return (
        <input type="date" value={"" + new Date(this.state.releaseDate).getFullYear() + "-" + this.pad(new Date(this.state.releaseDate).getMonth() + 1) + "-" + this.pad(new Date(this.state.releaseDate).getDate())} onChange={e => this.setState({ releaseDate: e.target.value })}  className="form-control" placeholder="Enter Date of Release" />
      )
    }
  }
  render() {
    return (

      <div className="content">
        <NotificationSystem ref="notificationSystem" />
        {this.renderEditRedirect()}
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title={this.state.action + " Movie"}
                content={
                  <div className="card-content">
                    <form>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-black required">
                            <label className="control-label">Movie Name</label>
                            <input type="text" value={this.state.movieName} onChange={e => this.setState({ movieName: e.target.value })} className="form-control" placeholder="Enter Movie Name" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-black required">
                            <label className="control-label">Release Date</label>
                            {this.releaseDate()}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-black required">
                            <label className="control-label">Director</label>
                            <input type="text" value={this.state.director} onChange={e => this.setState({ director: e.target.value })} className="form-control" placeholder="Enter Director Name" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-black required">
                            <label className="control-label">Certificate</label>
                            <input type="text" value={this.state.certificate} onChange={e => this.setState({ certificate: e.target.value })} className="form-control" placeholder="Enter Certificate" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group form-black required">
                            <label className="control-label">Actors</label>
                            <input type="text" value={this.state.actors} onChange={e => this.setState({ actors: e.target.value })} className="form-control" placeholder="Enter Lead Actors Name" />
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

export default Movie;
