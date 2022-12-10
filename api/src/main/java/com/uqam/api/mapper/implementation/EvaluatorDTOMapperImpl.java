package com.uqam.api.mapper.implementation;

import com.uqam.api.dto.EvaluatorDTO;
import com.uqam.api.mapper.EvaluatorDTOMapper;
import com.uqam.api.model.entity.Evaluator;
import com.uqam.api.model.entity.ScientificCommittee;
import org.springframework.stereotype.Component;

@Component
public class EvaluatorDTOMapperImpl implements EvaluatorDTOMapper {

    @Override
    public EvaluatorDTO toEvaluatorDTO(Evaluator evaluator) {
        Integer committeeId = null;
        ScientificCommittee scientificCommittee = evaluator.getScientificCommittee();
        if (scientificCommittee != null) {
            committeeId = scientificCommittee.getId();
        }

        return new EvaluatorDTO(evaluator.getId(), evaluator.getFirstName(), evaluator.getLastName(), committeeId);
    }
}
