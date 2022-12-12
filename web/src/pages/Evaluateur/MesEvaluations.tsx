import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import {
  getCommitteeArticles,
  getCurrentAuthorArticles,
} from "../../redux/features/article/article-slice";

type Props = {};

const Screen = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCommitteeArticles(35));
  }, [dispatch]);

  const rows = [
    {
      id: 1,
      title: "À quel âge les enfants commencent-ils à apprécier l'humour?",
      author: ["Jean-Pierre Dupont", "Jeanne Guillot"],
      creation_date: "Juin 2019",
      categories: ["Humour"],
      phase: "Accepté",
      description:
        "Étonnamment tôt, selon une enquête menée auprès de 700 parents dans différents pays.",
    },
    {
      id: 2,
      title: "Peut-on se moquer de tout? et autres questions sur la satire",
      author: ["Jean-Pierre Dupont", "Jeanne Guillot"],
      creation_date: "Juin 2021",
      categories: ["Humour"],
      phase: "En cours",
      description:
        "En effet, il faut tout d’abord considérer que le processus de conception n’est que l’une des composantes du processus général de production qui peut aller de la recherche à la mise en service ou à l’utilisation d’un produit.",
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "title",
      headerName: "Title",
      width: 550,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "author",
      headerName: "Author",
      width: 300,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "creation_date",
      headerName: "Date de création",
      type: "number",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phase",
      headerName: "Phase",
      type: "number",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Action",
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Box sx={{ width: "100%" }}>
              <Button
                onClick={() => {
                  navigate("/Article", { state: { data: params.row } });
                }}
              >
                <Typography sx={{ fontSize: "150%" }} textAlign="center">
                  &#10530;
                </Typography>
              </Button>
            </Box>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <div>
        <h1 style={{ marginTop: "5%" }}> &#9746; Vos évaluations </h1>
      </div>
      <div style={{ height: "700px", margin: 20 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: false }}
        />
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
