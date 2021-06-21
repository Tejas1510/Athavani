import React, { useEffect, useState } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import IconButton from "@material-ui/core/IconButton";
import discordIcon from "../../assets/discordIcon.png";
import "./style.css"
import zIndex from "@material-ui/core/styles/zIndex";

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
        <div style={{height:'350' ,zIndex:1}}>
          
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
                <b class="footer-class" style={{fontSize:'30px',color:'crimson'}}>About Athavani</b>
              </h1>
              <p style={{ textAlign: "center",color:'gray',fontSize:'18px' }}>
                Athavani/Memories is a place to save all your memories in a
                single place and rejoice them through the years. We assures you that your data will remain safe in Athavani. 
              </p>
             
              <hr style={{ width: "20%", alignItems: "center"}}></hr>
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "0px",
                  marginTop: "0px",
                  marginBottom:'-32px',
                  color:'maroon'
                }}
              >
                Contact Us:
              </h2>
              <p style={{ textAlign: "center" }}>
                <div className="swipeButton" style={{marginBottom:'-15px'}}>
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