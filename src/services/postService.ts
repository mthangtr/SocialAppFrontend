import axios from "axios";
import { PostType } from "@/types/Global";

const API_URL = "http://localhost:8080";

export const createPost = async (data: FormData) => {
  return axios.post(`${API_URL}/posts`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getPosts = async () => {
  const postData: any = await axios.get<PostType[]>(`${API_URL}/posts`);
  return postData.data;
};

export const deletePost = async (id: string) => {
  return axios.delete(`${API_URL}/posts/${id}`);
};

export const updatePost = async (id: string, data: any) => {
  return axios.put(`${API_URL}/posts/${id}`, data);
};
