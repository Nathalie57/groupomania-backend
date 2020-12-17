import axios from "axios";
import Cache from "./cache";
import { COMMENTS_API } from "../config";

async function findMainComments() {
  const token = localStorage.getItem("authToken");
  const cachedComments = await Cache.get("comments");

  if (cachedComments) return cachedComments;

  const config = {
    method: "get",
    url: `${COMMENTS_API}`,
    headers: { Authorization: `Bearer ${token}` },
  };

  let data = await axios(config);
  return data;
}

async function findChildComments(id) {
  const token = localStorage.getItem("authToken");
  const cachedComments = await Cache.get("comments");

  if (cachedComments) return cachedComments;

  const config = {
    method: "get",
    url: `${COMMENTS_API + "/" + id + "/childComments"}`,
    headers: { Authorization: `Bearer ${token}` },
  };
  let data = await axios(config);
  return data;
}

async function create(comment) {
  const token = localStorage.getItem("authToken");
  const config = {
    method: "post",
    url: `${COMMENTS_API}`,
    data: comment,
    headers: { Authorization: `Bearer ${token}` },
  };
  let response = await axios(config);
  console.log(response);
  return response;
}

async function createReply(comment, id) {
  const token = localStorage.getItem("authToken");
  const config = {
    method: "post",
    url: `${COMMENTS_API + "/" + id + "/replies"}`,
    data: comment,
    headers: { Authorization: `Bearer ${token}` },
  };
  let response = await axios(config);
  console.log(response);
  return response;
}

async function countLikes(id) {
  const token = localStorage.getItem("authToken");
  const config = {
    method: "get",
    url: `${COMMENTS_API + "/" + id + "/likes"}`,
    headers: { Authorization: `Bearer ${token}` },
  };
  let data = await axios(config);
  return data;
}

async function createLike(like, id) {
  const token = localStorage.getItem("authToken");
  const config = {
    method: "post",
    url: `${COMMENTS_API + "/" + id + "/likes"}`,
    data: like,
    headers: { Authorization: `Bearer ${token}` },
  };
  let response = await axios(config);
  console.log(response);
  return response;
}

export default {
  findMainComments,
  create,
  countLikes,
  findChildComments,
  createReply,
  createLike
};
