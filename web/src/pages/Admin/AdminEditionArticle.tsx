import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Chip,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {getPhaseLabel} from "../../utils/phase";
import * as React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {getEditionArticles, getEditions} from "../../redux/features/edition/edition-slice";
import dayjs from "dayjs";
import {getCommittees} from "../../redux/features/committee/committee-slice";


export const AdminEditionArticle = () => {
    const {editionId, articleId} = useParams();

    const edition = useAppSelector(state => state.edition.editions).find(e => e.id === parseInt(editionId as string, 10));
    const article = edition?.articles?.find(a => a.id === parseInt(articleId as string, 10));

    const committees = useAppSelector(state => state.committee.committees);

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!edition) {
            dispatch(getEditions());
        } else if (!article) {
            dispatch(getEditionArticles(edition.id));
        }

        dispatch(getCommittees());

        if (article) {
            setCommitteeId(article.committee?.id ?? '');
        }
    }, [dispatch, edition, article]);

    const [committeeId, setCommitteeId] = useState<number | ''>('');

    if (!article) return null;

    const authorsLabel = article.authors
        .map(author => `${author.firstName} ${author.lastName}`)
        .join(', ');
    const subHeader = `Par ${authorsLabel} - ${dayjs(new Date(article.creationDate)).format('DD MMM YYYY')}`


    return (
        <div>
            <Card
                sx={{position: 'relative'}}
            >
                <CardHeader
                    title={article.title}
                    subheader={subHeader}
                >
                </CardHeader>
                <Typography
                    gutterBottom
                    variant="caption"
                    component="div"
                    sx={{fontWeight: 900, color: "blue", position: 'absolute', top: 10, right: 10}}
                >
                    {getPhaseLabel(article)}

                </Typography>
                <CardContent>

                    <h2> Comité scientifique </h2>
                    <Select
                        labelId="committee-label"
                        id="committee"
                        value={committeeId}
                        onChange={(event) => {
                            const {target: {value}} = event;
                            setCommitteeId(value as number);
                        }}
                        style={{width: 250}}
                        input={<OutlinedInput label="" placeholder=""/>}
                        renderValue={(selected) => (
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                <Chip key={selected}
                                      label={committees.find(c => c.id === selected)?.id}/>
                            </Box>
                        )}
                    >
                        {committees.map((committee) => (
                            <MenuItem
                                key={committee.id}
                                value={committee.id}
                            >
                                <Checkbox checked={committeeId === committee.id}/>
                                <ListItemText primary={committee.id}/></MenuItem>
                        ))}
                    </Select>

                </CardContent>
            </Card>
        </div>
    )
}