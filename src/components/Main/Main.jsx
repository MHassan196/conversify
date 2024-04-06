import React, { useContext } from "react";
import "./Main.css";
import userProf from "../../assets/man2.jpg";
import miniLogo from "../../assets/mainminilogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faLightbulb,
  faMessage,
  faCode,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import sendIcon from "../../assets/send_icon.png";
import { Context } from "../../context/Context";
import Sidebar from "../Sidebar/Sidebar";
import ResponsiveSidebar from "../Sidebar/ResponsiveSidebar";

function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    extended,
    setExtended,
    setResponsiveSidebarOpen,
    newChat
  } = useContext(Context);

  const handleToggleSidebar = (e) => {
    e.stopPropagation();
    setResponsiveSidebarOpen((prev) => !prev);
  };

  const handleKeyUp = (e) => {
    if (input && e.key === 'Enter') {
      onSent();
    }
  };

  return (
    <div className="main">
      <ResponsiveSidebar />
      <div className="nav">
        <div className="nav-icon-name">
          <FontAwesomeIcon
            icon={faBars}
            className="menu nav-menu-icon"
            onClick={(e) => handleToggleSidebar(e)}
          />

          <p onClick={() => newChat()}>Conversify</p>
        </div>
        <img src={userProf} alt="" />
      </div>
      
      <div className="container">
        <div className="main-container">
          {!showResult ? (
            <>
              <div className="greet">
                <p>
                  <span>Hello,</span>
                </p>
                <p>How can I help you today?</p>
              </div>

              <div className="cards">
                <div className="card">
                  <p>
                    Suggest beautiful places to see on an upcoming road trip
                  </p>
                  <FontAwesomeIcon icon={faCompass} className="card-icon" />
                </div>
                <div className="card">
                  <p>Breifly summarize this concept: Urban planning</p>
                  <FontAwesomeIcon icon={faLightbulb} className="card-icon" />
                </div>
                <div className="card hidden-card">
                  <p>Brainstrom team bonding activites for out work retreat</p>
                  <FontAwesomeIcon icon={faMessage} className="card-icon" />
                </div>
                <div className="card hidden-card">
                  <p>How to Improve the readability of code?</p>
                  <FontAwesomeIcon icon={faCode} className="card-icon" />
                </div>
              </div>
            </>
          ) : (
            <div className="results">
              <div className="result-title">
                <img src={userProf} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <hr className="results-hr" />
              <div className="result-data">
                <img src={miniLogo} alt="" />
                {loading ? (
                  <div className="loader">
                    <hr className="loader-hr" />
                    <hr className="loader-hr"/>
                    <hr className="loader-hr"/>
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )}
              </div>
            </div>
          )}

          <div className="main-bottom">
            <div className="search-box">
              <input
                type="text"
                placeholder="Enter a prompt here..."
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={handleKeyUp}
                value={input}
              />
              <div>
                {input ? (
                  <img onClick={() => onSent()} src={sendIcon} alt="" />
                ) : null}
              </div>
            </div>
            <p className="bottom-info">
              Conversify can make mistakes. Consider checking important
              information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
