import React, { createContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { setAuthHeaders } from "apis/authHeaders";

export const AppContext = createContext({});

const AppProvider = AppContext.Provider;

export default function Layout({ children }) {
  const [username, setUsername] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [isError, SetIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ success: false, body: "" });

  useEffect(() => {
    if (localStorage.getItem("polly-token") != null) {
      setAuthHeaders();
      setAuthenticated(true);
      setUsername(localStorage.getItem("polly-username"));
    }
  }, []);

  function autheticateApp(auth_token, username) {
    localStorage.setItem("polly-token", auth_token);
    localStorage.setItem("polly-username", username);
    setAuthHeaders();
    setUsername(username);
    setAuthenticated(true);
  }

  function handleLoading(bool) {
    setIsLoading(bool);
  }

  function handleError({ success, body }) {
    if (!isError) {
      SetIsError(true);
      setError({ success: success, body: body });
    }
    setTimeout(() => {
      SetIsError(false);
      setError({ success: false, body: "" });
    }, 3000);
  }
  
  return (
    <AppProvider
      value={{
        username: username,
        authenticated: authenticated,
        isError: isError,
        error: error,
        isLoading: isLoading,
        autheticateApp,
        handleError,
        handleLoading,
      }}
    >
      <div style={{width:"100vw",height:"100vh",backgroundColor:"#f2f2f2"}}>
        <Navbar />
        {children}
      </div>
    </AppProvider>
  );
}
