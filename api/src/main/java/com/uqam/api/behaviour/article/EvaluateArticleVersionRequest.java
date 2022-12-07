package com.uqam.api.behaviour.article;

import javax.validation.constraints.NotNull;

public class EvaluateArticleVersionRequest {

    @NotNull
    private Integer rate;

    private String comment;

    private boolean isCommentMajor;

    public Integer getRate() {
        return rate;
    }

    public String getComment() {
        return comment;
    }

    public boolean isCommentMajor() {
        return isCommentMajor;
    }
}
