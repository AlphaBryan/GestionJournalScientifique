import {Category} from "./Category";
import {Author} from "./Author";
import {Version} from "./Version";
import {Committee} from "./Committee";

export interface Article {
    id: number;
    title: string;
    phase: 'CREATED' | 'RELECTURE' | 'ACCEPTED' | 'ACCEPTED_WITH_MAJOR_COMMENT' | 'REFUSED' | 'CAMERA_READY' | 'READY_TO_PUBLISH' | 'PUBLISHED';
    creationDate: number;
    categories: Category[];
    authors: Author[];
    versions: Version[];
    committee: Committee | null;
}