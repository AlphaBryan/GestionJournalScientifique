package com.uqam.api.model.dao;

import com.uqam.api.model.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;

public class UserDetailsDAO implements UserDetailsService {

    @Autowired
    private UserDAO userDAO;

    public UserDetailsDAO() {
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userDAO.findUserByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("");
        }
        return new User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }
}
