import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  getCommitteeArticles,
} from "../../redux/features/article/article-slice";

type Props = {};

const Screen = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const articles: any = useAppSelector(
    (state) => state.article?.committeeArticles
  );
  const idCommitee = useAppSelector(
    (state) => state.auth.authUser?.committeeId
  );

  useEffect(() => {
    dispatch(getCommitteeArticles(idCommitee));
  }, []);


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
      width: 500,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "authors",
      headerName: "Authors",
      width: 300,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <>
            {params.row.authors.map((author: any, index: any) => (
              <Typography
                key={index}
                sx={{ fontSize: "100%" }}
                textAlign="center"
              >
                {author.firstName + " " + author.lastName}, &nbsp;
              </Typography>
            ))}
          </>
        );
      },
    },
    {
      field: "creationDate",
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
          rows={articles}
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
