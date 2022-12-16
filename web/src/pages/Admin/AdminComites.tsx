import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useCallback, useEffect } from "react";
import { getCommittees } from "../../redux/features/committee/committee-slice";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const AdminComites = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const committees = useAppSelector((state) => state.committee.committees);

  useEffect(() => {
    dispatch(getCommittees());
  }, [dispatch]);

  const computeEvaluatorLabel = useCallback((evaluator: any) => {
    if (!evaluator) {
      return "";
    }
    return `${evaluator?.firstName} ${evaluator?.lastName} - ${evaluator?.id}`;
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Liste des comités scientifiques</h2>
        <Button variant="outlined" onClick={() => navigate("/comites/ajouter")}>
          Ajouter un comité
        </Button>
      </div>
      <div style={{ height: "700px", margin: 20 }}>
        <DataGrid
          columns={[
            {
              field: "id",
              headerName: "Id",
            },
            {
              field: "evaluator1",
              headerName: "Evaluator - 1",
              width: 200,
            },
            {
              field: "evaluator2",
              headerName: "Evaluator - 2",
              width: 200,
            },
            {
              field: "evaluator3",
              headerName: "Evaluator - 3",
              width: 200,
            },
          ]}
          rows={committees.map((committee) => ({
            id: committee.id,
            evaluator1: computeEvaluatorLabel(committee.evaluators[0]),
            evaluator2: computeEvaluatorLabel(committee.evaluators[1]),
            evaluator3: computeEvaluatorLabel(committee.evaluators[2]),
          }))}
        />
      </div>
    </div>
  );
};
