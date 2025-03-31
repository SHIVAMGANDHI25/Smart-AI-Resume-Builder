import React from "react";
import { FaPlus, FaTrash, FaRobot } from "react-icons/fa";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";
import '../index.css'

const ResumeForm = ({ formData, setFormData, darkMode }) => {
  const [loadingStates, setLoadingStates] = useState({});


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddItem = (section, newItem) => {
    setFormData({
      ...formData,
      [section]: [...(formData[section] || []), newItem],
    });
  };

  const handleRemoveItem = (section, index) => {
    const updatedList = [...formData[section]];
    updatedList.splice(index, 1);
    setFormData({ ...formData, [section]: updatedList });
  };

  const handleItemChange = (section, index, field, value) => {
    const updatedList = [...formData[section]];

    if (typeof updatedList[index] === "string") {
      updatedList[index] = value;
    } else {
      updatedList[index] = { ...updatedList[index], [field]: value };
    }
    setFormData({ ...formData, [section]: updatedList });
  };

  const handleBulletPointInput = (section, index, field, value) => {
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




  const generateAISuggestion = async (section, index = null) => {
    const key = index !== null ? `${section}-${index}` : section;
    setLoadingStates((prev) => ({ ...prev, [key]: true }));

    try {
      let prompt = "";
      const profession = formData.profession?.trim() || "a professional in their field";
      const technologies = formData.profession?.trim() ? `using technologies of a  ${formData.profession}` : "";

      switch (section) {
        case "summary":
          prompt = `Write a professional summary for a ${profession}. The summary should be of around 50 words, engaging, and highlight key strengths.`;
          break;
        case "experience":
          const jobTitle = formData.experience[index]?.jobTitle || "a job position";
          prompt = `Write 3-4 **concise** points for the experience of a ${jobTitle}. Keep each point between 20-24 words.`;
          break;
        case "projects":
          const projectName = formData.projects[index]?.name || "a project";
          prompt = `Write 3-4 **concise** points for the project "${projectName}" built ${technologies}.  
                Each point should be 20-24 words, focusing on the key features, technologies used, and impact.`;
          break;
        default:
          setLoadingStates((prev) => ({ ...prev, [key]: false }));
          return;
      }

      const API_URL = process.env.REACT_APP_API_URL || "https://smart-ai-resume-builder.onrender.com"; // Fallback

      const response = await fetch(`${API_URL}/generate-ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      let aiResponse = data.suggestion || "";

      if (section === "experience") {
        aiResponse = handleBulletPointInput(section, index, "description", aiResponse);
      } else if (section === "projects") {
        aiResponse = handleBulletPointInput(section, index, "about", aiResponse);
      }

      if (!aiResponse || aiResponse.trim() === "") {
        setLoadingStates((prev) => ({ ...prev, [key]: false }));
        return;
      }

      setFormData((prev) => {
        const updatedData = { ...prev };

        if (section === "summary") {
          updatedData.summary = aiResponse;
        } else if (section === "experience" && index !== null) {
          updatedData.experience[index].description = aiResponse;
        } else if (section === "projects" && index !== null) {
          updatedData.projects[index].about = aiResponse;
        }

        return updatedData;
      });
    } catch (error) {
    } finally {
      setLoadingStates((prev) => ({ ...prev, [key]: false }));
    }
  };





  return (
    <Container className="mt-4">
      <Card className={`p-4 border shadow-lg rounded-lg ${darkMode ? "bg-dark text-light-grey" : "bg-white text-black"}`}>
        <h2 className="mb-4 text-center">Resume Form</h2>

        <Form>
          {/* Full Name */}
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter full name" />
          </Form.Group>

          {/* Profession */}
          <Form.Group className="mb-3">
            <Form.Label>Profession</Form.Label>
            <Form.Control type="text" name="profession" value={formData.profession || ""} onChange={handleChange} placeholder="Enter your profession (e.g., Software Engineer, Data Scientist)" />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
          </Form.Group>

          {/* Phone */}
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
          </Form.Group>

          {/* LinkedIn & GitHub */}
          <Form.Group className="mb-3">
            <Form.Label>LinkedIn URL</Form.Label>
            <Form.Control type="text" name="Linkedin" value={formData.Linkedin} onChange={handleChange} placeholder="Enter LinkedIn URL" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>GitHub URL</Form.Label>
            <Form.Control type="text" name="Github" value={formData.Github} onChange={handleChange} placeholder="Enter GitHub URL" />
          </Form.Group>

          {/* Summary */}
          <Form.Group className="mb-4">
            <Form.Label>Summary</Form.Label>
            <Form.Control as="textarea" rows={3} name="summary" value={formData.summary} onChange={handleChange} placeholder="Enter a short summary or Generate with AI" />
            <Button
              variant="info"
              className="mt-2"
              onClick={() => generateAISuggestion("summary")}
              disabled={loadingStates["summary"]}
            >
              <FaRobot /> {loadingStates["summary"] ? "Generating..." : "Generate AI Suggestion"}
            </Button>

          </Form.Group>

          {/* Education Section */}
          <div className="mb-4">
            <h4 className="mb-3">Education</h4>
            {formData.education?.map((item, index) => (
              <Card key={index} className={`p-3 mb-3 border shadow-sm rounded-lg ${darkMode ? "bg-dark text-light-grey" : "bg-white text-black"}`}
              >
                <Row className="g-3">
                  <Col sm={6}><Form.Label>Degree</Form.Label><Form.Control type="text" value={item.degree || ""} placeholder="Enter Degree" onChange={(e) => handleItemChange("education", index, "degree", e.target.value)} /></Col>
                  <Col sm={6}><Form.Label>Institution</Form.Label><Form.Control type="text" value={item.institution || ""} placeholder="Enter Institution" onChange={(e) => handleItemChange("education", index, "institution", e.target.value)} /></Col>
                  <Col sm={6}><Form.Label>From</Form.Label><Form.Control type="month" value={item.from || ""} onChange={(e) => handleItemChange("education", index, "from", e.target.value)} /></Col>
                  <Col sm={6}><Form.Label>To</Form.Label><Form.Control type="month" value={item.to || ""} onChange={(e) => handleItemChange("education", index, "to", e.target.value)} /></Col>
                  <Col sm={12}><Form.Label>Grade</Form.Label><Form.Control type="text" value={item.grade || ""} placeholder="Enter Grade" onChange={(e) => handleItemChange("education", index, "grade", e.target.value)} /></Col>
                </Row>
                <div>
                  <Button variant="danger" className="mt-2" onClick={() => handleRemoveItem("education", index)}>
                    <FaTrash /> Remove
                  </Button>
                </div>
              </Card>
            ))}
            <Button variant="success" className="mb-3" onClick={() => handleAddItem("education", { degree: "", institution: "", from: "", to: "", grade: "" })}>
              <FaPlus /> Add Education
            </Button>
          </div>

          {/* Experience & Projects */}
          <div className="mb-4">
            <h4 className="mb-3">Experience</h4>
            {formData.experience?.map((item, index) => (
              <Card key={index} className={`p-3 mb-3 border shadow-sm rounded-lg ${darkMode ? "bg-dark text-light-grey" : "bg-light text-black"}`}
              >
                <Row className="g-3">
                  <Col sm={6}><Form.Label>Job Title</Form.Label><Form.Control type="text" value={item.jobTitle || ""} placeholder="Enter Job title" onChange={(e) => handleItemChange("experience", index, "jobTitle", e.target.value)} /></Col>
                  <Col sm={6}><Form.Label>Company</Form.Label><Form.Control type="text" value={item.company || ""} placeholder="Enter Company Name" onChange={(e) => handleItemChange("experience", index, "company", e.target.value)} /></Col>
                  <Col sm={6}><Form.Label>From</Form.Label><Form.Control type="month" value={item.from || ""} onChange={(e) => handleItemChange("experience", index, "from", e.target.value)} /></Col>
                  <Col sm={6}><Form.Label>To</Form.Label><Form.Control type="month" value={item.to || ""} onChange={(e) => handleItemChange("experience", index, "to", e.target.value)} /></Col>
                  <Col sm={12}><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={2} placeholder="Enter description or generate with AI" value={item.description || ""} onChange={(e) => handleItemChange("experience", index, "description", e.target.value)} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const updatedText = item.description + "\n• ";
                      handleItemChange("experience", index, "description", updatedText);
                    }
                  }} /></Col>
                </Row>
                <div>
                  <Button
                    variant="info"
                    className="mt-2"
                    onClick={() => generateAISuggestion("experience", index)}
                    disabled={loadingStates[`experience-${index}`]}
                  >
                    <FaRobot /> {loadingStates[`experience-${index}`] ? "Generating..." : "Generate AI Suggestion"}
                  </Button> &nbsp;
                  <Button variant="danger" className="mt-2" onClick={() => handleRemoveItem("experience", index)}>
                    <FaTrash /> Remove
                  </Button>
                </div>
              </Card>
            ))}
            <Button variant="success" className="mb-3" onClick={() => handleAddItem("experience", { jobTitle: "", company: "", from: "", to: "", description: "" })}>
              <FaPlus /> Add Experience
            </Button>
          </div>

          {/* Projects Section  */}
          <div className="mb-4">
            <h4 className="mb-3">Projects</h4>
            {formData.projects?.map((item, index) => (
              <Card key={index} className={`p-3 mb-3 border shadow-sm rounded-lg ${darkMode ? "bg-dark text-light-grey" : "bg-light text-black"}`}
              >
                <Form.Label>Project Name</Form.Label>
                <Form.Control type="text" value={item.name || ""} placeholder="Enter Project Name" onChange={(e) => handleItemChange("projects", index, "name", e.target.value)} />
                <Form.Label>Github-Repository</Form.Label>
                <Form.Control type="text" value={item.Repository || ""} placeholder="Enter Github repository URL" onChange={(e) => handleItemChange("projects", index, "Repository", e.target.value)} />
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={2} placeholder="Enter description or generate with AI" value={item.about || ""} onChange={(e) => handleItemChange("projects", index, "about", e.target.value)} onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); 
                    const updatedText = item.about + "\n• "; 
                    handleItemChange("projects", index, "about", updatedText);
                  }
                }} />
                <div>
                  <Button
                    variant="info"
                    className="mt-2"
                    onClick={() => generateAISuggestion("projects", index)}
                    disabled={loadingStates[`projects-${index}`]}
                  >
                    <FaRobot /> {loadingStates[`projects-${index}`] ? "Generating..." : "Generate AI Suggestion"}
                  </Button>
                  &nbsp;
                  <Button variant="danger" className="mt-2" onClick={() => handleRemoveItem("projects", index)}>
                    <FaTrash /> Remove
                  </Button>
                </div>
              </Card>
            ))}
            <Button variant="success" className="mb-3" onClick={() => handleAddItem("projects", { name: "", about: "" })}>
              <FaPlus /> Add Project
            </Button>
          </div>

          {/* Skills, Achievements, Certifications, Interests , languages */}
          {["skills", "achievements", "certifications", "interests", "languages"].map((key) => (
            <div key={key} className="mb-4">
              <h4 className="mb-3">{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
              {formData[key]?.map((item, index) => (
                <div key={index} className="d-flex gap-2 align-items-center mb-2">
                  <Form.Control type="text" value={item} onChange={(e) => handleItemChange(key, index, null, e.target.value)} placeholder={`Enter ${key}`} />
                  <Button variant="danger" onClick={() => handleRemoveItem(key, index)}>
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button variant="success" className="mb-3" onClick={() => handleAddItem(key, "")}>
                <FaPlus /> Add {key.charAt(0).toUpperCase() + key.slice(1)}
              </Button>
            </div>
          ))}
        </Form>
      </Card>
    </Container>

  );
};

export default ResumeForm;


