
import React from "react";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import IconButton from "@material-ui/core/IconButton";
import "./style.css"
function Footer() {
  return (
    <div>
      <footer>
        <div style={{ position: "relative" }}>
          <svg
            viewBox="0 -20 700 110"
            width="100%"
            height="50px"
            preserveAspectRatio="none"
            style={{ position: "absolute", top: "110px" }}
          >
            <path
              transform="translate(0, -20)"
              d="M0,10 c80,-22 240,0 350,18 c90,17 260,7.5 350,-20 v50 h-700"
              fill="#FFAA00"
            />
            <path
              d="M0,10 c80,-18 230,-12 350,7 c80,13 260,17 350,-5 v100 h-700z"
              fill="#FF7F50"
            />
          </svg>
          <div
            class="footer-row"
           >
            <div
              class="col-lg-12 col-md-12 col-sm-12"
              align="left"
              style={{ paddingLeft: "5%", marginTop: "0%", marginBottom: "0%" }}
            >
              <h1
                class="text-uppercase"
                style={{ marginBottom: "0px", marginTop: "0px" }}
              >
                <b class="footer-class">About Athvani</b>
              </h1>
              <p style={{ marginBottom: "0px", marginTop: "0px" }}>
                😻 Athavani/Memories is a place to save all your memories in a
                single place and rejoice them through the years.
              </p>

              <hr style={{ width: "20%", alignItems: "center" }}></hr>
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "0px",
                  marginTop: "0px",
                }}
              >
                Contact us at
              </h2>
              <p style={{ textAlign: "center" }}>
                <div className="swipeButton">
                  <IconButton
                    className="swipeButtons_repeat"
                    style={{ color: "red" }}
                  >
                    <YouTubeIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    style={{
                      color: "#0077b5"
                    }}
                  >
                    <LinkedInIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    style={{ color: "#00acee" }}
                  >
                    <TwitterIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                   style={{ color: "#fb3958" }}
                  >
                    <InstagramIcon fontSize="large" />
                  </IconButton>
                </div>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
