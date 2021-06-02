import React, { useEffect, useState } from "react";
import Form from "../Common/Form";
import pollsApi from "../../apis/polls";
import { useParams } from "react-router-dom";

export default function Index() {
  const { id } = useParams();
  const [currentData, setCurrentData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await pollsApi.getPoll(id);
      if (response.status === 200) {
        setCurrentData(response.data.poll);
      }
    } catch (err) {
      // console.log(err.response);
    }
  };
  
  return (
    <div>{currentData && <Form edit={true} currentData={currentData} />}</div>
  );
}
