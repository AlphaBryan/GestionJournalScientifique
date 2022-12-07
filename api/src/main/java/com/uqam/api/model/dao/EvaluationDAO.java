package com.uqam.api.model.dao;

import com.uqam.api.model.entity.Evaluation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluationDAO extends CrudRepository<Evaluation, Integer> {
}
