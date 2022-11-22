import React from "react";
import ArticleCard from "../../components/card/ArticleCard";

type Props = {};

const Screen = (props: Props) => {
  const articles = [
    {
      title: "À quel âge les enfants commencent-ils à apprécier l'humour?",
      auteur: "Bryan Mevo",
      date: "Juin 2019",
      categories: ["Humour"],
      description:
        "Étonnamment tôt, selon une enquête menée auprès de 700 parents dans différents pays.",
      evaluation: "Accepté",
    },
    {
      title: "Peut-on se moquer de tout? et autres questions sur la satire",
      auteur: "Bryan Mevo",
      date: "Juin 2021",
      categories: ["Humour"],
      description:
        "En effet, il faut tout d’abord considérer que le processus de conception n’est que l’une des composantes du processus général de production qui peut aller de la recherche à la mise en service ou à l’utilisation d’un produit.",
    },
  ];

  return (
    <div>
      <div>
        <h1 style={{ marginTop: "5%" }}> &#9746; Articles Évaluées </h1>
      </div>
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} />
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
