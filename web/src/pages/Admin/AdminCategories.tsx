import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {useCallback, useEffect, useState} from "react";
import {DataGrid, GridSelectionModel} from "@mui/x-data-grid";
import {Button} from "@mui/material";
import {deleteCategories, getCategories, updateCategory} from "../../redux/features/category/category-slice";

export const AdminCategories = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const categories = useAppSelector(state => state.category.categories);

    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const updateCategoryLabel = useCallback((id: number, label: string) => {
        console.log('Update category loabel');
        dispatch(updateCategory({id: id, label: label}));
    }, [dispatch]);

    const deleteSelectedCategories = useCallback(() => {
        dispatch(deleteCategories(selectionModel as number[]));
    }, [dispatch, selectionModel]);

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h2>Liste des catégories</h2>
                <Button variant='outlined' onClick={() => navigate('/categories/ajouter')}>Ajouter une
                    catégorie</Button>
            </div>
            <div>
                <Button disabled={selectionModel.length === 0} variant='outlined' onClick={deleteSelectedCategories}>Supprimer
                    les catégories sélectionnées</Button>
            </div>
            <div style={{height: '700px', margin: 20}}>
                <DataGrid
                    columns={[
                        {
                            field: 'id',
                            headerName: 'Id',
                        },
                        {
                            field: 'label',
                            headerName: 'Label',
                            width: 200,
                            editable: true
                        },
                    ]}
                    rows={categories}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                    }}
                    selectionModel={selectionModel}
                    onCellEditCommit={(params) => updateCategoryLabel(params.id as number, params.value)}
                />
            </div>
        </div>
    )
}