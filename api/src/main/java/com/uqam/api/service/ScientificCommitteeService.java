package com.uqam.api.service;

import com.uqam.api.model.dao.EvaluatorDAO;
import com.uqam.api.model.dao.ScientificCommitteeDAO;
import com.uqam.api.model.entity.Evaluator;
import com.uqam.api.model.entity.ScientificCommittee;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class ScientificCommitteeService {

    private final ScientificCommitteeDAO scientificCommitteeDAO;
    private final EvaluatorDAO evaluatorDAO;

    public ScientificCommitteeService(ScientificCommitteeDAO scientificCommitteeDAO, EvaluatorDAO evaluatorDAO) {
        this.scientificCommitteeDAO = scientificCommitteeDAO;
        this.evaluatorDAO = evaluatorDAO;
    }

    public Optional<ScientificCommittee> getById(Integer committeeId) {
        return scientificCommitteeDAO.findById(committeeId);
    }

    public Iterable<ScientificCommittee> getAll() {
        return scientificCommitteeDAO.findAll();
    }

    public ScientificCommittee create(List<Integer> evaluatorsId) {
        List<Evaluator> evaluators = new ArrayList<>();
        for (Integer evaluatorId : evaluatorsId) {
            Optional<Evaluator> evaluator = evaluatorDAO.findById(evaluatorId);
            if (evaluator.isEmpty()) return null;
            if (evaluator.get().getScientificCommittee() != null) return null;
            evaluators.add(evaluator.get());
        }

        return scientificCommitteeDAO.save(new ScientificCommittee(evaluators));
    }

    public ScientificCommittee update(Integer committeeId, List<Integer> evaluatorsId) {
        Optional<ScientificCommittee> scientificCommitteeRes = scientificCommitteeDAO.findById(committeeId);
        if (scientificCommitteeRes.isEmpty()) return null;

        List<Evaluator> evaluators = new ArrayList<>();
        for (Integer evaluatorId : evaluatorsId) {
            Optional<Evaluator> evaluator = evaluatorDAO.findById(evaluatorId);
            if (evaluator.isEmpty()) return null;
            evaluators.add(evaluator.get());
        }

        ScientificCommittee scientificCommittee = scientificCommitteeRes.get();
        scientificCommittee.setEvaluators(evaluators);
        return scientificCommitteeDAO.save(scientificCommittee);
    }

}
