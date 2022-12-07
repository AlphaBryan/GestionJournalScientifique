package com.uqam.api.service;

import com.uqam.api.model.dao.EvaluatorDAO;
import com.uqam.api.model.entity.Evaluator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class EvaluatorService {

    private final EvaluatorDAO evaluatorDAO;
    private final PasswordEncoder passwordEncoder;

    public EvaluatorService(EvaluatorDAO evaluatorDAO, PasswordEncoder passwordEncoder) {
        this.evaluatorDAO = evaluatorDAO;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<Evaluator> getById(Integer evaluatorId) {
        return evaluatorDAO.findById(evaluatorId);
    }

    public Iterable<Evaluator> getAll() {
        return evaluatorDAO.findAll();
    }

    public Evaluator create(String firstName, String lastName, String email, String password) {
        return evaluatorDAO.save(new Evaluator(firstName, lastName, email, passwordEncoder.encode(password)));
    }

    public Evaluator delete(Integer evaluatorId) {
        Optional<Evaluator> evaluator = evaluatorDAO.findById(evaluatorId);
        if (evaluator.isEmpty()) return null;

        evaluatorDAO.delete(evaluator.get());
        return evaluator.get();
    }
}
