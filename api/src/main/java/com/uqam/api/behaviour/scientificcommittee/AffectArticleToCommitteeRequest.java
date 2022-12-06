package com.uqam.api.behaviour.scientificcommittee;

import javax.validation.constraints.NotNull;

public class AffectArticleToCommitteeRequest {

    @NotNull
    private Integer articleId;

    public Integer getArticleId() {
        return articleId;
    }
}
