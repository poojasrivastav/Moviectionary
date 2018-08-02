import React, { Component } from "react";

export class Card extends Component {
  render() {
    return (
      <div>
      <div>
          <h4 className="title">{this.props.title}</h4>
        </div>
        <div>
          {this.props.content} 
        </div>
      </div>
    );
  }
}

export default Card;
