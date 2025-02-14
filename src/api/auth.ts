// import axios from "axios";
// import { api, token } from "../constant";

export type User = {
  ID: string;
  Name: string;
  Email: string;
  Avatar?: string;
  Role: "gerant" | string;
  Available: boolean;
  birthAt: string;
  birthDate: string;
  Contact: string;
  Post: string;
};

export type Auth = {
  name: string;
  password: string;
};

export async function login(data: Auth) {
  // const res = await axios.post(`${api()}/user/login`, data);
  // return res.data;
  if (data.name === "admin" && data.password === "admin") {
    return {Token: "afsghdjklfsf"}; 
  } else{
    throw new Error("auth failed");
  }
}

export async function auth() {
  // const res = await axios.get<User>(`${api()}/user/`, {
  //   headers: {
  //     Authorization: token(),
  //   },
  // });
  // return res.data;
  return {Name: "Mr Gerant", Role: "gerant", Available: true, Email: "admin@gmail.com", ID: "sfdgjkl", Avatar: ""} as User
}
