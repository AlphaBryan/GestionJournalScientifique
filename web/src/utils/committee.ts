import {Committee} from "../redux/dto/Committee";


export const computeCommitteeLabel = (committee: Committee) => {
    return `${committee.evaluators.map(evaluator => evaluator.lastName.toUpperCase()).join(', ')} - ${committee.id}`
}