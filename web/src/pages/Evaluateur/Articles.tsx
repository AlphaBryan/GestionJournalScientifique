import React from "react";
import ArticleCard from "../../components/card/ArticleCard";
import { Typography, Grid, Box, TextField, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { evaluateArticle } from "../../redux/features/article/article-slice";

type Props = {};

const Screen = (props: Props) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const article = location.state.data;
  const [status, setStatus] = React.useState("non");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus((event.target as HTMLInputElement).value);
  };

  const [rate, setRate] = React.useState("");
  const [comment, setComment] = React.useState("");

  const sendData = async () => {
    var error = false;
    if (rate === "") {
      alert("Veuillez remplir le champ note");
      error = true;
    }

    if (parseInt(rate) < 0 || parseInt(rate) > 3) {
      alert("Veuillez remplir le champ note avec une valeur entre 0 et 3");
      error = true;
    }

    if (error == false) {
      const data = {
        articleId: article.id,
        versionId: article.versions[0].id,
        comment: comment,
        isCommentMajor: status === "oui" ? true : false,
        rate: parseInt(rate),
      };
      await dispatch(evaluateArticle(data));
      alert("Votre évaluation a été envoyée avec succès");
    }
  };

  const labelCategories: any = [];
  article.categories.forEach((category: any) => {
    labelCategories.push(category.label);
  });

  return (
    <div>
      <div>
        <h1 style={{ marginTop: "5%" }}> &#9997; Évaluation d'article </h1>
      </div>

      <div>
        <h4 style={{ marginTop: "5%" }}> &#9733; Information article </h4>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <TextField
              id="outlined-read-only-input"
              multiline
              label="Titre"
              defaultValue={article.title}
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: "80%", marginBottom: "5%" }}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              id="outlined-read-only-input"
              multiline
              label="Categories"
              defaultValue={labelCategories}
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: "80%", marginBottom: "5%" }}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              id="outlined-read-only-input"
              label="Date"
              defaultValue={article.creationDate}
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: "80%", marginBottom: "5%" }}
            />
          </Grid>
        </Grid>
      </Box>
      <div
        style={{
          background: "black",
          height: "3px",
          width: "75%",
          margin: "auto",
          marginTop: "3%",
          marginBottom: "5%",
        }}
      />
      {/* liste des author */}
      <h4 style={{ marginTop: "5%" }}> &#9733; Auteurs </h4>

      <Box sx={{ flexGrow: 1 }}>
        {article.authors.map((author: any, index: any) => (
          <Grid key={index} container spacing={2}>
            <Grid item xs={6} md={8}>
              <TextField
                id="outlined-read-only-input"
                label={`Auteur ${index + 1}`}
                defaultValue={author.firstName + " " + author.lastName}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ width: "80%", marginBottom: "5%" }}
              />
            </Grid>
          </Grid>
        ))}
      </Box>
      <div
        style={{
          background: "black",
          height: "3px",
          width: "75%",
          margin: "auto",
          marginTop: "3%",
          marginBottom: "5%",
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <h4 style={{ marginTop: "5%" }}> &#9733; Fichers </h4>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <FileDownloadIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Télécharger le fichier"
            variant="standard"
            defaultValue="Fichers.pdf"
            sx={{ width: "90%" }}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box sx={{}}>
          <h4 style={{ marginTop: "5%", marginBottom: "2%" }}>
            {" "}
            &#9733; Appréciation
          </h4>
          <h5
            style={{ marginTop: "1%", marginBottom: "0%", marginLeft: "1.5%" }}
          >
            {" "}
            &#9864; Quel note donnez vous à cette article ?
          </h5>
          <Box sx={{ marginBottom: "2%", marginLeft: "1.5%" }}>
            <TextField
              id="outlined-multiline-static"
              type="number"
              label="Donner une note"
              rows={4}
              placeholder="Donner une note entre 0 et 3"
              sx={{ width: "50%" }}
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </Box>
        </Box>
        <Box sx={{ marginTop: "0%", marginLeft: "1.5%" }}>
          <h5 style={{ marginTop: "1%", marginBottom: "0%" }}>
            {" "}
            &#9864; Avez vous des commentaires ?
          </h5>
          <TextField
            id="outlined-multiline-static"
            label="Commentaire"
            multiline
            rows={4}
            placeholder="Ecrire un commentaire"
            sx={{ width: "90%" }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Box>
      </Box>
      <h5 style={{ marginTop: "3%", marginBottom: "0%", marginLeft: "1.5%" }}>
        {" "}
        &#9864; Est ce un commentaire majeur ?
      </h5>
      <FormControl sx={{ marginLeft: "1.5%" }}>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={status}
          onChange={handleChange}
        >
          <FormControlLabel value="oui" control={<Radio />} label="Oui" />
          <FormControlLabel value="non" control={<Radio />} label="Non" />
        </RadioGroup>
      </FormControl>
      <div>
        <Button
          variant="contained"
          sx={{
            width: "70%",
            marginLeft: "15%",
            marginTop: "5%",
            marginBottom: "5%",
            backgroundColor: "#72bcd4",
          }}
          onClick={sendData}
        >
          Envoyer l'évaluation
        </Button>
      </div>
    </div>
  );
};
const index = () => {
  return (
    <div>
      <Screen />
    </div>
  );
};

export default index;
