import React, { useContext, useEffect, useRef, useState } from "react";
import api from "../helpers/api";
import { Pencil, Trash, UserCircle } from "@phosphor-icons/react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { AuthContext } from "../helpers/authContext";
import { useLocation, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

export default function Details() {
  const commentToBeDelete = useRef({ id: null, name: "" });
  const { role } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.state?.id;
  const posts = location.state?.posts;
  const [details, setDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [openModalDeletePost, setOpenModalDeletePost] = useState(false);
  const [openModalDeleteComment, setOpenModalDeleteComment] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: details.title,
    },
  });

  // watch input values to display edited data
  const titleValue = watch("title");

  // reset the input with default values
  useEffect(() => {
    if (details) {
      reset({
        title: details.title,
      });
    }
  }, [details, reset]);

  // get details of post
  const getDetails = async () => {
    try {
      const response = await api.details(postId);
      setDetails(response.data);
    } catch (error) {
      alert(error);
    }
  };

  // get comments of post
  const getComments = async () => {
    try {
      const response = await api.comments(postId);
      setComments(response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getDetails();
    getComments();
  }, []);

  // save edited title
  const handleEditTitle = (data) => {
    console.log(data.title);
    setValue("title", data.title);
    setIsEdit(false);
    toast.success("Title successfully updated!");
  };

  // delete post
  const handleDeletePost = () => {
    const filterPosts = posts.filter((item) => item.id !== postId);
    toast.success("Post successfully deleted!");
    navigate("/posts", {
      state: {
        updatedPosts: filterPosts,
      },
    });
  };

  // handle click delete comment
  const handleClickDeleteComment = (name, id) => {
    commentToBeDelete.current = { id: id, name: name };
    setOpenModalDeleteComment(true);
  };

  // delete comment
  const handleDeleteComment = () => {
    console.log("delete");
    setComments(
      comments.filter((item) => item.id !== commentToBeDelete.current.id)
    );
    toast.success("Comment successfully deleted!");
    closeModal();
  };

  // close modal
  const closeModal = () => {
    setOpenModalDeletePost(false);
    setOpenModalDeleteComment(false);
  };

  // confirmation modal content
  const ModalContent = ({ type }) => {
    return (
      <div className="flex items-center space-x-5">
        <Button
          label="Delete"
          type="button"
          className="delete-button"
          onClick={() => {
            type === "post" ? handleDeletePost() : handleDeleteComment();
          }}
          isDirty={true}
        />
        <Button
          label="Cancel"
          type="button"
          className="outline-button"
          onClick={() => closeModal()}
          isDirty={true}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex flex-col p-10 space-y-10 pt-25">
        {/* Details */}
        <div className="flex flex-col space-y-5 pt-5">
          {isEdit ? (
            <form
              className="flex items-center space-x-5"
              onSubmit={handleSubmit(handleEditTitle)}
            >
              {/* Display title or title input */}
              <Input
                label=""
                name="title"
                type="text"
                register={register}
                validation={{ required: "Title is required" }}
                error={errors.title}
                readOnly={false}
              />
              <Button
                label="Save"
                type="submit"
                className="primary-button"
                onClick={null}
                isDirty={true}
              />
            </form>
          ) : (
            <p className="font-semibold text-2xl text-indigo-500">
              {titleValue ? titleValue : details?.title}
            </p>
          )}

          <p className="text-gray-700">{details?.body}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-gray-500 text-xs">
              <UserCircle size={18} weight="fill" />
              <p>User {details?.userId}</p>
            </div>
            {/* Action Buttons */}
            {role === "admin" && (
              <div className="flex items-center space-x-3">
                <Button
                  label={
                    <span className="flex items-center space-x-1">
                      <Pencil size={18} />
                      Edit
                    </span>
                  }
                  type="button"
                  className="text-button"
                  onClick={() => setIsEdit(true)}
                  isDirty={true}
                />
                <Button
                  label={
                    <span className="flex items-center space-x-1">
                      <Trash size={18} />
                      Delete
                    </span>
                  }
                  type="button"
                  className="text-button text-red-500"
                  onClick={() => setOpenModalDeletePost(true)}
                  isDirty={true}
                />
              </div>
            )}
          </div>
        </div>
        {/* Comments */}
        <div className="flex flex-col">
          {comments.map((item, index) => (
            <div
              key={index}
              className="border-t border-gray-300 px-3 py-5 text-sm text-gray-700"
            >
              <p>
                {item?.body} -{" "}
                <span className="inline-flex items-center space-x-2">
                  <span className="text-indigo-500">{item.name}</span>
                  {role === "admin" && (
                    <Trash
                      size={16}
                      color="red"
                      className="hover:cursor-pointer"
                      onClick={() =>
                        handleClickDeleteComment(item.name, item.id)
                      }
                    />
                  )}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <Modal
        open={openModalDeletePost}
        title="Confirm delete post?"
        closeModal={closeModal}
        content={<ModalContent type="post" />}
      />
      <Modal
        open={openModalDeleteComment}
        title={
          <span>
            Confirm delete comment by{" "}
            <span className="italic">{commentToBeDelete.current.name}</span>?
          </span>
        }
        closeModal={closeModal}
        content={<ModalContent type="comment" />}
      />
      <Toaster />
    </div>
  );
}
