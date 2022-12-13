import {Article} from "../redux/dto/Article";
import {Edition} from "../redux/dto/Edition";

export const getPhaseLabel = (article: Article) => {
    let phaseLabel = '';
    switch (article.phase) {
        case "CREATED":
            phaseLabel = "En attente d'affectation d'un comité d'évaluation";
            break;
        case "RELECTURE":
            phaseLabel = "En cours de relecture par le comité d'évalation";
            break;
        case "ACCEPTED":
            phaseLabel = "Accepté";
            break;
        case "ACCEPTED_WITH_MAJOR_COMMENT":
            phaseLabel = "Accepté avec commentaire majeur";
            break;
        case "REFUSED":
            phaseLabel = "Refusé";
            break;
        case "CAMERA_READY":
            phaseLabel = "Camera Ready";
            break;
        case "READY_TO_PUBLISH":
            phaseLabel = "Prêt à être publié";
            break;
        case "PUBLISHED":
            phaseLabel = "Publié";
            break;
    }
    return phaseLabel;
}

export const getEditionPhaseLabel = (edition: Edition) => {
    switch (edition.phase) {
        case 'RELECTURE': {
            return 'Période de relecture des articles';
        }
        case 'CAMERA_READY': {
            return 'Camera Ready';
        }
        case 'PUBLISHED': {
            return 'Publiée';
        }
    }
};