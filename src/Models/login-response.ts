import { Rank } from "./rank";
import { Role } from "./role";

export interface LoginResponse {
    jwt : string;
    userId?: number;
    username?: String;
    email?: String;
    birthday ?:String;
    profile_img ?: String;
    exp ?: number;
    rank ?: Rank;
    roles?: String[]
}
