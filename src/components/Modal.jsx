import { X } from "@phosphor-icons/react";
import React from "react";

const Modal = ({ open, title, closeModal, content }) => {
  return (
    <>
      {open && (
        // background overlay
        <div className="flex shadow-sm fixed inset-0 z-50 bg-black/50 h-full justify-center items-center">
          {/* modal */}
          <div className="flex flex-col bg-white shadow-lg w-1/3 rounded-xl">
            {/* header */}
            <div className="flex items-center justify-between w-full text-white bg-indigo-600 p-3 px-5 text-xl rounded-t-xl">
              <div className="flex items-center space-x-3 font-bold">
                <p>{title}</p>
              </div>
              {/* window control buttons */}
              <div className="flex items-center space-x-3">
                <div
                  className="hover:bg-white/25 rounded-full p-1 cursor-pointer"
                  onClick={() => closeModal()}
                >
                  <X size={22} weight="bold" />
                </div>
              </div>
            </div>
            {/* content */}
            <div className="bg-white text-sm p-10 flex flex-col space-y-5 overflow-y-auto items-center max-h-full rounded-b-xl">
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
