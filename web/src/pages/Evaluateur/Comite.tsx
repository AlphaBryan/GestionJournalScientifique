import React from "react";
import EvaluateurCard from "../../components/card/EvaluateurCard";

type Props = {};

const Screen = (props: Props) => {
  const evaluateurs = [
    {
      nom: "Martin Matin",
      email: "monsieurmmmail@gmail.com",
      membresDepuis: "Juin 2019",
      nombresEvaluationDonnees: 10,
    },
    {
      nom: "Robert Petit",
      email: "rppromail@hotmail.com",
      membresDepuis: "Mars 2020",
      nombresEvaluationDonnees: 7,
    },
    {
      nom: "Richard Durand",
      email: "rdd2@yahoo.fr",
      membresDepuis: "Mars 2020",
      nombresEvaluationDonnees: 2,
    },
  ];

  return (
    <div>
      <div>
        <h1 style={{ marginTop: "5%" }}>
          {" "}
          &#10012; Membres du comitées: C01740{" "}
        </h1>
      </div>
      {evaluateurs.map((evaluateur, index) => (
        <EvaluateurCard key={index} evaluateur={evaluateur} />
      ))}
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
