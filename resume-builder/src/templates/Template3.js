import React from "react";
import { FaLinkedin, FaPhone, FaGithub, FaEnvelope , FaLink } from "react-icons/fa";
import { Card, Row, Col } from "react-bootstrap";

const Template3 = ({ formData }) => {
  return (
    <>

      {/* Header Section */}
      <div className="text-center">
        <h1 className="fw-bold">{formData.fullName}</h1>
      </div>

      {/* Contact Section */}
      <div className="d-flex flex-wrap justify-content-center gap-4 ">
       {formData.email &&  <span> <FaEnvelope /> {formData.email}</span>}
        {formData.phone && <span><FaPhone /> {formData.phone}</span>}
        {formData.Linkedin ? (
          <span> <FaLinkedin/> 
            <a href={formData.Linkedin.startsWith("http") ? formData.Linkedin : `https://${formData.Linkedin}`}
              target="_blank" rel="noopener noreferrer" className="ms-1 "
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {formData.Linkedin}
            </a>  </span>
        ) : (
          "abc@Linkedin"
        )}
        {formData.Github ? (
          <span> <FaGithub/>
            <a href={formData.Github.startsWith("http") ? formData.Github : `https://${formData.Github}`}
              target="_blank" rel="noopener noreferrer" className="ms-1 "
              style={{ textDecoration: "none", color: "inherit" }}

            >
              {formData.Github}
            </a> </span>
        ) : (
          "abc@Github"
        )}        </div>

      {/* Summary Section */}
      <Card className="p-3 my-3">
        <h4 className="fw-bold">Summary</h4>
        <p>{formData.summary}</p>
      </Card>

      <Row>
        {/* Left Column */}
        <Col md={7}>
          {/* Education */}
          <Card className="p-3 mb-3">
            <h4 className="fw-bold">Education</h4>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">{edu.degree}</h5>
                  <small >{edu.from} - {edu.to}</small>
                </div>
                <p className="mb-1">{edu.institution}</p>
                <p >Grade : &nbsp; {edu.grade || "Grade"} </p>

              </div>
            ))}
          </Card>
          {/* Projects */}
          <Card className="p-3 mb-3">
            <h4 className="fw-bold">Projects</h4>
            {formData.projects.map((proj, index) => (
              <div key={index} className="mb-2">
                <div className="d-flex justify-content-between"> 
                <h5 className="fw-bold">{proj.name}</h5>
                {proj.Repository && (
                          <p>
                            <strong>
                      <a href={proj.Repository} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none">
                       <FaLink/> GitHub Repository
                      </a>
                    </strong>
                          </p>
                        )}
                        </div>
                <ul>
                  {proj.about
                    .split("• ")
                    .filter(point => point.trim() !== "")
                    .map((point, i) => <li key={i}>{point.trim()}</li>)}
                </ul>
              </div>
            ))}
          </Card>

          {/* Work Experience */}
          <Card className="p-3 mb-3">
            <h4 className="fw-bold">Work Experience</h4>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-3">
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">{exp.jobTitle} – {exp.company}</h5>
                  <small>{exp.from} - {exp.to}</small>
                </div>
                <ul>
                  {exp.description.split("\n").map((point, i) => (
                    <li key={i}>{point.replace(/^•\s*/, "")}</li>
                  ))}
                </ul>

              </div>
            ))}
          </Card>




        </Col>

        {/* Right Column */}
        <Col md={5}>
          {/*  Skills  */}
          <Card className="p-3 mb-3">
            <h4 className="fw-bold"> Skills</h4>
            <div className="d-flex flex-wrap gap-2">
              {(formData?.skills ?? []).map((skill, index) => (
                <span key={index} className="badge bg-secondary p-2 px-3">{skill}</span>
              ))}
            </div>
          </Card>

          {/* Certifications  */}
          <Card className="p-3 mb-3">
            <h4 className="fw-bold">Certifications & Memberships</h4>
            <ul>
              {(formData?.certifications ?? []).map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </Card>

          {/* Achievements - Moved Above */}
          <Card className="p-3 mb-3">
            <h4 className="fw-bold">Achievements</h4>
            <ul>
              {(formData?.achievements ?? []).map((ach, index) => (
                <li key={index}>{ach}</li>
              ))}
            </ul>
          </Card>

          {/* Languages - New Section */}
          <Card className="p-3 mb-3">
            <h4 className="fw-bold">Languages</h4>
            <div className="d-flex flex-wrap gap-2">
              {(formData?.languages ?? []).map((language, index) => (
                <span key={index} className="badge bg-secondary p-2 px-3">{language}</span>
              ))}
            </div>
          </Card>


          {/* Interests - Increased Spacing */}
          <Card className="p-3 mb-3">
            <h4 className="fw-bold">Interests</h4>
            <div className="d-flex flex-wrap gap-3">
              {(formData?.interests ?? []).map((interest, index) => (
                <span key={index} className="badge bg-secondary p-2 px-3">{interest}</span>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

    </>
  );
};

export default Template3;
