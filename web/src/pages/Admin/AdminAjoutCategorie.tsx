import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {FormEvent, useCallback, useState} from "react";
import {ArrowBack} from "@mui/icons-material";
import {Button, Paper, TextField} from "@mui/material";
import {addCategory} from "../../redux/features/admin/category";


export const AdminAjoutCategorie = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const isLoading = useSelector<RootState>(state => state.appState.isLoading) as boolean;

    const [label, setLabel] = useState('');

    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault();
        await dispatch(addCategory({label}));
        navigate('/categories');
    }, [dispatch, label]);

    return (
        <div>
            <div>
                <div onClick={() => navigate('/categories')} className='hover-btn'>
                    <ArrowBack fontSize={'large'}/>
                </div>
            </div>

            <div>
                <Paper elevation={4} style={{width: 500, margin: "auto"}}>
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 20
                        }}
                    >

                        <h2>Ajouter une catégorie</h2>

                        <TextField id='label' label='Label' variant='standard' value={label}
                                   onChange={(event) => setLabel(event.currentTarget.value)}/>

                        <Button variant='contained' style={{marginTop: 20}} type='submit'
                                disabled={isLoading}>Confirmer</Button>

                    </form>
                </Paper>
            </div>
        </div>
    );

}