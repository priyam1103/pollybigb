import axios from "axios";

const polls = () => axios.get("/polls");
const createPoll = payload => axios.post("/polls", payload);

const pollsApi = {
  polls,
  createPoll,
  
};

export default pollsApi;
