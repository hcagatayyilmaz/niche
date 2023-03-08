"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  let toastPostID: string;

  const { mutate } = useMutation(
    async () => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID });
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        console.log(data);
        setTitle("");
        setIsDisabled(false);
        toast.success("Post has been made 🔥");
      },
    }
  );

  const submitPost = (e: React.FormEvent) => {
    e.preventDefault();
    toastPostID = toast.loading("Creating your post", { id: toastPostID });
    mutate(title);
  };

  return (
    <form
      onSubmit={submitPost}
      className="bg-white my-8 p-8 rounded-md text-black "
    >
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          placeholder="What's on your mind?"
          className="p-4 text-lg rounded-md my-2  bg-gray-200"
        />
      </div>
      <div className=" flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          } `}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Create post
        </button>
      </div>
    </form>
  );
}
