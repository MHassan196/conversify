import React, { useContext, useEffect, useRef } from "react";
import "./ResponsiveSidebar.css"; // Updated CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPlus,
  faComment,
  faQuestion,
  faHistory,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../context/Context.jsx";
import mainLogo from "../../assets/mainlogo.png";

function ResponsiveSidebar() {
  const {
    prevPrompts,
    setRecentPrompt,
    newChat,
    responsiveSidebarOpen,
    setResponsiveSidebarOpen,
  } = useContext(Context);


  const sidebarRef = useRef(null);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const toggleSidebar = () => {
    setResponsiveSidebarOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setResponsiveSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`responsive-sidebar-container ${
        responsiveSidebarOpen ? "open" : "closed"
      }`}
    >
      <div className="responsive-sidebar-top">
        <div className="responsive-sidebar-in-nav">
          <div className="responsive-logo-sidebar" onClick={() => newChat()}>
            <img src={mainLogo} alt="" />
          </div>
          <FontAwesomeIcon
            icon={faBars}
            className="responsive-sidebar-menu"
            onClick={toggleSidebar}
          />
        </div>

        <div className="responsive-sidebar-new-chat" onClick={newChat}>
          <FontAwesomeIcon icon={faPlus} className="responsive-sidebar-icon" />
          <p>New Chat</p>
        </div>

        <div className="responsive-sidebar-recent">
          <p className="responsive-sidebar-recent-title">Recent</p>
          {prevPrompts.map((item, index) => (
            <div
              className="responsive-sidebar-recent-entry"
              onClick={() => loadPrompt(item)}
              key={index}
            >
              <FontAwesomeIcon
                icon={faComment}
                className="responsive-sidebar-icon"
              />
              <p>{item.slice(0, 18)} ...</p>
            </div>
          ))}
        </div>
      </div>

      <div className="responsive-sidebar-bottom">
        <div className="responsive-sidebar-bottom-item">
          <FontAwesomeIcon
            icon={faQuestion}
            className="responsive-sidebar-icon"
          />
          <p>Help</p>
        </div>
        <div className="responsive-sidebar-bottom-item">
          <FontAwesomeIcon
            icon={faHistory}
            className="responsive-sidebar-icon"
          />
          <p>Activity</p>
        </div>
        <div className="responsive-sidebar-bottom-item">
          <FontAwesomeIcon icon={faCogs} className="responsive-sidebar-icon" />
          <p>Settings</p>
        </div>
      </div>
    </div>
  );
}

export default ResponsiveSidebar;
