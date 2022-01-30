import React, { Component } from "react";
import Details from "./details";
import Modal from "./modal";
import "../scss/profile.scss";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      skill: null,
      similars: null,
      jobs: null,
    };
  }

  hideModal = () => {
    this.setState({ show: false, similars: null, jobs: null });
  };

  openDetails = (skill): void => {
    this.setState({
      skill: skill,
      show: true,
    });
    this.searchPeople(skill);
    this.searchJobs(skill);
  };

  getSkills = (): JSX.Element => {
    const { strengths } = this.props;
    if (strengths) {
      const allSkills = [
        {
          title: "Master / Influencer",
          skills: strengths.filter((skill) => skill.proficiency === "master"),
        },
        {
          title: "Expert",
          skills: strengths.filter((skill) => skill.proficiency === "expert"),
        },
        {
          title: "Novice",
          skills: strengths.filter(
            (skill) => skill.proficiency === "proficient"
          ),
        },
        {
          title: "Proficient",
          skills: strengths.filter((skill) => skill.proficiency === "novice"),
        },
        {
          title: "No experience, but interested",
          skills: strengths.filter(
            (skill) => skill.proficiency === "no-experience-interested"
          ),
        },
      ];
      return (
        <>
          {allSkills.map(({ title, skills }) => (
            <Details
              key={title}
              title={title}
              skills={skills}
              onClick={this.openDetails}
            />
          ))}
        </>
      );
    }
    return <h2>No skills at the moment</h2>;
  };

  searchPeople = (skill): void => {
    const { name, proficiency } = skill;
    if (name) {
      fetch(
        `https://shrouded-forest-21138.herokuapp.com/people?skill=${name}&proficiency=${proficiency}`
      )
        .then((res) => res.json())
        .then(
          (res) => {
            this.setState({
              similars: res.results,
            });
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  searchJobs = (skill): void => {
    const { name, proficiency } = skill;
    if (name) {
      fetch(
        `http://localhost:3035/jobs?skill=${name}&proficiency=${proficiency}`
      )
        .then((res) => res.json())
        .then(
          (res) => {
            this.setState({
              jobs: res.results,
            });
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  render() {
    const { person } = this.props;

    const skillTitle = "Skills and interests";
    return (
      <>
        <div className="container">
          {person && (
            <div className="profile">
              <div className="profile-info">
                <div className="profile-picture">
                  <img
                    src={person.pictureThumbnail}
                    alt={person.name}
                    className="profile-picture__image"
                  />
                </div>
                <div className="profile-details">
                  <h1 className="profile-details__fullname">{person.name}</h1>
                  <p className="profile-details__professional">
                    {person.professionalHeadline}
                  </p>
                </div>
              </div>
              <div className="profile-skill">
                <p className="profile-skill__title">{skillTitle}</p>
                <div className="profile-skill__details">{this.getSkills()}</div>
              </div>
            </div>
          )}
        </div>
        <Modal handleClose={this.hideModal} {...this.state} />
      </>
    );
  }
}
