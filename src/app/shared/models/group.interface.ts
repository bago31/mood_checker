import {User} from "./user.interface";

export interface Group {
  name: string;
  managerId: string;
  members: User[] | null;

}
