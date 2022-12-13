package com.uqam.api.model.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Version {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String text;

    private Timestamp creationDate;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Article.class)
    private Article article;

    @OneToMany(targetEntity = Evaluation.class, cascade = CascadeType.ALL)
    private List<Evaluation> evaluations;

    protected Version() {
    }

    public Version(String text) {
        this.text = text;
        this.creationDate = new Timestamp(System.currentTimeMillis());
        this.evaluations = new ArrayList<>();
    }

    public Integer getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public Timestamp getCreationDate() {
        return creationDate;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public List<Evaluation> getEvaluations() {
        return evaluations;
    }

    public void addEvaluation(Evaluation evaluation) {
        evaluations.add(evaluation);
        evaluation.setVersion(this);
    }
}
