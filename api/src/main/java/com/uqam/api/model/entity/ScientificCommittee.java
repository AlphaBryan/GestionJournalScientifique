package com.uqam.api.model.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class ScientificCommittee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @OneToMany(targetEntity = Evaluator.class, cascade = CascadeType.ALL)
    private List<Evaluator> evaluators;

    @OneToMany(targetEntity = Article.class)
    private List<Article> articles;

    protected ScientificCommittee() {
    }

    public ScientificCommittee(List<Evaluator> evaluators) {
        this.evaluators = evaluators;
    }

    public Integer getId() {
        return id;
    }

    public List<Evaluator> getEvaluators() {
        return evaluators;
    }

    public void setEvaluators(List<Evaluator> evaluators) {
        this.evaluators = evaluators;
    }

    public List<Article> getArticles() {
        return articles;
    }
}
