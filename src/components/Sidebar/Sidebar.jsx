import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCogs,
  faComment,
  faHistory,
  faPlus,
  faQuestion,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import mainLogo from "../../assets/mainlogo.png";
import "./Sidebar.css";
import { Context } from "../../context/Context";

function Sidebar() {

  const { onSent, prevPrompts, setRecentPrompt, newChat, extended,setExtended } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  useEffect(() => {
    const handleResize = () => {
      setExtended(window.innerWidth > 740);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`sidebar ${extended ? "sidebar-open" : "sidebar-close"}`}>
      <div className="top">
        {extended ? (
          <div className="in-nav">
            <div className="logo-sidebar" onClick={() => newChat()}>
              <img src={mainLogo} alt="" />
            </div>
            <FontAwesomeIcon
              icon={faBars}
              className="menu"
              onClick={() => setExtended((prev) => !prev)}
            />
          </div>
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            className="menu"
            onClick={() => setExtended((prev) => !prev)}
          />
        )}

        <div className="new-chat" onClick={() => newChat()}>
          <FontAwesomeIcon icon={faPlus} className="icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div className="recent-entry" onClick={() => loadPrompt(item)}>
                  <FontAwesomeIcon icon={faComment} className="icon" />
                  <p>{item.slice(0, 18)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <FontAwesomeIcon icon={faQuestion} className="icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <FontAwesomeIcon icon={faHistory} className="icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <FontAwesomeIcon icon={faCogs} className="icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
