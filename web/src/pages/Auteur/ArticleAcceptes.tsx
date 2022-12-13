import React, {useEffect} from "react";
import ArticleCard from "../../components/card/ArticleCard";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {getCurrentAuthorArticles} from "../../redux/features/article/article-slice";
import {useNavigate} from "react-router-dom";

type Props = {};

const ArticleAcceptes = (props: Props) => {

    const dispatch = useAppDispatch();

    const articles = useAppSelector(state => state.article.authUserArticles);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCurrentAuthorArticles());
    }, [dispatch]);

    return (
        <div>
            <div>
                <h1 style={{marginTop: "5%"}}> &#9745; Article acceptés </h1>
            </div>
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article}
                             onClick={() => navigate(`/article/${article.id}`)}/>
            ))}
        </div>
    );
};

const index = () => {
    return (
        <div>
            <ArticleAcceptes/>
        </div>
    );
};

export default index;
