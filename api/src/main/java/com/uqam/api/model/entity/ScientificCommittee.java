package com.uqam.api.model.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class ScientificCommittee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "scientific_committees_evaluators",
            joinColumns = @JoinColumn(name = "committee_id"),
            inverseJoinColumns = @JoinColumn(name = "evaluator_id")
    )
    private List<Evaluator> evaluators;

    @OneToMany(targetEntity = Article.class)
    private List<Article> articles;

    protected ScientificCommittee() {
    }

    public ScientificCommittee(List<Evaluator> evaluators) {
        this.evaluators = evaluators;
        for (Evaluator evaluator : evaluators) {
            evaluator.addScientificCommittee(this);
        }
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
