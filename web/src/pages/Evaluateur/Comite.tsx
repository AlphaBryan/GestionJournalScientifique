import React, { useEffect, useState, useCallback } from "react";
import EvaluateurCard from "../../components/card/EvaluateurCard";
import { getCommittee } from "../../redux/features/committee/committee-slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

type Props = {};

const Screen = (props: Props) => {
  const dispatch = useAppDispatch();

  const committeeId = useAppSelector(
    (state) => state.auth.authUser?.committeeId
  );
  const committee = useAppSelector((state) => state.committee.currentCommittee);
  const evaluateurs = useAppSelector(
    (state) => state.committee.currentCommittee.evaluators
  );

  useEffect(() => {
    dispatch(getCommittee(committeeId));
  }, [dispatch]);

  return (
    <div>
      <div>
        <h1 style={{ marginTop: "5%" }}>
          &#10012; Membres du comitées N°{`${committee?.id}`}
        </h1>
      </div>
      {evaluateurs == null ? (
        <h1>Il n'y a pas d'évaluateurs</h1>
      ) : (
        evaluateurs.map((evaluateur: any, index: any) => (
          <EvaluateurCard key={index} evaluateur={evaluateur} />
        ))
      )}
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
