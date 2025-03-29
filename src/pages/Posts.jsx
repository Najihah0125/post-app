import React, { useEffect, useState } from "react";
import api from "../helpers/api";
import toast, { Toaster } from "react-hot-toast";
import { UserCircle } from "@phosphor-icons/react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";

export default function Posts() {
  const navigate = useNavigate();
  const location = useLocation();
  const updatedPosts = location.state?.updatedPosts;
  const [posts, setPosts] = useState(updatedPosts ? updatedPosts : []);

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
  }, [updatedPosts && updatedPosts?.length === 0]);

  //   trim paragraph
  const trim = (text) => {
    const words = text.split(" ");
    return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : text;
  };

  // handle click post to navigate to details page
  const handleClick = (id) => {
    navigate(`${id}`, {
      state: {
        id: id,
        posts: updatedPosts ? updatedPosts : posts,
      },
    });
  };

  return (
    <main className="min-h-screen">
      <Header />
      <div className="flex flex-col pt-30 p-10 space-y-5">
        {updatedPosts &&
          updatedPosts.map((item, index) => (
            <div
              key={index}
              className="flex flex-col p-5 space-y-3 border border-gray-200 hover:cursor-pointer"
              onClick={() => handleClick(item.id)}
            >
              <div className="flex space-x-1 items-center font-semibold text-xs text-gray-700">
                <UserCircle size={18} weight="fill" />
                <p>User {item.userId}</p>
              </div>
              <h2 className="font-semibold text-2xl text-indigo-500 hover:text-indigo-600">
                {item.title}
              </h2>
              <p className="text-gray-500 text-sm">{trim(item.body)}</p>
            </div>
          ))}
        {!updatedPosts &&
          posts.map((item, index) => (
            <div
              key={index}
              className="flex flex-col p-5 space-y-3 border border-gray-200 hover:cursor-pointer"
              onClick={() => handleClick(item.id)}
            >
              <div className="flex space-x-1 items-center font-semibold text-xs text-gray-700">
                <UserCircle size={18} weight="fill" />
                <p>User {item.userId}</p>
              </div>
              <h2 className="font-semibold text-2xl text-indigo-500 hover:text-indigo-600">
                {item.title}
              </h2>
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
