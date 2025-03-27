import axios from "axios";

const api = {
  // -------------------------------- DATA --------------------------------
  posts: async () => {
    return axios.get("https://jsonplaceholder.typicode.com/posts", {});
  },

  details: async (id) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`, {});
  },
};

export default api;
