import {Alert, Button, Paper, Tab, Tabs, TextField} from "@mui/material";
import {FormEvent, useCallback, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {loginAuthor} from "../../redux/features/auth/author";
import {loginAdministrator} from "../../redux/features/auth/administrator";

export const Login = () => {

    const isLoading = useAppSelector(state => state.appState.isLoading);
    const authError = useAppSelector(state => state.auth.authError);

    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tabIndex, setTabIndex] = useState(0);


    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault();

        if (tabIndex === 0) {
            dispatch(loginAuthor({email, password}));
        } else if (tabIndex === 1) {

        } else if (tabIndex === 2) {
            await dispatch(loginAdministrator({email, password}));
        }


    }, [tabIndex, email, password, dispatch]);

    return (
        <div>
            <Paper elevation={4} style={{width: 500, margin: 'auto'}}>
                <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} centered>
                    <Tab label="Auteur"/>
                    <Tab label="Evaluateur"/>
                    <Tab label="Administrateur"/>
                </Tabs>
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
                    <h2>Connexion</h2>

                    {
                        authError ?
                            <Alert severity="error" style={{width: '100%', marginTop: 10}}>
                                Identifiants incorrects
                            </Alert>
                            : null
                    }

                    <TextField id="email" label="Email" variant="standard" value={email}
                               onChange={(event) => setEmail(event.currentTarget.value)} type="email"/>
                    <TextField id="password" label="Mot de passe" variant="standard" value={password}
                               onChange={(event) => setPassword(event.currentTarget.value)} type="password"/>

                    <Button variant='contained' style={{marginTop: 20}} type='submit'
                            disabled={isLoading}>Confirmer</Button>
                </form>
            </Paper>
        </div>
    );
};