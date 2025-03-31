
import React, { useState , useEffect , useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import Sidebar from "./components/Sidebar";

const App = () => {
  const getInitialData = () => {
    const savedData = localStorage.getItem("resumeData");
    return savedData ? JSON.parse(savedData) : {
      fullName: "",
      email: "",
      phone: "",
      Linkedin: "",
      Github: "",
      profession:"",
      summary: "",
      experience: [],
      education: [],
      skills: [],
      projects: [],
      achievements: [],
      certifications: [],
      interests: [],
      languages: [],
      GithubRepo:"" , 
      
    };
  };

  const [formData, setFormData] = useState(getInitialData);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const resumeRef = useRef(null);
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(formData));
  }, [formData]);

  return (
    <Router>
      <div className={`min-h-screen p-6 transition-all duration-300 ${darkMode ? "dark-mode" : "light-mode"}`}>
      
        <div className="row">
          <div className="col-10 col-md-11">
            <Routes>
              <Route path="/" element={<ResumeForm formData={formData} setFormData={setFormData} darkMode={darkMode} />} />
              <Route path="/preview" element={<ResumePreview ref={resumeRef} formData={formData} selectedTemplate={selectedTemplate} />} />
            </Routes>
          </div>
          <div className="col-2 col-md-1">
            <Sidebar resumeRef={resumeRef} darkMode={darkMode} setDarkMode={setDarkMode} selectedTemplate={selectedTemplate}  setSelectedTemplate={setSelectedTemplate}/>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
