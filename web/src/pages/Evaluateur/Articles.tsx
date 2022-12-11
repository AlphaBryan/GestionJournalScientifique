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

type Props = {};

const Screen = (props: Props) => {
  const location = useLocation();
  const article = location.state.data;
  console.log(article);

  const [status, setStatus] = React.useState("accepte");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus((event.target as HTMLInputElement).value);
  };

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
              defaultValue={article.categories.join(", ")}
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
              defaultValue={article.creation_date}
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
        {article.author.map((auteur: any, index: any) => (
          <Grid key={index} container spacing={2}>
            <Grid item xs={6} md={8}>
              <TextField
                id="outlined-read-only-input"
                label={`Auteur ${index + 1}`}
                defaultValue={auteur}
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
          <h4 style={{ marginTop: "5%", marginBottom: "4%" }}>
            {" "}
            &#9733; Appréciation{" "}
          </h4>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={status}
              onChange={handleChange}
            >
              <FormControlLabel
                value="accepte"
                control={<Radio />}
                label="Accepté"
              />
              <FormControlLabel
                value="refuse"
                control={<Radio />}
                label="Refusé"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box sx={{ marginTop: "5%" }}>
          <TextField
            id="outlined-multiline-static"
            label="Commentaire"
            multiline
            rows={4}
            placeholder="Ecrire un commentaire"
            sx={{ width: "90%" }}
          />
        </Box>
      </Box>
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
