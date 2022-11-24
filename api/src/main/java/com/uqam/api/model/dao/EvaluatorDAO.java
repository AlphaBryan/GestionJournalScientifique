package com.uqam.api.model.dao;

import com.uqam.api.model.entity.Evaluator;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EvaluatorDAO extends CrudRepository<Evaluator, Integer> {

    Optional<Evaluator> findByEmail(String email);

}
