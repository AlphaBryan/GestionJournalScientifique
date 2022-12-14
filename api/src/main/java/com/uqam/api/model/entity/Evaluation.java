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

    @ManyToOne(targetEntity = Version.class)
    private Version version;

    @ManyToOne(targetEntity = Evaluator.class)
    private Evaluator evaluator;

    protected Evaluation() {
    }

    public Evaluation(Integer rate, String comment, boolean isCommentMajor, Evaluator evaluator) {
        this.rate = rate;
        this.comment = comment;
        this.isCommentMajor = isCommentMajor;
        this.evaluator = evaluator;
    }

    public Version getVersion() {
        return version;
    }

    public void setVersion(Version version) {
        this.version = version;
    }

    public Integer getRate() {
        return rate;
    }

    public boolean isCommentMajor() {
        return isCommentMajor;
    }

    public Evaluator getEvaluator() {
        return evaluator;
    }

    public Integer getId() {
        return id;
    }

    public String getComment() {
        return comment;
    }
}
