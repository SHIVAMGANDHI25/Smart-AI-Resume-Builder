import "../styles/Template2.css";
import React from "react";
import { FaLinkedin, FaPhone, FaGithub, FaEnvelope, FaLink } from "react-icons/fa";

const handleBulletPointInput = (value) => {
  if (!value || value.trim() === "") return "";
  const lines = value.split("\n").map((line) => {
    line = line.trim();

    line = line.replace(/^\d+\.\s*/, "");

    line = line.replace(/^[*-]\s*/, "");

    if (!line.startsWith("• ")) {
      return "• " + line;
    }
    return line;
  });

  return lines.join("\n");
};

const Template2 = ({ formData }) => {
  return (
    <div className="template2-container">
      {/* Left Column */}
      <div className="left-column">
        <h2 className="name">{formData.fullName || "Your Name"}</h2>

        <div className="contact-info">
          <p><FaEnvelope /> {formData.email || "your.email@example.com"}</p>
          <p><FaPhone /> {formData.phone || "+1234567890"}</p>
          <p><FaLinkedin />
            <a href={formData.Linkedin || "#"} target="_blank" rel="noopener noreferrer">
              {formData.Linkedin || "linkedin.com/in/yourprofile"}
            </a>
          </p>
          <p><FaGithub />
            <a href={formData.Github || "#"} target="_blank" rel="noopener noreferrer">
              {formData.Github || "github.com/yourgithub"}
            </a>
          </p>
        </div>

        {/* Skills */}
        {formData.skills?.length > 0 && (
          <div className="section">
            <h3 className="fw-bold">Skills</h3>
            <ul>
              {formData.skills.map((skill, index) => (
                <li key={index}>• {skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Achievements */}
        {formData.achievements?.length > 0 && (
          <div className="section">
            <h3 className="fw-bold">Achievements</h3>
            <ul>
              {formData.achievements.map((achievement, index) => (
                <li key={index}>• {achievement}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Certifications */}
        {formData.certifications?.length > 0 && (
          <div className="section">
            <h3 className="fw-bold">Certifications</h3>
            <ul>
              {formData.certifications.map((certification, index) => (
                <li key={index}>• {certification}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Interests */}
        {formData.interests?.length > 0 && (
          <div className="section">
            <h3 className="fw-bold">Interests</h3>
            <ul>
              {formData.interests.map((interest, index) => (
                <li key={index}>• {interest}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="right-column">
        {/* Summary */}
        <div className="section">
          <h3>Summary</h3>
          <p>{formData.summary || "Enter your professional summary here."}</p>
        </div>

        {/* Education */}
        {formData.education?.length > 0 && (
          <div className="section">
            <h3>Education</h3>
            {formData.education.map((edu, index) => (
              <>
                <div key={index}>
                  <div className="d-flex justify-content-between">
                    <h4>{edu.degree || "Degree"}</h4>
                    <p>{edu.from || "Start Year"} - {edu.to || "End Year"}</p>
                  </div>
                </div>
                <p>{edu.institution || "Institution"}</p>
              </>
            ))}
          </div>
        )}

        {/* Experience */}
        {formData.experience?.length > 0 && (
          <div className="section">
            <h3>Work Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index}>
                <div className="d-flex justify-content-between">
                  <h4 className="fw-bold">{exp.jobTitle || "Job Title"} at {exp.company || "Company Name"}</h4>
                  <p>{exp.from || "Start Date"} - {exp.to || "End Date"}</p>
                </div>
                <ul>
                  {handleBulletPointInput(exp.description || "").split("\n").map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {formData.projects?.length > 0 && (
          <div className="section">
            <h3>Projects</h3>
            {formData.projects.map((proj, index) => (
              <div key={index}>
                <div className="d-flex justify-content-between">
                  <h4 className="fw-bold">{proj.name || "Project Name"}</h4>
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
                <ul>
                  {handleBulletPointInput(proj.about || "").split("\n").map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Template2;
