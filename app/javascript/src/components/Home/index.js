import React, { useEffect, useState, useContext } from "react";
import pollsApi from "apis/polls";
import "./home.css";
import { AppContext } from "../Layout";
import PollOptionsCard from "./PollOptionsCard";

export default function index() {
  const { authenticated, handleLoading, handleError } = useContext(AppContext);
  const [polls_array, setPollsArray] = useState([]);

  useEffect(() => {
    getPolls();
  }, []);

  async function destroyPoll(id) {
    try {
      handleLoading(true);
      const response = await pollsApi.deletePoll(id);
      if (response.status === 200) {
        handleLoading(false);
        getPolls();
      }
    } catch (err) {
      handleLoading(false);
      handleError({ success: false, body: "Error Occured" });
    }
  }

  async function getPolls() {
    try {
      handleLoading(true);
      const response = await pollsApi.polls();
      if (response.status === 200) {
        handleLoading(false);
        setPollsArray(response.data.polls);
      }
    } catch (err) {
      handleLoading(false);
    }
  }
  
  return (
    <div>
      <PollOptionsCard
        polls={polls_array}
        destroyPoll={destroyPoll}
        authenticated={authenticated}
      />
    </div>
  );
}
