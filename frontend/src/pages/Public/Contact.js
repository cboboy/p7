import React from "react";
import axios from "axios";

axios({
  method: "put",
  url: "http://localhost:3000/users",
  withCredentials: false,
  data: {
    email: "cboitmoyyiiy@free.fr",
    password: "dfdfdf",
  },
})
  .then((resultat) => {
    console.log(resultat.data);
  })
  .catch((err) => {
    console.log(err);
  });

const Contact = () => {
  return <div>contact works !!!</div>;
};

export default Contact;
