import React, { Component, SyntheticEvent } from "react";
import Profile from "./profile";
import "../scss/search.scss";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      person: null,
      strengths: null,
    };
  }

  onBlur = (e: SyntheticEvent): void => {
    const { value } = e.target;
    this.setState({
      query: value,
    });
  };

  submitSearch = (): void => {
    const { query } = this.state;
    if (query) {
      fetch(`https://shrouded-forest-21138.herokuapp.com/profile?name=${query}`)
        .then((res) => res.json())
        .then(
          (res) => {
            this.setState({
              person: res.person,
              strengths: res.strengths,
            });
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  render() {
    const { person, strengths } = this.state;
    return (
      <div className="search">
        <div className="search__form">
          <input
            className="search__form-input"
            type="text"
            placeholder="Search..."
            onBlur={this.onBlur}
          />
          <button className="search__form-button" type="submit" onClick={this.submitSearch}>
            Search
          </button>
        </div>

        <Profile person={person} strengths={strengths} />
      </div>
    );
  }
}
