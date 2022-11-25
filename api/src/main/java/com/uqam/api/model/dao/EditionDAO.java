package com.uqam.api.model.dao;

import com.uqam.api.model.entity.Edition;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EditionDAO extends CrudRepository<Edition, Integer> {
}
