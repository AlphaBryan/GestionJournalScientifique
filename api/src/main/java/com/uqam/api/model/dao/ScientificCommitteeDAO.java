package com.uqam.api.model.dao;

import com.uqam.api.model.entity.ScientificCommittee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScientificCommitteeDAO extends CrudRepository<ScientificCommittee, Integer> {
}
