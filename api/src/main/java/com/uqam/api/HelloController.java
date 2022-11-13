package com.uqam.api;

import com.uqam.api.model.dao.UserDAO;
import com.uqam.api.model.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class HelloController {

    @Autowired
    private UserDAO userDAO;

    @GetMapping("/")
    public @ResponseBody Iterable<UserEntity> index() {
        return userDAO.findAll();
    }
}