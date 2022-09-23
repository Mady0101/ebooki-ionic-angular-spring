import { Book } from "./book";
import { Utilisateur } from "./utilisateur";

export interface SubscribedBooks {
    abonneId ?: number;
    utilisateur ?: Partial<Utilisateur>;
    livre ?: Partial<Book>;
    pageMarked ?: number;
    completion ?: number;
    finished ?:boolean;
    timer ?:number;
}
