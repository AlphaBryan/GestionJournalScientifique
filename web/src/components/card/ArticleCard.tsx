import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Article} from "../../redux/dto/Article";
import dayjs from "dayjs";
import {pdfjs} from 'react-pdf';
import {getPhaseLabel} from "../../utils/phase";

type Props = {
    article: Article;
    onClick: () => void;
};

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function ArticleCard(props: Props) {
    const {article} = props;

    const authorsLabel = article.authors
        .map(author => `${author.firstName} ${author.lastName}`)
        .join(', ');

    return (
        <Card
            sx={{
                width: "90%",
                marginLeft: "5%",
                marginTop: "2%",
                marginBottom: "2%",
                paddingBottom: "2%",
            }}
            onClick={props.onClick}
        >
            <CardContent>
                <Typography
                    gutterBottom
                    variant="caption"
                    component="div"
                    sx={{fontWeight: 900, color: "blue"}}
                >
                    {getPhaseLabel(article)}
                </Typography>
                {/*{article?.evaluation === "Accepté" ? (
                    <Typography
                        gutterBottom
                        variant="caption"
                        component="div"
                        sx={{fontWeight: 900, color: "green"}}
                    >
                        &#10004; Article accepté
                    </Typography>
                ) : (
                    <Typography
                        gutterBottom
                        variant="caption"
                        component="div"
                        sx={{fontWeight: 900, color: "red"}}
                    >
                        &#10006; Article Refusé
                    </Typography>
                )}*/}

                <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                </Typography>
                <Typography gutterBottom variant="caption" component="div">
                    Par {authorsLabel} - {dayjs(new Date(article.creationDate)).format('DD MMM YYYY')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {/* {article.description}*/}
                </Typography>
            </CardContent>
            <CardActions>
                {article.categories.map((category) => (
                    <Typography key={category.id} variant="inherit" color="#72bcd4">
                        #{category.label}
                    </Typography>
                ))}
            </CardActions>
        </Card>
    );
}
