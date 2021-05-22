import React from "react";
import { useHistory } from "react-router-dom";
export default function PollOptionsCard({ polls, destroyPoll, authenticated }) {
  const history = useHistory();
  return (
    <div className="bg-white border shadow-md mx-auto mt-12 md-8 w-3/4 px-2 py-4">
      <div className="flex justify-center px-auto">
        <div style={{width:"90%"}}>
          <div className="table w-full">
            <div className="table-row-group">
              <div className="table-row py-2">
                <div className="table-cell">
                  <h2 className="text-indigo-500 text-3xl font-extrabold ">
                    Polls
                  </h2>
                </div>
                {authenticated && (
                  <div className="table-cell w-1/2">
                    <button
                      className="flex rounded mt-6 text-white justify-center px-4 py-2 bg-indigo-500"
                      onClick={() => history.push(`/poll/create`)}
                    >
                      Create a poll +
                    </button>
                  </div>
                )}
              </div>
              {polls?.map((item, index) => (
                <div key={index} className="table-row py-2 w-1/2">
                  <div className="table-cell cursor-pointer text-lg hover:text-indigo-500">
                    <p onClick={() => history.push(`/poll/${item.id}`)}>
                      {item.title}
                    </p>
                  </div>
                  {authenticated && (
                    <div  className="flex flex-row">
                      <div>
                        <button
                          className="flex rounded mt-6 text-white justify-center px-4 py-2 bg-indigo-500"
                          onClick={() => history.push(`/poll/edit/${item.id}`)}
                        >
                          Edit
                        </button>
                      </div>

                      <div className="ml-5">
                        <button
                          className="flex rounded mt-6 text-white justify-center px-4 py-2 bg-indigo-500"
                          onClick={() => {
                            destroyPoll(item.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
