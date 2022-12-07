package com.uqam.api.model.dao;

import com.uqam.api.model.entity.Version;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VersionDAO extends CrudRepository<Version, Integer> {
}
