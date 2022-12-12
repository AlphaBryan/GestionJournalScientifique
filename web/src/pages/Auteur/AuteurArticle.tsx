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
import {articleActions, getCurrentAuthorArticles} from "../../redux/features/article/article-slice";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import {Version} from "../../redux/dto/Version";
import {ExpandMore} from "@mui/icons-material";
import {Document, Page} from "react-pdf";
import {getPhaseLabel} from "../../utils/phase";
import {API_URL} from "../../redux/httpUtil";

interface RenderVersionProps {
    version: Version;
}

const RenderVersion = (props: RenderVersionProps) => {
    const {version} = props;

    const [selectedTab, setSelectedTab] = useState(0);
    const [numPages, setNumPages] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    function onDocumentLoadSuccess({numPages}: { numPages: number }) {
        setNumPages(numPages);
    }

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
                <div style={{width: '100%'}} ref={containerRef}>
                    {selectedTab === 0 ? (
                        <Document file={`${API_URL}/uploads/${version.text}`} onLoadSuccess={onDocumentLoadSuccess}>
                            {Array.from(
                                new Array(numPages),
                                (el, index) => (
                                    <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        width={containerRef.current?.offsetWidth}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                    />
                                ),
                            )}
                        </Document>
                    ) : null}
                </div>

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
    useEffect(() => {
        dispatch(articleActions.cleanCreatedArticle());
    }, [dispatch]);

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
                    {article.versions.map(version => <RenderVersion key={version.id} version={version}/>)}
                </CardContent>
            </Card>
        </div>
    )

};