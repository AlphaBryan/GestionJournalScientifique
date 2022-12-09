import {useAppDispatch, useAppSelector} from "../../redux/store";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Card,
    CardContent,
    CardHeader,
    Tab,
    Tabs
} from "@mui/material";
import {useParams} from "react-router-dom";
import {getCurrentAuthorArticles} from "../../redux/features/article/article-slice";
import * as React from "react";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import {Version} from "../../redux/dto/Version";
import {ExpandMore} from "@mui/icons-material";
import {Document} from "react-pdf";
import {getPhaseLabel} from "../../utils/phase";

interface RenderVersionProps {
    version: Version;
}

const RenderVersion = (props: RenderVersionProps) => {
    const {version} = props;

    const [selectedTab, setSelectedTab] = useState(0);
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore/>}
            >
                <Typography>{dayjs(new Date(version.creationDate)).format('DD MMM YYYY HH:mm')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
                        <Tab label="PDF de l'article"/>
                        <Tab label="Evaluations"/>
                    </Tabs>
                </Box>
                {selectedTab === 0 ? (
                    <Document file={''}/>
                ) : null}

            </AccordionDetails>
        </Accordion>
    )
}

export const AuteurArticle = (props: any) => {

    const {articleId} = useParams();
    const article = useAppSelector(state => state.article.authUserArticles).find(a => a.id === parseInt(articleId as string, 10));

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!article) {
            dispatch(getCurrentAuthorArticles());
        }
    }, [dispatch, article]);

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
                    {article.versions.map(version => <RenderVersion version={version}/>)}
                </CardContent>
            </Card>
        </div>
    )

};