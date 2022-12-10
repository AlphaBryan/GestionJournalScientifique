package com.uqam.api.model.entity;

import com.uqam.api.security.CustomUserDetails;
import com.uqam.api.security.Role;
import com.uqam.api.security.UserDetailsWithRole;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Evaluator extends Person {

    @ManyToOne(targetEntity = ScientificCommittee.class)
    private ScientificCommittee scientificCommittee;

    protected Evaluator() {
        super();
    }

    public Evaluator(String firstName, String lastName, String email, String password) {
        super(firstName, lastName, email, password);
    }

    public UserDetailsWithRole toUserDetails() {
        return new CustomUserDetails(Role.EVALUATOR, email, password, this);
    }

    public ScientificCommittee getScientificCommittee() {
        return scientificCommittee;
    }

    public void setScientificCommittee(ScientificCommittee scientificCommittee) {
        this.scientificCommittee = scientificCommittee;
    }
}
