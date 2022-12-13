import {Article} from "./Article";

export interface Edition {
    id: number;
    name: string;
    submissionLimitDate: number;
    articles?: Article[];
    phase: 'RELECTURE' | 'CAMERA_READY' | 'PUBLISHED';
}