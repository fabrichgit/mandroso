export interface User {
  id?: string;
  name: string;
  first_name: string;
  adresse: string;
  birthday?: string;
  career: string;
  contacts: string[];
  role_id: string;
  startlogintime: string;
  stoplogintime: string;
}

export interface Role {
  RoleName: string;
  RoleDescription: string;
}

export interface AuthData {
  login: string;
  password: string;
}

export interface UserLogin {
  user_id: string;
  login: string;
  password: string;
}