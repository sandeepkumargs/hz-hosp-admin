import React from "react";
import { Link } from "react-router-dom";

class NotFoundPage extends React.Component {
   render() {
      return (
         <div>
            {/* <img src={PageNotFound} /> */}
            <p style={{ textAlign: "center" }}> 404 Error: Page not found :(</p>
            <p style={{ textAlign: "center" }}>
               Maybe the page you are looking for has been removed, or you typed
               in the wrong URL
            </p>
            <p style={{ textAlign: "center" }}>
               <Link to='/home'>Go to Home </Link>
            </p>
         </div>
      );
   }
}
export default NotFoundPage;
