import { trpc } from "@/trpc/server";
import React from "react";

const User = () => {
  const getUsers = trpc.user.getUsers();
  return <div>User{JSON.stringify(getUsers)}</div>;
};

export default User;
