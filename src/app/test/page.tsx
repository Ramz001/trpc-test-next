import { trpc } from "@/trpc/server";
import React from "react";
import { AddUserForm } from "./AddUserForm";

const User = async () => {
  const getUsers = await trpc.user.getUsers();
  console.log(getUsers);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <AddUserForm />
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">User List</h2>
        {getUsers.map((e) => (
          <div key={e.id} className="p-2 border-b">
            {e.id} {e.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
