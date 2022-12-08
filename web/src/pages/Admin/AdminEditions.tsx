import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {useEffect} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {getEditions} from "../../redux/features/admin/slice";
import {Button} from "@mui/material";
import dayjs from "dayjs";


export const AdminEditions = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const editions = useAppSelector(state => state.admin.editions);

    useEffect(() => {
        dispatch(getEditions());
    }, [dispatch]);

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h2>Liste des éditions</h2>
                <Button variant='outlined' onClick={() => navigate('/editions/ajouter')}>Ajouter une
                    édition</Button>
            </div>
            <div style={{height: '700px', margin: 20}}>
                <DataGrid
                    columns={[
                        {
                            field: 'id',
                            headerName: 'Id',
                        },
                        {
                            field: 'name',
                            headerName: 'Name',
                            width: 200
                        },
                        {
                            field: 'submissionLimitDate',
                            headerName: 'Date limit de soumission des articles',
                            width: 200
                        }
                    ]}
                    rows={editions.map(edition => ({
                        id: edition.id,
                        name: edition.name,
                        submissionLimitDate: dayjs(new Date(edition.submissionLimitDate)).format('DD MMM YYYY')
                    }))}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
        </div>
    );

};