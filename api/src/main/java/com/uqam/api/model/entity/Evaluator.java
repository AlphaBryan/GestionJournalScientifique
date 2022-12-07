package com.uqam.api.model.entity;

import com.uqam.api.security.CustomUserDetails;
import com.uqam.api.security.Role;
import com.uqam.api.security.UserDetailsWithRole;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToMany;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Evaluator extends Person {

    @ManyToMany(mappedBy = "evaluators")
    private List<ScientificCommittee> scientificCommittees;

    protected Evaluator() {
        super();
    }

    public Evaluator(String firstName, String lastName, String email, String password) {
        super(firstName, lastName, email, password);
    }

    public UserDetailsWithRole toUserDetails() {
        return new CustomUserDetails(Role.EVALUATOR, email, password, this);
    }

    public void addScientificCommittee(ScientificCommittee scientificCommittee) {
        scientificCommittees.add(scientificCommittee);
    }
}
