import React from "react";
import ArticleCard from "../../components/card/ArticleCard";

type Props = {};

const ArticleEnCours = (props: Props) => {
  const articles = [
    {
      title:
        "Pourquoi nous sentons-nous toujours honteux en repensant aux souvenirs embarrassants?",
      auteur: "Bryan Mevo",
      date: "Juin 2021",
      categories: ["Sciences"],
      description: "Quand cette fichue gaffe nous colle à la peau.",
    },
  ];

  return (
    <div>
      <div>
        <h1 style={{ marginTop: "5%" }}> &#9744; Article en cours </h1>
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
      <ArticleEnCours />
    </div>
  );
};

export default index;
