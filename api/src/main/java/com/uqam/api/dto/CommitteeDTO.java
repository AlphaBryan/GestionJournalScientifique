package com.uqam.api.dto;

import java.util.List;

public class CommitteeDTO {

    private final Integer id;
    private final List<EvaluatorDTO> evaluators;

    public CommitteeDTO(Integer id, List<EvaluatorDTO> evaluators) {
        this.id = id;
        this.evaluators = evaluators;
    }
}
