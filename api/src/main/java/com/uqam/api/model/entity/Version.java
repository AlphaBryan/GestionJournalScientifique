package com.uqam.api.model.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
public class Version {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String text;

    private Timestamp creationDate;

    @ManyToOne(targetEntity = Article.class)
    private Article article;

    @OneToMany(targetEntity = Evaluation.class)
    private List<Evaluation> evaluations;

    protected Version() {
    }

    public Version(String text) {
        this.text = text;
        this.creationDate = new Timestamp(System.currentTimeMillis());
    }

    public Integer getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public Article getArticle() {
        return article;
    }

    public List<Evaluation> getEvaluations() {
        return evaluations;
    }
}
