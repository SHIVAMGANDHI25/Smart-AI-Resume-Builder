import React ,{ useState , useEffect ,  forwardRef } from "react";
import { Container , Button , Spinner  , Modal} from "react-bootstrap";
import { FaRobot } from "react-icons/fa";
import { marked } from "marked";
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";
import Template3 from "../templates/Template3";
import '../styles/ResumePreview.css'
const ResumePreview = forwardRef(({ formData ,  selectedTemplate}, ref) => {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "template1":
        return <Template1 formData={formData} />;
      case "template2":
        return <Template2 formData={formData} />;
      case "template3":
        return <Template3 formData={formData} />;
      default:
        return <Template1 formData={formData} />; // Default template
    }
  };
  const API_URL = process.env.REACT_APP_API_URL || "https://smart-ai-resume-builder.onrender.com"; 

  const handleAIResumeFeedback = async () => {
    setLoading(true);
    setFeedback(""); // Clear previous feedback
   
    try {
      const response = await fetch(`${API_URL}/resume-feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: formData })
      });
      
  
      const data = await response.json();
      const htmlFeedback = marked.parse(data.feedback);

      // let cleanedFeedback = data.feedback
      // .replace(/^##+\s*/gm, "")                                // Remove markdown headings
      // .replace(/^\*\*(.*?)\*\*/gm, "<b>$1</b>")                // Bold entire lines like "**Score: 65/100**"git a
      // .replace(/[*-]\s*\*\*(.*?)\*\*:/g, "• <b>$1:</b>")       // Bullets with bold headers inside
      // .replace(/[*-]\s*/g, "• ")                               // All other bullet points
      // .replace(/\n{2,}/g, "<br><br>")                          // Double line breaks to <br><br>
      // .replace(/\n/g, "<br>");
      setFeedback(htmlFeedback)
    setShowModal(true);    
  } catch (error) {
      setFeedback("Error fetching AI feedback.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetch(`${API_URL}/resume-feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeData:formData })
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setFeedback(data.feedback);
      })
      .catch(() => {}); 

  }, );
  

  return (
    <>
    <Container className="mt-4">
       <div ref={ref} id="resume-preview" className="p-4 border rounded-lg shadow-lg bg-white">
       {renderTemplate()}
       <div className="text-center mt-3 exclude-from-export ">
          <Button variant="info" onClick={handleAIResumeFeedback} disabled={loading}>
            <FaRobot /> {loading ? <Spinner size="sm" animation="border" /> : "Get AI Feedback"}
          </Button>
        </div>

        </div>
   
    </Container>
    <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg" >
        <Modal.Header closeButton>
          <Modal.Title>📄 AI Resume Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto", padding: "15px" }}>
        <div
  style={{ whiteSpace: "pre-line", textAlign: "left" }}
  dangerouslySetInnerHTML={{ __html: feedback }}
/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
    
  );
});

export default ResumePreview;


