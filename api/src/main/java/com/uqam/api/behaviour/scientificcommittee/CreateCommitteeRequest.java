package com.uqam.api.behaviour.scientificcommittee;

import javax.validation.constraints.NotNull;
import java.util.List;

public class CreateCommitteeRequest {

    @NotNull
    private List<Integer> evaluatorsId;

    public List<Integer> getEvaluatorsId() {
        return evaluatorsId;
    }
}
