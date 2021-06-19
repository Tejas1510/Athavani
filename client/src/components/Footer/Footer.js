import React, { useEffect, useState } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import IconButton from "@material-ui/core/IconButton";
import discordIcon from "../../assets/discordIcon.png";
import "./style.css"

function Footer() {
  const [footerStyle, setFooterStyle] = useState({})
  const [url, setUrl] = useState("")
  
  useEffect(() => {
    const url = window.location.pathname
    setUrl(url)
    if (url === "/" || url === "/profile") {
      setFooterStyle({
        position: "relative"
      })
    } else {
      setFooterStyle({
        position: "absolute"
      })
    }
  }, [window.location.pathname])

  return (
      <footer>
        <div>
          
          <div
            class="footer-row"
            style={footerStyle}
           >
            <div
              class="col-lg-12 col-md-12 col-sm-12 footer-row-1"
              align="left"
              style={{ marginTop: "0%", marginBottom: "0%", paddingLeft: (url === "/" || url === "/profile") && window.innerWidth > 600 ?  "240px" : "0px" }}
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
                    style={{ color: "#00acee" }}
                    onClick={() => window.open('')}
                  >
                    <TwitterIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                   style={{ color: "#7289d9" }}
                   onClick={() => window.open('https://discord.gg/gEqSYzc5Yu')}
                  >
                    <img src={discordIcon} alt="" width="35px" height="35px"/>
                  </IconButton>
                </div>
              </p>
            </div>
          </div>
        </div>
      </footer>
  );
}

export default Footer;
