import React, { Component } from "react";
import Skill from "./skill";

export default class Details extends Component {

  renderDetails = (): JSX.Element => {
    const { title, skills, onClick } = this.props;
    if (skills && skills.length) {
      return (
        <>
          <p>{title}</p>
          {skills.map((skill) => (
            <Skill key={skill.id} onClick={onClick} {...skill} />
          ))}
        </>
      );
    }
    return <></>;
  };

  render() {
    return this.renderDetails();
  }
}
