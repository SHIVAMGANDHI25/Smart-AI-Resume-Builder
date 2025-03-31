import React from "react";
import { FaLinkedin, FaPhone, FaGithub, FaEnvelope, FaLink } from "react-icons/fa";
import '../styles/Template3.css'
const Template1 = ({ formData }) => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <h2 className="text-2xl font-bold text-center mb-4">
          {formData.fullName || "Your Name"}
        </h2>
      </div>

      <div className="d-flex gap-4 justify-content-center flex-wrap contact-info">
        <p className="text-center text-gray-600">
          <FaEnvelope /> {formData.email || "your.email@example.com"}
        </p>
        <p className="text-center text-gray-600">
          <FaPhone /> {formData.phone || "+1234567890"}
        </p>
        <p className="text-center text-gray-600">
          <FaLinkedin />
          {formData.Linkedin ? (
            <a
              href={formData.Linkedin.startsWith("http") ? formData.Linkedin : `https://${formData.Linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ms-1"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {formData.Linkedin}
            </a>
          ) : (
            "abc@Linkedin"
          )}
        </p>
        <p className="text-center text-gray-600">
          <FaGithub />
          {formData.Github ? (
            <a
              href={formData.Github.startsWith("http") ? formData.Github : `https://${formData.Github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ms-1"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {formData.Github}
            </a>
          ) : (
            "abc@Github"
          )}
        </p>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold d-flex justify-content-center">Summary</h3>
        <p className="text-center text-gray-600">{formData.summary || "Enter Summary"}</p>
      </div>

      {/* Education */}
      {formData.education?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold d-flex justify-content-center">Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="mt-2">
              <div className="d-flex justify-content-between">
                <h4 className="font-medium">{edu.degree || "Degree"}</h4>
                <p className="text-gray-500">{edu.from || "Start Year"} - {edu.to || "End Year"}</p>
              </div>
              <p className="text-gray-600">{edu.institution || "Institution"}</p>
              <p className="text-gray-500 d-flex">
                Grade : &nbsp; {edu.grade || "Grade"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Work Experience */}
      {formData.experience?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold d-flex justify-content-center">Work Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mt-2">
              <div className="d-flex justify-content-between">
                <h4 className="font-medium">{exp.jobTitle || "Job Title"} at {exp.company || "Company Name"}</h4>
                <p className="text-gray-500">{exp.from || "Start Date"} - {exp.to || "End Date"}</p>
              </div>
              {exp.description ? (
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  {exp.description.split("\n").map((point, i) => (
                    <li key={i}>{point.replace(/^•\s*/, "")}</li>
                  ))}
                </ul>
              ) : (
                <p>No description provided.</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {formData.skills?.length > 0 && (
  <div className="mt-4">
    <h3 className="text-xl font-semibold d-flex justify-content-center">Skills</h3>
    <div className="row">
      {Array.from({ length: Math.ceil(formData.skills.length / 4) }).map((_, colIndex) => (
        <div key={colIndex} className="col-md-4">
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            {formData.skills.slice(colIndex * 4, colIndex * 4 + 4).map((skill, index) => (
              <li key={index}>{skill || "Skill Name"}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
)}

      {/* Projects */}
      {formData.projects?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold d-flex justify-content-center">Projects</h3>
          {formData.projects.map((proj, index) => (
            <div key={index}>
              <div className="d-flex justify-content-between">
                <h4>{proj.name || "Project Name"}</h4>
                {proj.Repository && (
                  <p>
                    <strong>
                      <a href={proj.Repository} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none">
                        <FaLink /> GitHub Repository
                      </a>
                    </strong>
                  </p>
                )}
              </div>
              {proj.about ? (
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  {proj.about.split("\n").map((point, i) => (
                    <li key={i}>{point.replace(/^•\s*/, "")}</li>
                  ))}
                </ul>
              ) : (
                <p>No project details available.</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Achievements, Certifications,  */}
      {["achievements", "certifications"].map((section) =>
  formData[section]?.length > 0 ? (
    <div key={section} className="mt-4">
      <h3 className="text-xl font-semibold d-flex justify-content-center">
        {section.charAt(0).toUpperCase() + section.slice(1)}
      </h3>
      <div className="row">
        {Array.from({ length: Math.ceil(formData[section].length / 4) }).map((_, colIndex) => (
          <div key={colIndex} className="col-md-4">
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              {formData[section].slice(colIndex * 4, colIndex * 4 + 4).map((item, index) => (
                <li key={index}>{item || "No data available"}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  ) : null
)}

{formData.interests?.length > 0 && (
  <div className="mt-4">
    <h3 className="text-xl font-semibold d-flex justify-content-center">Interests</h3>
    <div className="row">
      {Array.from({ length: Math.ceil(formData.interests.length / 4) }).map((_, colIndex) => (
        <div key={colIndex} className="col-md-4">
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            {formData.interests.slice(colIndex * 4, colIndex * 4 + 4).map((interest, index) => (
              <li key={index}>{interest || "Interest"}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
)}

    </>
  );
};

export default Template1;
