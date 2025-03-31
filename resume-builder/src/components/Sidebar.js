import React , {useState } from "react";
import {  useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaMoon, FaSun, FaPalette, FaPencilAlt, FaDownload , FaFileCode , FaFileAlt} from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import '../index.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Sidebar = ({ darkMode, setDarkMode, resumeRef , selectedTemplate, setSelectedTemplate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const templates = ["template1", "template2" , "template3"];
  const [showTemplates, setShowTemplates] = useState(false);

  const downloadResume = () => {
    if (!resumeRef?.current) {
      console.error("❌ Resume reference not found.");
      return;
    }
  
    const input = resumeRef.current;
    const downloadButton = input.querySelector(".exclude-from-export"); // Select the button
  
    if (downloadButton) downloadButton.style.display = "none"; // Hide the button before exporting
  
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("Resume.pdf");
  
      if (downloadButton) downloadButton.style.display = "block"; // Show the button after exporting
    });
  };
  

  return (
    <div className="sidebar-container">
      <Tooltip id="tooltip" place="right" effect="solid" />

      {location.pathname === "/" && (
        <>
          <button onClick={() => navigate("/preview")} data-tooltip-id="tooltip" data-tooltip-content="Preview Resume">
            <FaEye />
          </button>
          <button onClick={() => setDarkMode(!darkMode)} data-tooltip-id="tooltip" data-tooltip-content="Switch Theme">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </>
      )}

      {location.pathname === "/preview" && (
        <>
          <button onClick={() => navigate("/")} data-tooltip-id="tooltip" data-tooltip-content="Edit Resume">
            <FaPencilAlt />
          </button>
          <div className="sidebar">
      {/* Button to Toggle Templates */}
      <button 
        data-tooltip-id="tooltip" 
        data-tooltip-content="Select Template"
        onClick={() => setShowTemplates(!showTemplates)}
      >
        <FaPalette />
      </button>

      {/* Template Selection Buttons (Visible when showTemplates is true) */}
      {showTemplates && (
        <div className="template-selection">
          <button
            data-tooltip-id="tooltip"
            data-tooltip-content="Select Template 1"
            className={selectedTemplate === "template1" ? "active" : ""}
            onClick={() => setSelectedTemplate("template1")}
          >
            <FaFileAlt />
          </button>

          <button
            data-tooltip-id="tooltip"
            data-tooltip-content="Select Template 2"
            className={selectedTemplate === "template2" ? "active" : ""}
            onClick={() => setSelectedTemplate("template2")}
          >
            <FaFileCode />
          </button>
          <button
            data-tooltip-id="tooltip"
            data-tooltip-content="Select Template 3"
            className={selectedTemplate === "template3" ? "active" : ""}
            onClick={() => setSelectedTemplate("template3")}
          >
            <FaFileCode />
          </button>
        </div>
      )}
    </div>
          <button data-tooltip-id="tooltip" data-tooltip-content="Download Resume" onClick={downloadResume}>
            <FaDownload />
          </button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
