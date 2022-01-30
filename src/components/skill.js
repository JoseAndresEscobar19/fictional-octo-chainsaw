import React, { Component } from "react";

export default class Skill extends Component {
  openDetails = (): void => {
    const { onClick } = this.props;
    onClick(this.props);
  };

  render() {
    const { name } = this.props;
    return (
      <span>
        <div className="profile-skill__details-name" onClick={this.openDetails}>
          {name}
        </div>
      </span>
    );
  }
}
