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
    }

    public Edition(String name, Timestamp submissionLimitDate) {
        this.name = name;
        this.submissionLimitDate = submissionLimitDate;
    }
}
