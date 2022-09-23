import { Book } from "./book";
import { Utilisateur } from "./utilisateur";

export interface Comment {
    commentId ?: number;
    content : String;
    utilisateur : Utilisateur;
    livre : Book;
}
