package com.uqam.api.model.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

@Entity
public class Edition {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private Timestamp submissionLimitDate;

    @OneToMany(targetEntity = Article.class)
    private Set<Article> articles;

    protected Edition() {
        System.out.println("Create edition object");
    }

    public Edition(String name, Timestamp submissionLimitDate) {
        this.name = name;
        this.submissionLimitDate = submissionLimitDate;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Timestamp getSubmissionLimitDate() {
        return submissionLimitDate;
    }

    public void setSubmissionLimitDate(Timestamp submissionLimitDate) {
        this.submissionLimitDate = submissionLimitDate;
    }

    public Set<Article> getArticles() {
        return articles;
    }
}
