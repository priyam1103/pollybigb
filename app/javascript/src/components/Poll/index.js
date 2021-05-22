import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pollsApi from "../../apis/polls";
import { AppContext } from "../Layout";
export default function Index() {
  const { id } = useParams();
  const { handleLoading, handleError } = useContext(AppContext);
  const [poll, setPoll] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [pollResult, setPollResult] = useState({});
  const [voted, setVoted] = useState(false);
  useEffect(() => {
    fetchData(id);
  }, []);

  async function fetchData(id) {
    try {
      handleLoading(true);
      const response = await pollsApi.getPoll(id);
      if (response.status === 200) {
        handleLoading(false);
        setPoll(response.data.poll);
      }
    } catch (err) {
      handleLoading(false);
    }
  }
  async function vote() {
    try {
      handleLoading(true);
      const response = await pollsApi.vote(id, {
        selected_option: selectedOption,
      });
      if (response.status === 200) {
        setVoted(true);
        handleLoading(false);
        setPollResult(response.data.updated_polls);
      }
    } catch (err) {
      handleError({ success: false, body: "Please try again." });
      handleLoading(false);
    }
  }
  function getPercentage(val) {
    var total_poll = 0;
    Object.keys(pollResult).map(item => {
      total_poll = total_poll + pollResult[item];
    });
    return ((pollResult[val] / total_poll) * 100).toFixed(2);
  }
  return (
    <div className="bg-white border shadow-md sm:w-100 mx-auto mt-12 md-8 w-3/4 px-2 py-4">
      <div className="flex justify-center w-full">
        <div className="w-3/4 px-4">
          <h2 className="text-2xl font-semibold text-indigo-500">
            {poll?.title}
          </h2>
          <PollOption
            selectedOption={selectedOption}
            option={poll?.option1}
            setSelectedOption={setSelectedOption}
            getPercentage={getPercentage}
            voted={voted}
          />
          <PollOption
            selectedOption={selectedOption}
            option={poll?.option2}
            setSelectedOption={setSelectedOption}
            getPercentage={getPercentage}
            voted={voted}
          />{" "}
          <PollOption
            selectedOption={selectedOption}
            option={poll?.option3}
            setSelectedOption={setSelectedOption}
            getPercentage={getPercentage}
            voted={voted}
          />{" "}
          <PollOption
            selectedOption={selectedOption}
            option={poll?.option4}
            setSelectedOption={setSelectedOption}
            getPercentage={getPercentage}
            voted={voted}
          />
          {voted ? (
            <div>
              <p className="text-center text-base text-indigo-500">
                Thanks for voting!
              </p>
              <p className="text-center text-base">🎉</p>
            </div>
          ) : (
            <button
              type="submit"
              onClick={vote}
              className="flex justify-center px-4 py-2
      text-sm font-medium text-white border border-transparent rounded-md 
       group focus:outline-none bg-indigo-500 w-24"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function PollOption({
  selectedOption,
  option,
  setSelectedOption,
  getPercentage,
  voted,
}) {
  return (
    <div className="w-3/4 py-2 cursor-pointer">
      <div className="flex items-center">
        <div
          className={`border rounded-full px-2 py-3 w-3/4 ${
            selectedOption === option && "border-indigo-500"
          }`}
          onClick={() => !voted && setSelectedOption(option)}
        >
          <div className="text-base text-gray-800">{option}</div>
        </div>
        {voted && (
          <div className="px-2 w-1/4 text-indigo-500">
            {getPercentage(option)}%
          </div>
        )}
      </div>
    </div>
  );
}
