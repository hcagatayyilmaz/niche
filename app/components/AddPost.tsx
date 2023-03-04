"use client";
import { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  return (
    <form action="">
      <div>
        <textarea
          className="w-full border-none p-4 rounded text-black"
          onChange={(e) => setTitle(e.target.value)}
          name="Title"
          value={title}
          placeholder="Post something"
        ></textarea>
      </div>
    </form>
  );
}
