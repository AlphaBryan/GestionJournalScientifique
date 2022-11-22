import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type Props = {
  article: any;
};

export default function ArticleCard(props: Props) {
  const { article } = props;

  return (
    <Card
      sx={{
        width: "90%",
        marginLeft: "5%",
        marginTop: "2%",
        marginBottom: "2%",
        paddingBottom: "2%",
      }}
    >
      <CardContent>
        {article?.evaluation === "Accepté" ? (
          <Typography
            gutterBottom
            variant="caption"
            component="div"
            sx={{ fontWeight: 900, color: "green" }}
          >
            &#10004; Article accepté
          </Typography>
        ) : (
          <Typography
            gutterBottom
            variant="caption"
            component="div"
            sx={{ fontWeight: 900, color: "red" }}
          >
            &#10006; Article Refusé
          </Typography>
        )}

        <Typography gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography gutterBottom variant="caption" component="div">
          Par {article.auteur} - {article.date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.description}
        </Typography>
      </CardContent>
      <CardActions>
        {article.categories.map((categorie: any, index: any) => (
          <Typography key={index} variant="inherit" color="#72bcd4">
            #{categorie}
          </Typography>
        ))}
      </CardActions>
    </Card>
  );
}
