import React from "react";
import { FaGithubAlt, FaTwitter, FaDiscord } from "react-icons/fa";
import "./style.css";

// const styles = {
//   textDecoration: "none",
//   paddingLeft: "0.5em",
//   color: "#fac87b",
// };

const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      <footer className="footer">
        <div className="footer-addr">
          <h1 className="footer-logo">About Athavani</h1>
          <div className="info">
            Athavani/Memories is a place to save all your memories in a single
            place and rejoice them through the years. We assures you that your
            data will remain safe in Athavani.
          </div>
        </div>
        <ul className="footer-nav">
          <li className="social-box" style={{ width: "100%" }}>
            <h2 className="title">Social</h2>
            <ul className="ul-links">
              <p
                style={{
                  fontSize: "1.1rem",
                  margin: "0",
                  fontWeight: "600",
                }}
              >
                Do follow us on social platforms
              </p>
            </ul>
            <div className="col col">
              <ul className="social">
                <li>
                  <a href="#" rel="noopener noreferrer">
                    <div className="outer">
                      <FaTwitter
                        className="fab fa-twitter"
                        style={{ fontSize: "2.2em" }}
                      />
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Tejas1510/Athavani"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="outer">
                      <FaGithubAlt
                        className="fab fa-github"
                        style={{ fontSize: "2.2em" }}
                      />
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/gEqSYzc5Yu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="outer">
                      <FaDiscord
                        className="fab fa-discord"
                        style={{ fontSize: "2.2em" }}
                      />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div className="footer-dash footer-dash-dark">
          <div className="footer-text footer-text-dark">
            <p style={{ margin: "10px 0px", fontWeight: "700" }}>
              Copyright © Athavani 2021
            </p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
