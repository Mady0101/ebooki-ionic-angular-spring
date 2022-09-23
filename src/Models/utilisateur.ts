import { Rank } from "./rank";
import { Role } from "./role";

export interface Utilisateur {
    userId?: number;
    username?: String;
    password?: String;
    email?: String;
    profile_img?: String;
    birthday?: String;
    exp?:number;
    roles?:String[];
    rank ?: Rank
}
