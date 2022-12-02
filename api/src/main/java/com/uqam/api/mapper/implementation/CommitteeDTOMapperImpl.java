package com.uqam.api.mapper.implementation;

import com.uqam.api.dto.CommitteeDTO;
import com.uqam.api.dto.EvaluatorDTO;
import com.uqam.api.mapper.CommitteeDTOMapper;
import com.uqam.api.mapper.EvaluatorDTOMapper;
import com.uqam.api.model.entity.Evaluator;
import com.uqam.api.model.entity.ScientificCommittee;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CommitteeDTOMapperImpl implements CommitteeDTOMapper {

    private final EvaluatorDTOMapper evaluatorDTOMapper;

    public CommitteeDTOMapperImpl(EvaluatorDTOMapper evaluatorDTOMapper) {
        this.evaluatorDTOMapper = evaluatorDTOMapper;
    }

    @Override
    public CommitteeDTO toCommitteeDTO(ScientificCommittee scientificCommittee) {
        List<EvaluatorDTO> evaluators = new ArrayList<>();

        for (Evaluator evaluator : scientificCommittee.getEvaluators()) {
            evaluators.add(evaluatorDTOMapper.toEvaluatorDTO(evaluator));
        }

        return new CommitteeDTO(scientificCommittee.getId(), evaluators);
    }
}
