import {Category} from "./Category";
import {Author} from "./Author";
import {Version} from "./Version";

export interface Article {
    id: number;
    title: string;
    categories: Category[];
    authors: Author[];
    versions: Version[];
}