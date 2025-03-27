import React, { useEffect, useState } from "react";
import api from "../helpers/api";
import toast, { Toaster } from "react-hot-toast";
import { ChatsCircle } from "@phosphor-icons/react";
import Button from "../components/Button";
import Header from "../components/Header";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  //  call api
  const getPosts = async () => {
    try {
      const response = await api.posts();
      setPosts(response.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  //   trim paragraph
  const trim = (text) => {
    const words = text.split(" ");
    return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : text;
  };

  return (
    <main className="min-h-screen">
      <Header />
      <div className="flex flex-col pt-30 p-10 space-y-5">
        {posts.map((item, index) => (
          <div
            key={index}
            className="flex flex-col p-5 space-y-3 border border-gray-200"
          >
            <p className="font-semibold text-sm text-gray-700">
              User {item.userId}
            </p>
            <h2 className="font-semibold text-2xl text-black">{item.title}</h2>
            <p className="text-gray-500 text-sm">{trim(item.body)}</p>
            {/* <div className="flex space-x-5">
              <Button
                label={<ChatsCircle size={22} />}
                type="button"
                className="p-1 rounded-full hover:bg-gray-200 hover:cursor-pointer"
                onClick={null}
                isDirty={true}
              />              
            </div> */}
          </div>
        ))}
      </div>
      <Toaster />
    </main>
  );
}
