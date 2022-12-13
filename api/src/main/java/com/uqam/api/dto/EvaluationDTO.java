package com.uqam.api.dto;

public class EvaluationDTO {

    private final Integer id;
    private final Integer rate;
    private final String comment;
    private final boolean isCommentMajor;

    public EvaluationDTO(Integer id, Integer rate, String comment, boolean isCommentMajor) {
        this.id = id;
        this.rate = rate;
        this.comment = comment;
        this.isCommentMajor = isCommentMajor;
    }

    public Integer getId() {
        return id;
    }

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
