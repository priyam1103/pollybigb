import React, { useContext} from "react";
import "./Toaster.css";
import { AppContext } from "../Layout";

export default function Toaster() {

  const { error } = useContext(AppContext);

  if (error.success) {
    return (
      <div className="toaster mx-auto bg-green-500 border-l-4 border-green-700 py-2 px-3 shadow-md mb-2">
        <div className="flex items-center py-2 px-3 shadow-md mb-2">
          <div className="text-green-500 rounded-full bg-white mr-3">
            <svg
              width="1.8em"
              height="1.8em"
              viewBox="0 0 16 16"
              className="bi bi-check"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
              />
            </svg>
          </div>
          <div className="text-white max-w-xs ">{error.body}</div>
        </div>
        <div className="green-bottom-strip"></div>
      </div>
    );
  }
  if (!error.success) {
    return (
      <div className="toaster  mx-auto bg-red-500 border-l-4 border-red-700 py-2 px-3 shadow-md mb-2">
        <div className="flex items-center py-2 px-3 shadow-md mb-2">
          <div className="text-red-500 rounded-full bg-white mr-3">
            <svg
              width="1.8em"
              height="1.8em"
              viewBox="0 0 16 16"
              className="bi bi-x"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
              />
              <path
                fillRule="evenodd"
                d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
              />
            </svg>
          </div>
          <div className="text-white max-w-xs ">{error.body}</div>
        </div>
        <div className="red-bottom-strip"></div>
      </div>
    );
  }
}
