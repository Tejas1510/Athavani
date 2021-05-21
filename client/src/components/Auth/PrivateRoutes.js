import React from "react";
//Packages-----------------
import { Redirect, Route } from "react-router-dom";
//Function importing-----------------

const PrivateRoutes = ({ component: Component, ...rest }) => {
    const isAuthenticated = () => {
        if (typeof window == "undefined") {
          return false;
        }
        if (localStorage.getItem("token")) {
            console.log(localStorage.getItem("token"));
          return true;
        } else {
            console.log(localStorage.getItem("token"));
          return false;
        }
      };
    
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoutes;
