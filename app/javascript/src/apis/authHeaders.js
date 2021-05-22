import axios from "axios";

export const setAuthHeaders = () => {
  axios.defaults.headers = {
    Accept: "applicaion/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
  const token = localStorage.getItem("polly-token");
  const username = localStorage.getItem("polly-username");
  if (token && username) {
    axios.defaults.headers["X-AUTH-USERNAME"] = username;
    axios.defaults.headers["X-AUTH-TOKEN"] = token;
  }
};
