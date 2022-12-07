package com.uqam.api.security;

import com.uqam.api.model.dao.ArticleDAO;
import com.uqam.api.model.entity.Article;
import com.uqam.api.model.entity.Evaluator;
import org.springframework.security.access.expression.SecurityExpressionRoot;
import org.springframework.security.access.expression.method.MethodSecurityExpressionOperations;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Objects;
import java.util.Optional;


public class CustomMethodSecurityExpressionRoot extends SecurityExpressionRoot implements MethodSecurityExpressionOperations {

    private final ArticleDAO articleDAO;

    private Object filterObject;
    private Object returnObject;

    public CustomMethodSecurityExpressionRoot(Authentication authentication, ArticleDAO articleDAO) {
        super(authentication);
        this.articleDAO = articleDAO;
    }

    public boolean canEvaluate(Integer articleId) {
        Evaluator evaluator = ((UserDetailsWithRole) this.getPrincipal()).getEvaluator();

        Optional<Article> article = articleDAO.findById(articleId);
        if (article.isPresent()) {
            List<Evaluator> evaluators = article.get().getScientificCommittee().getEvaluators();
            for (Evaluator eval : evaluators) {
                if (Objects.equals(eval.getId(), evaluator.getId())) {
                    return true;
                }
            }
        }

        return false;
    }

    @Override
    public Object getFilterObject() {
        return this.filterObject;
    }

    @Override
    public void setFilterObject(Object obj) {
        this.filterObject = obj;
    }

    @Override
    public Object getReturnObject() {
        return this.returnObject;
    }

    @Override
    public void setReturnObject(Object obj) {
        this.returnObject = obj;
    }

    @Override
    public Object getThis() {
        return this;
    }

}
