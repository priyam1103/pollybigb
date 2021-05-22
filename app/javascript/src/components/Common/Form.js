import React, { useState, useContext } from "react";
import TextInput from "./TextInput";
import { AppContext } from "../Layout";
import pollsApi from "../../apis/polls";
import { useHistory } from "react-router-dom";
export default function index({ edit, currentData }) {
  const { handleError, handleLoading } = useContext(AppContext);
  const history = useHistory();
  const form_fields = [
    {
      label: "Title",
      name: "title",
      placeholder: "Write a question",
    },
    {
      label: "Option 1",
      name: "option1",
      placeholder: "Option 1",
    },
    {
      label: "Option 2",
      name: "option2",
      placeholder: "Option 2",
    },
    {
      label: "Option 3",
      name: "option3",
      placeholder: "Option 3",
    },
    {
      label: "Option 4",
      name: "option4",
      placeholder: "Option 4",
    },
  ];
  const [formstate, setFormState] = useState({
    title: edit ? currentData.title : "",
    option1: edit ? currentData.option1 : "",
    option2: edit ? currentData.option2 : "",
    option3: edit ? currentData.option3 : "",
    option4: edit ? currentData.option4 : "",
  });

  async function handleSubmit() {
    try {
      if (
        formstate.title.trim().length == 0 ||
        formstate.option1.trim().length == 0 ||
        formstate.option2.trim().length == 0 ||
        formstate.option3.trim().length == 0 ||
        formstate.option4.trim().length == 0
      ) {
        handleError({
          success: false,
          body: "Please fill the details properly.",
        });
      } else {
        handleLoading(true);
        const response = edit
          ? await pollsApi.editPoll(currentData.id, { ...formstate })
          : await pollsApi.createPoll({ ...formstate });
        if (response.status === 200) {
          history.push("/");
          if (edit) {
            handleLoading(false);
            handleError({
              success: true,
              body: "Successfully updated a poll.",
            });
          } else {
            handleLoading(false);
            handleError({
              success: true,
              body: "Successfully added a poll.",
            });
          }
        }
      }
    } catch (err) {
      handleLoading(false);
      handleError(false, "Error occured");
    }
  }
  return (
    <div className="bg-white border shadow-md mx-auto mt-12 md-8 w-3/4 px-2 py-4">
      <div className="flex justify-center">
        <div className="w-3/4 px-4">
          <h2 className="text-3xl font-extrabold text-center text-indigo-500">
            {edit ? "Edit Poll" : "Create Poll"}
          </h2>

          {form_fields.map((item, index) => {
            return (
              <TextInput
                key={index}
                index={index}
                label={item.label}
                onChange={(e) =>
                  setFormState({ ...formstate, [item.name]: e.target.value })
                }
                value={formstate[item.name]}
                placeholder={item.placeholder}
              />
            );
          })}
          {edit && (
            <p
              className="flex justify-center px-4 py-2 
        text-sm font-medium 5 text-red 
         "
            >
              On click of submit poll will get reset.
            </p>
          )}
          <div className="flex justify-center">
            <div className="mt-6">
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex justify-center px-4 py-2 
        text-sm font-medium leading-5 text-white transition duration-150
         ease-in-out border border-transparent rounded-md 
         group hover:bg-opacity-90 focus:outline-none bg-indigo-500 w-24"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
