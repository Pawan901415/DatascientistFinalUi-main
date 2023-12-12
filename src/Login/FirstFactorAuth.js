// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import '../Styles/FirstFactorAuthStyles.css';
// import '@fortawesome/fontawesome-free/css/all.css';


// const FirstFactorAuth = ({ onSuccess }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleFirstFactorAuth = async () => {
//     try {
//       console.log(username);
//       const response = await axios.post(
//         "https://usermanagementapi-team4.azurewebsites.net/api/Authentication/login",
//         {
//           username: username,
//           password: password,
//         }
//       );


//       if (response.data.status === "Success") {
//         onSuccess(username);
//       } else {
//         // Handle authentication failure
//         console.log("err");
//       }
//     } catch (error) {
//       // Handle network or other errors
//       console.log("err1");
//     }
//   };



//   return (
//     <>
//       <div className="form_bg">
// 	      <div  className="container" >
// 	        <div className="row">
// 	          <div className="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6">
// 		          <form className="form_horizontal"> 
// 			          <div className="form_icon"><i className="fa fa-user" style={{ color: 'lightgrey' }}></i></div>
//                   {/* <h3 className="title" style={{ color: 'black' }}>Please Login</h3> */}
//                   <br/>
//                   <div className="form-group">
//                   <span className="input-icon"><i className="fa fa-user"></i></span>
//                     <input
//                       className="form-control"
//                       type="text"
//                       placeholder=" Username"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                     />
//                   </div>
//                   <div className="form-group">
//                   <span className="input-icon"><i className="fa fa-lock"></i></span>
//                     <input
//                       className="form-control"
//                       type="password"
//                       placeholder=" Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </div>

//                   <button className="btn btn-primary btn-lg btn-block" onClick={handleFirstFactorAuth}>Login</button>
//                   {/* <ul className="form-options">
//                     <li><a href="#">Forgot username/password</a></li>
//                     <li><a href="#">Create New Account<i class="fa fa-arrow-right"></i></a></li>
//                   </ul> */}
//                 </form>
//               </div>
//             </div>
//           </div>     
//       </div>
//     </>
//   );
// };

// export default FirstFactorAuth;

import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const FirstFactorAuth = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //const navigate = useNavigate();

  const handleFirstFactorAuth = async () => {
    try {
      const response = await axios.post(
        //"https://usermanagementapiteam4.azurewebsites.net/api/Authentication/login",
        "https://usermanagementapi-team4.azurewebsites.net/api/Authentication/login",
        {
          username: username,
          password: password,
        }
      );

      if (response.data.status === "Success") {
        onSuccess(username);

      } else {
        // Handle authentication failure
        console.log("Authentication failure");
        setErrorMessage("User not authorized");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during first-factor authentication:", error);
      setErrorMessage("Network error, user not added");
    }
  };

  return (
    <>

      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Login</h3>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      placeholder="Username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button className="btn btn-warning btn-lg btn-block" onClick={handleFirstFactorAuth}>
                    Login
                  </button>
                  {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
};

export default FirstFactorAuth;
