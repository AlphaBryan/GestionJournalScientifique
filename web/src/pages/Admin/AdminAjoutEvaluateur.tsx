import {ArrowBack} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {Button, Paper, TextField} from "@mui/material";
import {FormEvent, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addEvaluator} from "../../redux/features/adminSlice";
import {AppDispatch, RootState} from "../../redux/store";

export const AdminAjoutEvaluateur = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const isLoading = useSelector<RootState>(state => state.appState.isLoading) as boolean;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault();
        await dispatch(addEvaluator({firstName, lastName, email, password}));
        navigate('/admin/evaluateurs');
    }, [dispatch, firstName, lastName, email, password]);

    useEffect(() => {

    }, [isLoading]);

    return (
        <div>
            <div>
                <div onClick={() => navigate('/admin/evaluateurs')} className='hover-btn'>
                    <ArrowBack fontSize={'large'}/>
                </div>
            </div>

            <div>
                <Paper elevation={4} style={{ width: 500, margin: "auto"}}>
                    <form
                        onSubmit={handleSubmit}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20}}
                    >

                        <h2>Ajouter un évaluateur</h2>

                        <TextField id='firstname' label='Prénom' variant='standard' value={firstName} onChange={(event) => setFirstName(event.currentTarget.value)}/>
                        <TextField id='lastname' label='Nom de famille' variant='standard' value={lastName} onChange={(event) => setLastName(event.currentTarget.value)}/>
                        <TextField id='email' label='Adresse email' variant='standard' type='email' value={email} onChange={(event) => setEmail(event.currentTarget.value)}/>
                        <TextField id='password' label='Mot de passe' variant='standard' type='password' value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>

                        <Button variant='contained' style={{ marginTop: 20 }} type='submit' disabled={isLoading}>Confirmer</Button>

                    </form>
                </Paper>
            </div>
        </div>
    )

}