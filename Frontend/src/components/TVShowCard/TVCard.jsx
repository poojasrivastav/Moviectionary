import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

export class TVCard extends Component {

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
    redirectTo: "addTVShow"
  }
  editShow = () => {
    this.props.editHandler(this.props.showId);
  }
  deleteShow = () => {
    this.props.deleteHandler(this.props.showId);
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
              <u>{this.props.showName}</u><br/>
              Starring :  {this.props.stars}   <br/>
              Release Year {this.props.releaseYear}<br />
              IMDB Rating :{this.props.imdbRating} <br />
            </div>
            <hr />

            <button type="button" className="btn btn-info btn-sm edit" onClick={() => this.editShow()} >
              <span className="glyphicon glyphicon-edit"></span> Edit
            </button>
            <button type="button" className="btn btn-danger btn-sm delete" onClick={() => this.deleteShow()} style={{ "float": "right" }}   >
              <span className="glyphicon glyphicon-scissors"></span> Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TVCard;
