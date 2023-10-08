//this is the login page
import "./style.css";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/logininput";
import * as Yup from "yup";
// a useState hook is a function that returns an array with two elements: the first element is the state value, the second element is a function that updates the state value
import { useState } from "react";
// this is the initial state of the login page
const loginInfos = {
  email: "",
  password: "",
};

export default function Login() {
  // the useState hook is used to manage the state of the login page. The loginInfos is the initial state of the login page
  const [login, setLogin] = useState(loginInfos);
  // the loginInfos is destructured into email and password
  const { email, password } = login;
  // the handleLoginChange function is used to update the state of the login page
  const handleLoginChange = (e) => {
    // the name and value of the login page is destructured from the event object
    //the event object is the object that is returned when an event is triggered
    //in this case the event is the onchange event which is triggered when the value of the input field changes
    const { name, value } = e.target;
    // the setLogin function is used to update the state of the login page
    setLogin({ ...login, [name]: value });
  };
  // the loginValidation is used to validate the input fields
  //the Yup library is used to validate the input fields
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email address")
      .max(100),
    password: Yup.string().required("Password is required").max(100),
  });
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt="logo" />
            <span>
              Facebook helps you connect and share with the people in your life.
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              {/*the Formik component is used to manage the state of the login
              page //It is a library that helps with form management //our
  initial values are the email and password */}
              <Formik
                enableReinitialize
                initialValues={{ email, password }}
                validationSchema={loginValidation}
              >
                {(formik) => (
                  // the Form component is used to wrap the input fields
                  <Form>
                    {/*the LoginInput component is used to render the input
                    fields //This is from the
                frontend/src/components/inputs/logininput/index.js file*/}
                    <LoginInput
                      type="text"
                      name="email"
                      placeholder="Email address or phone number"
                      // the onchange event is triggered when the value of the input field changes
                      //This triggers the handleLoginChange function which updates the state of the login page
                      onChange={handleLoginChange}
                    />
                    <LoginInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleLoginChange}
                      //here we are passing bottom as true so that in the components page we can custom the css to make the error flag below the input box
                      bottom
                    />
                    <button type="submit" className="blue_btn">
                      Login In
                    </button>
                  </Form>
                )}
              </Formik>
              <Link to="/forgot" className="forgot_password">
                {" "}
                Forgotten password?
              </Link>
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup"> Create Account</button>
            </div>
            <Link to="/" className="sign_extra">
              <b>Create a Page </b>
              for a celebrity, band or business.
            </Link>
          </div>
          <div className="register"></div>
        </div>
      </div>
    </div>
  );
}
