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
        paddingBottom:"2%"
      }}
    >
      <CardContent>
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
