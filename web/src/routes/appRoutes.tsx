import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ArticleNouveau from "../pages/Auteur/ArticleNouveau";
import ArticleEnCours from "../pages/Auteur/ArticleEnCours";
import ArticleAcceptes from "../pages/Auteur/ArticleAcceptes";
import ArticleRejetes from "../pages/Auteur/ArticleRejetes";
import Articles from "../pages/Evaluateur/Articles";
import Comite from "../pages/Evaluateur/Comite";
import MesEvaluations from "../pages/Evaluateur/MesEvaluations";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
const user1 = { role: "Auteur" };
const user2 = { role: "Evaluateur" };
const user = user2;
const AuteurRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/articleNouveau",
    element: <ArticleNouveau />,
    state: "articleNouveau",
    sidebarProps: {
      displayText: "Nouveau Article",
      icon: <FileDownloadOutlinedIcon />,
    },
  },
  {
    path: "/articleEnCours",
    element: <ArticleEnCours />,
    state: "articleEnCours",
    sidebarProps: {
      displayText: "Article En Cours",
      icon: <ArticleOutlinedIcon />,
    },
  },
  {
    path: "/articleAcceptes",
    element: <ArticleAcceptes />,
    state: "articleAcceptes",
    sidebarProps: {
      displayText: "Article Acceptes",
      icon: <ArticleOutlinedIcon />,
    },
  },
  {
    path: "/articleRejetes",
    element: <ArticleRejetes />,
    state: "articleRejetes",
    sidebarProps: {
      displayText: "Article Rejetes",
      icon: <ArticleOutlinedIcon />,
    },
  },
];

const EvaluateurRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/Article",
    element: <Articles />,
    state: "article",
    sidebarProps: {
      displayText: "Article",
      icon: <FileDownloadOutlinedIcon />,
    },
  },
  {
    path: "/Comite",
    element: <Comite />,
    state: "comite",
    sidebarProps: {
      displayText: "Comite",
      icon: <GroupsIcon />,
    },
  },
  {
    path: "/MesEvaluations",
    element: <MesEvaluations />,
    state: "mesEvaluations",
    sidebarProps: {
      displayText: "Mes Evaluations",
      icon: <EmojiObjectsIcon />,
    },
  },
];

const appRoutes: RouteType[] = [];
if (user.role === "Auteur") {
  appRoutes.push(...AuteurRoutes);
} else if (user.role === "Evaluateur") {
  appRoutes.push(...EvaluateurRoutes);
}

export default appRoutes;
