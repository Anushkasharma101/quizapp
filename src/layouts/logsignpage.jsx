import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./logsignpage.css";
import Button from "../components/button";
import Buttongroup from "../components/buttongroup";
import registerUser from "../functions/registerUser";
import loginUser from "../functions/loginUser";

function Homepage() {
  const [applyShadow, setApplyShadow] = useState({
    signUp: true,
    logIn: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const isSignUpPage = location.pathname === "/";

  const handleSignUpClick = () => {
    setApplyShadow({
      signUp: true,
      logIn: false,
    });
    setErrors({});
  };

  const handleLogInClick = () => {
    setApplyShadow({
      signUp: false,
      logIn: true,
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "", // Clear the error message when user starts typing
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (applyShadow.signUp && !formData.name) {
      newErrors.name = "Please Enter Name";
    }
    if (!formData.email) {
      newErrors.email = "Please Enter Email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid Email";
    }
    if (!formData.password) {
      newErrors.password = "Please Enter Password";
    } else if (
      formData.password.length < 8 ||
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[!@#$%^&*]/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, and 1 special character";
    }
    if (applyShadow.signUp) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please Enter Confirm Password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await registerUser(formData);
      setApplyShadow({
        signUp: false,
        logIn: true,
      });
    }
  };

  const handleLogInSubmit = () => {
    if (validateForm()) {
      loginUser(formData.email, formData.password)
        .then(() => {
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Error logging in:", error);
        });
    }
  };

  return (
    <div className="bgdiv">
      <div className="maindiv">
        <div className="title">QUIZZIE</div>
        <div className="btngroupdiv">
          <div className="buttondiv">
            <Button
              text="Sign Up"
              color="#fff"
              onClick={handleSignUpClick}
              applyShadow={applyShadow.signUp}
            />
            <Button
              text="Log In"
              color="#fff"
              onClick={handleLogInClick}
              applyShadow={applyShadow.logIn}
            />
          </div>
        </div>

        <div>
          <div className="form-group">
            {applyShadow.signUp && (
              <div className="namediv">
                <div className="name">Name</div>
                <div className="namefield">
                  <input
                    type="text"
                    id="name"
                    placeholder={errors.name || "name"}
                    className={`nameinput ${errors.name ? "input-error" : ""}`}
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <div className="emaildiv">
              <div className="email">Email</div>
              <div className="emailfield">
                <input
                  type="email"
                  id="email"
                  placeholder={errors.email || "email"}
                  className={`emailinput ${errors.email ? "input-error" : ""}`}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="passworddiv">
              <div className="password">Password</div>
              <div className="passwordfield">
                <input
                  type="password"
                  id="password"
                  placeholder={errors.password || "password"}
                  className={`passwordinput ${
                    errors.password ? "input-error" : ""
                  }`}
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {applyShadow.signUp && (
              <div className="confirmpassworddiv">
                <div className="confirm-password">Confirm Password</div>
                <div className="confirm-passwordfield">
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder={errors.confirmPassword || "confirm password"}
                    className={`confirm-passwordinput ${
                      errors.confirmPassword ? "input-error" : ""
                    }`}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <div className="sign-upbtn">
              <Buttongroup
                text={applyShadow.signUp ? "Sign Up" : "Log In"}
                color="#A9BCFF"
                onClick={applyShadow.signUp ? handleSignUpSubmit : handleLogInSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

