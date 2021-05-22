import React, { useContext } from "react";
import Toaster from "./Common/Toaster";
import { AppContext } from "./Layout";
import Loader from "./Common/Loader";
export default function Navbar() {
  const { username, authenticated, isError, handleError, isLoading } =
    useContext(AppContext);
  return (
    <nav className="bg-white px-2 py-2">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-mono text-3xl font-bold cursor-pointer">
              <a className="cursor-pointer" href="/">
                Polly
              </a>
            </h1>
          </div>
          <div>
            {authenticated && (
              <a
                className="inline-flex items-center px-1 pt-1 mr-3 font-semibold text-lg leading-5"
                href="/"
              >
                {username}
              </a>
            )}
            {authenticated ? (
              <a
                className="inline-flex items-center px-1 pt-1 mr-3 font-semibold text-lg leading-5"
                href="/"
                onClick={() => {
                  localStorage.removeItem("polly-token");
                  localStorage.removeItem("polly-username");
                  handleError({
                    success: true,
                    body: "Successfully logged out.",
                  });
                }}
              >
                Logout
              </a>
            ) : (
              <a
                className="inline-flex items-center px-1 pt-1 mr-3 font-semibold text-lg leading-5"
                href="/login"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
      {isError && <Toaster />}
      {isLoading && <Loader />}
    </nav>
  );
}
