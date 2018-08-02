import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";

class Dashboard extends Component {
  state = {
    shows: [],
    movies: []
  }
  componentDidMount() {
    var parent = this;
    fetch('http://localhost:8181/tvShows')
      .then((response) => response.json())
      .then((responseData) => {
        parent.setState({ "shows": responseData });
      }
      );
      fetch('http://localhost:8080/movies')
      .then((response) => response.json())
      .then((responseData) => {
        parent.setState({ "movies": responseData });
      }
      );
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Total Movies"
                statsValue={this.state.movies.length}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Total TV Shows"
                statsValue={this.state.shows.length}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
