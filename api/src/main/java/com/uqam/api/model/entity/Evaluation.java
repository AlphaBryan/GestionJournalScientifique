package com.uqam.api.model.entity;

import com.uqam.api.service.EvaluationListener;

import javax.persistence.*;

@Entity
@EntityListeners(EvaluationListener.class)
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Integer rate;

    private String comment;

    private boolean isCommentMajor;

    @OneToOne(targetEntity = Version.class)
    private Version version;

    @OneToOne(targetEntity = Evaluator.class)
    private Evaluator evaluator;

    protected Evaluation() {
    }

    public Evaluation(Integer rate, String comment, boolean isCommentMajor, Version version, Evaluator evaluator) {
        this.rate = rate;
        this.comment = comment;
        this.isCommentMajor = isCommentMajor;
        this.version = version;
        this.evaluator = evaluator;
    }

    public Version getVersion() {
        return version;
    }

    public Integer getRate() {
        return rate;
    }

    public Evaluator getEvaluator() {
        return evaluator;
    }
}
