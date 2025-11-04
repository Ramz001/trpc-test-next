"use client";

import { trpc } from "@/providers/trpc.provider";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const AddUserForm = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const addUserMutation = trpc.user.addUser.useMutation({
    onSuccess: () => {
      setName("");
      router.refresh(); // Refresh server component to refetch data
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) {
      addUserMutation.mutate({ name: name.trim() });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user name"
          className="px-4 py-2 border rounded-md flex-1"
          disabled={addUserMutation.isPending}
        />
        <button
          type="submit"
          disabled={addUserMutation.isPending || !name.trim()}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {addUserMutation.isPending ? "Adding..." : "Add User"}
        </button>
      </div>
      {addUserMutation.isError && (
        <p className="mt-2 text-red-500 text-sm">
          Error: {addUserMutation.error.message}
        </p>
      )}
      {addUserMutation.isSuccess && (
        <p className="mt-2 text-green-500 text-sm">User added successfully!</p>
      )}
    </form>
  );
};
