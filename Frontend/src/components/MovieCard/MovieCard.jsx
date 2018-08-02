import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

export class MovieCard extends Component {

  componentDidMount() {

  }
  FormatTime(time) {
    var date = new Date(time)
    var month = (date.getMonth() + 1);
    var day = (date.getDate());
    var year = (date.getFullYear());
    return month + "/" + day + "/" + year;
  }
  state = {
    redirect: false,
    redirectTo: "addMovie"
  }
  editMovie = () => {
    /*window.localStorage.setItem("selectedMovie", this.props.movieId);
    this.setState({
      redirect: true,
      redirectTo: "addMovie"
    })*/
    this.props.editHandler(this.props.movieId);
  }
  deleteMovie = () => {
    this.props.deleteHandler(this.props.movieId);
  }

  renderEditRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirectTo} />
    }
  }
  embedVideo = () => {
    if (!(this.props.youtubeId == null|| this.props.youtubeId == ""|| this.props.youtubeId == "null")){
      return (<Row >
        <Col xs={12}>
          <iframe style={{ "objectFit": "contain", "maxWidth": "100%", "maxHeight": "190px" }} src={"https://www.youtube.com/embed/" + this.props.youtubeId}>
          </iframe>
        </Col>
      </Row>)
    }
  }
  render() {
    return (
      <div className="card card-stats" >
        {this.renderEditRedirect()}
        <div className="content">
          <Row>
            <Col xs={12}>
              <div >
                <img style={{ "objectFit": "contain", "width": "100%", "maxHeight": "190px" }} src={this.props.imgUrl} className="img-responsive" />
              </div>
            </Col>
          </Row>
          {this.embedVideo()}

          <div className="footer">
            <hr />
            <div className="stats">
              <u>{this.props.movieName} <br /></u>
              Directed By : {this.props.director} <br />
              {this.props.certificate} {this.FormatTime(this.props.releaseDate)}<br />
              IMDB Rating :{this.props.imdbRating} <br />
            </div>
            <hr />

            <button type="button" className="btn btn-info btn-sm edit" onClick={() => this.editMovie()} >
              <span className="glyphicon glyphicon-edit"></span> Edit
            </button>
            <button type="button" className="btn btn-danger btn-sm delete" onClick={() => this.deleteMovie()} style={{ "float": "right" }}   >
              <span className="glyphicon glyphicon-scissors"></span> Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
