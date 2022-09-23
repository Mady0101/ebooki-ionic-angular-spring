import { Auteur } from "./auteur";
import { Theme } from "./theme";

export interface Book {
     livreId ?: number;
     nom ?: String;
     theme : Partial<Theme>;
     auteur :Partial<Auteur>;
     description ?: String;
     vues ?: number;
     jaimes ?: number;
     img ?: String;
     pdf ?: String;
     isLiked ?: boolean;
     isVued ?: boolean;

}
