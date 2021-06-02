import axios from "axios";

const signup = payload => axios.post("/users", payload);
const login = payload =>
  axios.post("/sessions", {
    login: { email: payload.email, password: payload.password },
  });
  
const authApi = {
  login,
  signup,
};

export default authApi;
