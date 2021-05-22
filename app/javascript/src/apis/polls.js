import axios from "axios";

const polls = () => axios.get("/polls");
const createPoll = payload => axios.post("/polls", payload);
const editPoll = (id, payload) => axios.put(`/polls/${id}`, payload);
const deletePoll = id => axios.delete(`/polls/${id}`);
const getPoll = id => axios.get(`/polls/${id}`);

const pollsApi = {
  polls,
  createPoll,
  deletePoll,
  editPoll,
  getPoll
};

export default pollsApi;
