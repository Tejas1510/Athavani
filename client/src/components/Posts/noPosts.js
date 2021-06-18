// import React from "react"
import React, { Component } from "react"

class NoPosts extends Component {
  state = {}
  styles = {
    fontSize: 30,
    fontWeight: "bold",
    color: "brown",
  }
  render() {
    return <h1 style={this.styles}>Oops, No memory Created</h1>
  }
}

export default NoPosts
// export default NoPosts
