import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {useCallback, useEffect} from "react";
import {
    getEditionArticles,
    getEditions,
    publishEdition,
    startEditionCameryReadyPhase
} from "../../redux/features/edition/edition-slice";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import dayjs from "dayjs";
import {getEditionPhaseLabel, getPhaseLabel} from "../../utils/phase";


export const AdminEdition = () => {

    const {editionId} = useParams();
    const edition = useAppSelector(state => state.edition.editions).find(e => e.id === parseInt(editionId as string, 10));

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!edition) {
            dispatch(getEditions());
        } else if (!edition.articles) {
            dispatch(getEditionArticles(edition.id));
        }
    }, [dispatch, edition]);

    const startCameraReady = useCallback(() => {
        if (!edition) return;
        dispatch(startEditionCameryReadyPhase(edition.id));
    }, [dispatch, edition]);

    const publish = useCallback(() => {
        if (!edition) return;
        dispatch(publishEdition(edition.id));
    }, [dispatch, edition])

    if (!edition) return null;


    return (
        <div>
            <Card sx={{position: 'relative'}}>
                <CardHeader
                    title={edition.name}
                />
                <CardContent>
                    <h3>Phase: {getEditionPhaseLabel(edition)}</h3>
                    {
                        edition.phase === 'RELECTURE' ? (
                            <Button onClick={startCameraReady} variant='contained'>Lancer la phase de Camera
                                Ready</Button>
                        ) : edition.phase === 'CAMERA_READY' ? (
                            <Button onClick={publish} variant='contained'>Publier l'édition</Button>
                        ) : null
                    }
                    <h3>Articles</h3>
                    <div style={{height: '700px', margin: 20}}>
                        {
                            edition.articles ? (
                                <DataGrid
                                    columns={[
                                        {
                                            field: 'id',
                                            headerName: 'Id',
                                        },
                                        {
                                            field: 'title',
                                            headerName: 'Titre',
                                            width: 200
                                        },
                                        {
                                            field: 'creationDate',
                                            headerName: 'Date de création',
                                            width: 200
                                        },
                                        {
                                            field: 'phase',
                                            headerName: 'Phase',
                                            width: 300
                                        }
                                    ]}
                                    rows={edition.articles.map(article => ({
                                        id: article.id,
                                        title: article.title,
                                        creationDate: dayjs(new Date(article.creationDate)).format('DD MMM YYYY'),
                                        phase: getPhaseLabel(article)
                                    }))}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    onRowClick={params => navigate(`/editions/${edition.id}/articles/${params.id}`)}
                                />
                            ) : null
                        }
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}