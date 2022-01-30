import React, { Component } from "react";
import "../scss/modal.scss";
const proficiencies = {
  master: "Master / Influencer",
  expert: "Expert",
  proficient: "Novice",
  novice: "Proficient",
  "no-experience-interested": "No experience, but interested",
};

export default class Modal extends Component {
  render() {
    const { show, handleClose, skill, similars, jobs } = this.props;
    const showHideClassName = show ? "modal modal--show" : "modal modal--hide";
    return (
      <>
        {skill && (
          <div className={showHideClassName}>
            <section className="modal-main">
              <div className="modal-main__header">
                <button type="button" className="modal-main__close" onClick={handleClose}>
                  <h1>X</h1>
                </button>
                {skill && <h1>{skill.name}</h1>}
              </div>
              <div className="modal-main__body">
                <div className="modal-main__body-details">
                  {skill && (
                    <>
                      <p>Proficiency: {proficiencies[skill.proficiency]}</p>
                      <p>Recommendations: {skill.recommendations}</p>
                    </>
                  )}
                </div>
                <div className="modal-main__body-details">
                  <p>Jobs related to this skill:</p>
                  <div>
                    {jobs &&
                      jobs.map((job) => (
                        <div key={job.id} className="modal-main__wrapper">
                          <img
                            src={job.organizations[0].picture}
                            alt={job.organizations[0].name}
                            className="modal-main__body-picture"
                          />
                          <div className="">
                            <p className="modal-main__body-name">{job.organizations[0].name}</p>
                            <p>{job.objective}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="modal-main__body-details">
                  <p>Other people with this skill:</p>
                  <div>
                    {similars &&
                      similars.map((person) => (
                        <div key={person.username} className="modal-main__wrapper">
                          <img
                            src={person.picture}
                            alt={person.name}
                            className="modal-main__body-picture"
                          />
                          <div className="">
                            <p className="modal-main__body-name">{person.name}</p>
                            <p>{person.professionalHeadline}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </>
    );
  }
}
