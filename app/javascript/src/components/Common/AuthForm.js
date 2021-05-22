/* eslint-disable react/no-unescaped-entities */
import React, { useState, useContext } from "react";
import TextInput from "./TextInput";
import authApi from "../../apis/auth";
import { useHistory } from "react-router-dom";
import { AppContext } from "../Layout";
export default function AuthForm({ isSignup }) {
  const history = useHistory();
  const { autheticateApp, handleError, handleLoading } = useContext(AppContext);
  const form_fields = [
    {
      label: "Email",
      name: "email",
      placeholder: "jhon@gmail.com",
    },
    {
      label: "First Name",
      name: "name",
      placeholder: "Jhon",
    },
    {
      label: "Last Name",
      name: "lastname",
      placeholder: "Doe",
    },
    {
      label: "Password",
      name: "password",
      placeholder: "********",
    },
    {
      label: "Password Confirmation",
      name: "password_confirmation",
      placeholder: "********",
    },
  ];
  const [formstate, setFormState] = useState({
    email: "",
    name: "",
    lastname: "",
    password: "",
    password_confirmation: "",
  });

  async function handleSubmit() {
    var email_regex = /\S+@\S+\.\S+/;
    handleLoading(true);

    if (
      formstate.email.trim().length == 0 &&
      !email_regex.test(formstate.email)
    ) {
      handleLoading(false);
      handleError({ success: false, body: "Please enter a valid email" });
      return;
    } else if (formstate.password.trim().length < 6) {
      handleLoading(false);
      handleError({
        success: false,
        body: "Please enter a password of minimum length 5",
      });

      return;
    } else {
      if (isSignup) {
        if (formstate.name.trim().length == 0) {
          handleLoading(false);
          handleError({ success: false, body: "Please enter the first name." });

          return;
        } else if (formstate.lastname.trim().length == 0) {
          handleLoading(false);
          handleError({ success: false, body: "Please enter the last name." });

          return;
        } else if (
          formstate.password.trim() !== formstate.password_confirmation.trim()
        ) {
          handleLoading(false);
          handleError({ success: false, body: "Passwords do not match." });

          return;
        } else {
          try {
            const response = await authApi.signup({ ...formstate });
            autheticateApp(response.data.auth_token, response.data.firstname);
            handleLoading(false);
            history.push("/");
            handleError({ success: true, body: "Successfully Signed Up" });
          } catch (err) {
            console.log(err.response);
            handleLoading(false);
            handleError({ success: false, body: "Error occured" });
          }
        }
      } else {
        try {
          const response = await authApi.login({ ...formstate });
          autheticateApp(response.data.auth_token, response.data.firstname);
          handleLoading(false);
          history.push("/");
          handleError({ success: true, body: "Successfully Logged In" });
        } catch (err) {
          handleError({ success: false, body: "Invalid credentails." });
          handleLoading(false);
        }
      }
    }
  }
  return (
    <div className="flex h-full">
      <div className="bg-white border shadow-md mx-auto mt-16 md-8 w-1/2 px-2 py-4">
        <h2 className="text-3xl font-extrabold text-center text-indigo-500">
          {isSignup ? "Signup" : "Login"}
        </h2>
        {form_fields.map((item, index) => {
          if (isSignup) {
            return (
              <TextInput
                key={index}
                index={index}
                label={item.label}
                type={
                  (item.name === "password" ||
                    item.name === "password_confirmation") &&
                  "password"
                }
                onChange={e =>
                  setFormState({ ...formstate, [item.name]: e.target.value })
                }
                value={formstate[item.name]}
                placeholder={item.placeholder}
              />
            );
          } else {
            if (item.name === "email" || item.name === "password") {
              return (
                <TextInput
                  key={index}
                  index={index}
                  label={item.label}
                  type={item.name}
                  onChange={e =>
                    setFormState({
                      ...formstate,
                      [item.name]: e.target.value,
                    })
                  }
                  value={formstate[item.name]}
                  placeholder={item.placeholder}
                />
              );
            }
          }
        })}
        <div className="flex justify-center">
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              type="submit"
              className="flex justify-center px-4 py-2
      text-sm font-medium leading-5 text-white transition duration-150
       ease-in-out border border-transparent rounded-md 
       group hover:bg-opacity-90 focus:outline-none bg-indigo-500 w-24"
            >
              Submit
            </button>
          </div>
        </div>

        {isSignup ? (
          <div className="flex justify-center items-center mt-2">
            <p className="text-xs">Already have an account? </p>
            <a className="text-xs font-bold underline pl-1" href="/login">
              Login
            </a>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-2">
            <p className="text-xs">Don't have an account?</p>
            <a className="text-xs font-bold underline pl-1" href="/signup">
              Signup
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
