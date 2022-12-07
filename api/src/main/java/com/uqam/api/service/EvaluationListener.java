package com.uqam.api.service;

import com.uqam.api.model.dao.ArticleDAO;
import com.uqam.api.model.entity.Article;
import com.uqam.api.model.entity.Evaluation;
import com.uqam.api.model.entity.Phase;
import com.uqam.api.model.entity.Version;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.PostPersist;
import java.util.List;

@Component
public class EvaluationListener {

    @Autowired
    private ArticleDAO articleDAO;

    @PostPersist
    public void postPersist(Evaluation evaluation) {
        Version version = evaluation.getVersion();

        List<Evaluation> evaluations = version.getEvaluations();
        if (evaluations.size() == 3) {
            Article article = version.getArticle();
            Integer points = 0;
            for (Evaluation eval : evaluations) {
                points += eval.getRate();
            }

            if (points >= 4) {
                article.setPhase(Phase.ACCEPTED);
            } else {
                article.setPhase(Phase.REFUSED);
            }

            articleDAO.save(article);
        }
    }
}
