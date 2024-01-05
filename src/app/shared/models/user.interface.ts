import {Roles} from "../enums/roles";

export interface User{
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Roles;
}
