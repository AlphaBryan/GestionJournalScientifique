import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {deleteEvaluators, getEvaluators} from "../../redux/features/adminSlice";
import {DataGrid, GridSelectionModel} from "@mui/x-data-grid";


export const AdminEvaluateurs = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const evaluators = useAppSelector(state => state.admin.evaluators);

    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

    useEffect(() => {
        dispatch(getEvaluators());
    }, [dispatch]);

    const deleteSelectedEvaluators = useCallback(() => {
       dispatch(deleteEvaluators(selectionModel as number[]));
    }, [dispatch, selectionModel]);


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <h2>Liste des evaluateurs</h2>
                <Button variant='outlined' onClick={() => navigate('/admin/evaluateurs/ajouter')}>Ajouter un évaluateur</Button>
            </div>
            <div>
                <Button disabled={selectionModel.length === 0} variant='outlined' onClick={deleteSelectedEvaluators}>Supprimer les évaluateurs sélectionnés</Button>
            </div>
            <div style={{ height: '700px', margin: 20 }}>
                <DataGrid
                    columns={[
                        {
                            field: 'id',
                            headerName: 'Id',
                        },
                        {
                            field: 'firstName',
                            headerName: 'First name'
                        },
                        {
                            field: 'lastName',
                            headerName: 'Last name'
                        }
                    ]}
                    rows={evaluators}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                    }}
                    selectionModel={selectionModel}
                />
            </div>
        </div>
    )
}