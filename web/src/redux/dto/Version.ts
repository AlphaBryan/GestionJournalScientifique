import {Evaluation} from "./Evaluation";

export interface Version {
    id: number;
    text: string;
    creationDate: number;
    evaluations: Evaluation[];
}