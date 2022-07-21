import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function OneUser(props) {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  console.log("id", id);

  async function fetchUserData(id) {
    const response = await fetch("http://localhost:3000/users/" + id);
    setUser(await response.json());
  }

  useEffect(() => {
    fetchUserData(id);
  }, [id]);
  if (!user) {
    return "loading...";
  }

  return (
    <div>
      <h2>{user.data.email}</h2>
      <p>{user.data.createdAt}</p>
    </div>
  );
}
