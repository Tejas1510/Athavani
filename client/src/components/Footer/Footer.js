
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
                style={{ textAlign: "center" }}
              >
                <b class="footer-class">About Athvani</b>
              </h1>
              <p style={{ textAlign: "center" }}>
                😻 Athavani/Memories is a place to save all your memories in a
                single place and rejoice them through the years.
              </p>
             
              <hr style={{ width: "20%", alignItems: "center", marginBottom: "20px", marginTop: "20px" }}></hr>
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
