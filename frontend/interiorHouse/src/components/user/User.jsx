import React, { useState, useEffect } from "react";
import InteriorList from "./InteriorList";
import CreateInteriorForm from "./CreateInteriorForm";

import "./../../static/styles/user/User.css";

const User = ({ client }) => {
  const [interiors, setInteriors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [createInteriorShow, setCreateInteriorShow] = useState(false);
  const [btnCreateInteriorShow, setBtnCreateInteriorShow] = useState(true);

  useEffect(() => {
    fetchInteriors();
    fetchUser();
  }, []);

  async function fetchInteriors() {
    const response = await client.get("/user/interiors");
    setInteriors(response.data);
  }

  async function fetchUser() {
    const response = await client.get("/user/getUser");
    setUsername(response.data["Username"]);
    setEmail(response.data["Email"]);
  }

  async function createInteriorOnClick(e) {
    setCreateInteriorShow(true);
    setBtnCreateInteriorShow(false);
  }

  return (
    <div className="user">
      <div className="user-header">
        <h1>{username}</h1>
        <p>{email}</p>
      </div>
      <div className="user-interiors">
        <h2>My Interiors</h2>
        <InteriorList interiors={interiors} />
        {btnCreateInteriorShow && (
          <button className="createInteriorBtn" onClick={createInteriorOnClick}>
            Create Interior
          </button>
        )}
        {createInteriorShow && (
          <CreateInteriorForm
            client={client}
            setCreateInteriorShow={setCreateInteriorShow}
            setBtnCreateInteriorShow={setBtnCreateInteriorShow}
          />
        )}
      </div>
    </div>
  );
};

export default User;
