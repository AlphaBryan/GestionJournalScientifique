import React from "react";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Input } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Grid } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Button } from "@mui/material";
type Props = {};

const ArticleNouveau = (props: Props) => {
  const [article, setArticle] = React.useState({
    titre: "",
    categories: [],
    auteurs: [],
    ficher: "",
  });

  const [categories, setCategories] = React.useState([
    { id: 1, name: "Informatique", active: false },
    { id: 2, name: "Biologie", active: false },
    { id: 3, name: "Physique", active: false },
    { id: 4, name: "Sociologie", active: false },
  ]);
  return (
    <div>
      <div>
        <h1 style={{ marginTop: "5%" }}> Nouveau article </h1>
      </div>
      <div style={{ marginTop: "5%" }}>
        <TextField
          id="standard-basic"
          label="Nom de l'article"
          variant="standard"
          sx={{ width: "90%", marginLeft: "5%", marginBottom: "3%" }}
        />
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
        <h2> Catégories </h2>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {categories.map((categorie) => (
            <Grid key={categorie.id} item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={categorie.active}
                    onChange={(e) => {
                      const newCategories = categories.map((cat) => {
                        if (cat.id === categorie.id) {
                          return { ...cat, active: e.target.checked };
                        }
                        return cat;
                      });
                      setCategories(newCategories);
                    }}
                    name="checkedB"
                    color="primary"
                  />
                }
                label={categorie.name}
              />
            </Grid>
          ))}
        </Grid>
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
        <div>
          <h2> Fichers </h2>
          <TextField
            id="filled-multiline-flexible"
            label="Multiline"
            multiline
            maxRows={4}
            value={article.ficher}
            onChange={(e) => setArticle({ ...article, ficher: e.target.value })}
            variant="filled"
            sx={{ width: "90%", marginLeft: "5%", marginBottom: "3%" }}
          />
        </div>
      </div>
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
          Enregistrer l'article
        </Button>
      </div>
    </div>
  );
};

// articleNouveau in index cont variable
const index = () => {
  return (
    <div>
      <ArticleNouveau />
    </div>
  );
};

export default index;
