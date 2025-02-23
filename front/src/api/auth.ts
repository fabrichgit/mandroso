// import axios from "axios";
// import { api, token } from "../constant";

export type User = {
  ID: string;
  Name: string;
  LastName: string;
  Email: string;
  Avatar?: string;
  Role: "gerant" | string;
  Available: boolean;
  birthAt: string;
  birthDate: string;
  Contact: string[];
  Post: string;
  archived?: boolean;
  startTime?: string | null;
  endTime?: string | null;
};

export type Auth = {
  name: string;
  password: string;
};

export async function login(data: Auth) {
  // const res = await axios.post(`${api()}/user/login`, data);
  // return res.data;
  if (data.name === "admin" && data.password === "admin") {
    return { Token: "gerant" };
  } else if (data.name === "vendeur" && data.password === "vendeur") {
    return { Token: "vendeur" };
  } else {
    throw new Error("auth failed");
  }
}

const gerant = { Name: "Mr Gerant", Role: "gerant", Available: true, Email: "admin@gmail.com", ID: "sfdgjkl", Avatar: "" }
const vendeur = { Name: "Mr vendeur", Role: "vendeur", Available: true, Email: "vendeur@gmail.com", ID: "wjekshhd", Avatar: "" }

export async function auth() {
  // const res = await axios.get<User>(`${api()}/user/`, {
  //   headers: {
  //     Authorization: token(),
  //   },
  // });
  // return res.data;
  if (!localStorage.getItem("token")) {
    throw new Error("invalid token")
  }

  switch (localStorage.getItem("token")) {
    case "gerant":
      return gerant as User
    case "vendeur":
      return vendeur as User
    default:
      throw new Error("invalid token")
      break;
  }

}
