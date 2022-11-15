import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ArticleNouveau from "../pages/Auteur/ArticleNouveau";
import ArticleEnCours from "../pages/Auteur/ArticleEnCours";
import ArticleAcceptes from "../pages/Auteur/ArticleAcceptes";
import ArticleRejetes from "../pages/Auteur/ArticleRejetes";

const appRoutes: RouteType[] = [
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

export default appRoutes;
