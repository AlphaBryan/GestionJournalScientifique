import {Evaluator} from "./Evaluator";

export interface Evaluation {
    id: number;
    rate: number;
    comment: string;
    commentMajor: boolean;
    evaluator: Evaluator;
}