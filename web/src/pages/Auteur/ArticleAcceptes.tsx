import React from "react";
import ArticleCard from "../../components/card/ArticleCard";

type Props = {};

const ArticleAcceptes = (props: Props) => {
  const articles = [
    {
      title: "Maîtriser la conception",
      auteur: "Bryan Mevo",
      date: "Juin 2021",
      categories: ["Informatique", "Programmation"],
      description:
        "En effet, il faut tout d’abord considérer que le processus de conception n’est que l’une des composantes du processus général de production qui peut aller de la recherche à la mise en service ou à l’utilisation d’un produit.",
    },
    {
      title: "Devenir un pro de React en 30 Jours",
      auteur: "Bryan Mevo",
      date: "Novembre 2022",
      categories: ["Informatique", "Programmation"],
      description:
        "Pour devenir développeur React, il est possible de se former dans une école d'ingénieur bac +5 mais de nombreux profils ont améliorer leur niveau par une veille continue sur la technologie Javascript notamment React Native ou encore Node JS.",
    },
    {
      title: "Java vs Python: quel langage choisir ?",
      auteur: "Bryan Mevo",
      date: "Octobre 2019",
      categories: ["Informatique", "Programmation"],
      description:
        "Dans certaines parties du monde, Java est plus populaire, dans d'autre c'est Python. Sur le TIOBE Index, Java est devant Python. Mais si on prend le dernier Developers Survey de StackOverflow datant de 2020, c'est Python qui est devant Java.",
    },
  ];

  return (
    <div>
      <div>
        <h1 style={{ marginTop: "5%" }}> &#9745; Article acceptés </h1>
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
      <ArticleAcceptes />
    </div>
  );
};

export default index;
