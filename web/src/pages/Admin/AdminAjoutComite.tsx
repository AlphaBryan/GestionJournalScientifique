import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch, useAppSelector} from "../../redux/store";
import {FormEvent, useCallback, useEffect, useState} from "react";
import {addCommittee} from "../../redux/features/committee/committee-slice";
import {ArrowBack} from "@mui/icons-material";
import {
    Box,
    Button,
    Checkbox,
    Chip,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    SelectChangeEvent
} from "@mui/material";
import {getEvaluators} from "../../redux/features/evaluator/evaluator-slice";

export const AdminAjoutComite = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const isLoading = useAppSelector(state => state.appState.isLoading);
    const evaluators = useAppSelector(state => state.evaluator.evaluators);

    const [evaluatorsId, setEvaluatorsId] = useState<string[]>([]);


    useEffect(() => {
        dispatch(getEvaluators());
    }, [dispatch]);

    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault();
        await dispatch(addCommittee({evaluatorsId: evaluatorsId.map(id => parseInt(id, 10))}));
        navigate('/comites');
    }, [dispatch, evaluatorsId, navigate]);

    const handleChange = (event: SelectChangeEvent<typeof evaluatorsId>) => {
        const {target: {value}} = event;
        setEvaluatorsId(typeof value === 'string' ? value.split(',') : value);
    };

    const computeEvaluatorLabel = useCallback((evaluator: any) => {
        return `${evaluator.firstName} ${evaluator.lastName} - ${evaluator.id}`;
    }, []);

    return (
        <div>
            <div>
                <div onClick={() => navigate('/comites')} className='hover-btn'>
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

                        <h2>Ajouter un comité scientifique</h2>

                        <InputLabel id="evaluators-label">Evaluateurs</InputLabel>
                        <Select
                            labelId="evaluators-label"
                            id="evaluators"
                            multiple
                            value={evaluatorsId}
                            onChange={handleChange}
                            style={{width: 250}}
                            input={<OutlinedInput label="" placeholder=""/>}
                            renderValue={(selected) => (
                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                    {selected.map((value) => (
                                        <Chip key={value}
                                              label={computeEvaluatorLabel(evaluators.find(e => e.id.toString() === value))}/>
                                    ))}
                                </Box>
                            )}
                        >
                            {evaluators.map((evaluator) => (
                                <MenuItem
                                    key={evaluator.id}
                                    value={evaluator.id.toString()}
                                >
                                    <Checkbox checked={evaluatorsId.indexOf(evaluator.id.toString()) > -1}/>
                                    <ListItemText primary={computeEvaluatorLabel(evaluator)}/></MenuItem>
                            ))}
                        </Select>

                        <Button variant='contained' style={{marginTop: 20}} type='submit'
                                disabled={isLoading}>Confirmer</Button>

                    </form>
                </Paper>
            </div>
        </div>
    )
};