import {useAppDispatch, useAppSelector} from "../../redux/store";
import {FormEvent, useCallback, useState} from "react";
import {Alert, Button, Paper, TextField} from "@mui/material";
import {registerAuthor} from "../../redux/features/auth/author";


export const Register = () => {
    const isLoading = useAppSelector(state => state.appState.isLoading);
    const authError = useAppSelector(state => state.auth.authError);

    const dispatch = useAppDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback((event: FormEvent) => {
        event.preventDefault();
        dispatch(registerAuthor({ firstName, lastName, email, password }));
    }, [dispatch, firstName, lastName, email, password]);

    return (
        <div>
            <Paper elevation={4} style={{width: 500, margin: 'auto'}}>
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
                    <h2>Créer un compte en tant qu'auteur</h2>

                    {
                        authError ?
                            <Alert severity="error" style={{width: '100%', marginTop: 10}}>
                                Adresse email déjà utilisée
                            </Alert>
                            : null
                    }

                    <TextField id="firstname" label="Prénom" variant="standard" value={firstName}
                               onChange={(event) => setFirstName(event.currentTarget.value)} type="text"/>
                    <TextField id="lastname" label="Nom" variant="standard" value={lastName}
                               onChange={(event) => setLastName(event.currentTarget.value)} type="text"/>
                    <TextField id="email" label="Email" variant="standard" value={email}
                               onChange={(event) => setEmail(event.currentTarget.value)} type="email"/>
                    <TextField id="password" label="Mot de passe" variant="standard" value={password}
                               onChange={(event) => setPassword(event.currentTarget.value)} type="password"/>

                    <Button variant='contained' style={{marginTop: 20}} type='submit'
                            disabled={isLoading}>Confirmer</Button>
                </form>
            </Paper>
        </div>
    )
}