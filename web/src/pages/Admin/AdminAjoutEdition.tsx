import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch, useAppSelector} from "../../redux/store";
import {FormEvent, useCallback, useState} from "react";
import {ArrowBack} from "@mui/icons-material";
import {Button, Paper, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {addEdition} from "../../redux/features/adminSlice";
import dayjs, {Dayjs} from "dayjs";


export const AdminAjoutEdition = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const isLoading = useAppSelector(state => state.appState.isLoading);


    const [name, setName] = useState('');
    const [submissionLimitDate, setSubmissionLimitDate] = useState<Dayjs | null>(dayjs());

    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault();
        if (!submissionLimitDate) return;
        await dispatch(addEdition({name, submissionLimitDate: submissionLimitDate.toDate().getTime()}));
        navigate('/admin/editions');
    }, [dispatch, name, submissionLimitDate]);

    return (
        <div>
            <div>
                <div onClick={() => navigate('/admin/editions')} className='hover-btn'>
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

                        <h2>Ajouter une édition</h2>

                        <TextField id='name' label="Nom de l'édition" variant='standard' value={name}
                                   onChange={(event) => setName(event.currentTarget.value)}/>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date limite de soumission des articles"
                                value={submissionLimitDate}
                                onChange={(newValue) => setSubmissionLimitDate(newValue)}
                                renderInput={(params) => <TextField variant='standard' {...params} />}
                            />
                        </LocalizationProvider>

                        <Button variant='contained' style={{marginTop: 20}} type='submit'
                                disabled={isLoading}>Confirmer</Button>

                    </form>
                </Paper>
            </div>
        </div>
    );

};