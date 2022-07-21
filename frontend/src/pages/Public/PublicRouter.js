import React from "react";
import { Routes, Route } from "react-router-dom";

import OneUser from "../Admin/OneUser";

import { Layout, Home, Login, Signup, Contact } from "./";
import Error from "../../_utils/Error";
import AllUsers from "../Admin/AllUsers";

const PublicRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/oneuser/:id" element={<OneUser />} />
        <Route path="/allusers" element={<AllUsers />} />

        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default PublicRouter;
