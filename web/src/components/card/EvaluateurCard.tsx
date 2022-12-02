import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type Props = {
  evaluateur: any;
};

export default function EvaluateurCard(props: Props) {
  const { evaluateur } = props;

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
        <Typography gutterBottom variant="h5" component="div">
          {evaluateur.nom}
        </Typography>
        <Typography
          gutterBottom
          variant="caption"
          component="div"
          sx={{ fontWeight: 900 }}
        >
          Membre depuis {evaluateur.membresDepuis} - {" "}
          {evaluateur.nombresEvaluationDonnees} évaluations Données
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {evaluateur.email}
        </Typography>
      </CardContent>
    </Card>
  );
}
