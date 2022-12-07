package com.uqam.api.service;

import com.uqam.api.model.dao.CategoryDAO;
import com.uqam.api.model.entity.Category;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CategoryService {

    private final CategoryDAO categoryDAO;

    public CategoryService(CategoryDAO categoryDAO) {
        this.categoryDAO = categoryDAO;
    }

    public Iterable<Category> getAll() {
        return categoryDAO.findAll();
    }

    public Optional<Category> getById(Integer categoryId) {
        return categoryDAO.findById(categoryId);
    }

    public Category create(String label) {
        return categoryDAO.save(new Category(label));
    }

    public Category update(Integer categoryId, String label) {
        Optional<Category> categoryRes = categoryDAO.findById(categoryId);
        if (categoryRes.isEmpty()) return null;

        Category category = categoryRes.get();
        category.setLabel(label);
        return categoryDAO.save(category);
    }

    public Category delete(Integer categoryId) {
        Optional<Category> categoryRes = categoryDAO.findById(categoryId);
        if (categoryRes.isEmpty()) return null;

        categoryDAO.delete(categoryRes.get());
        return categoryRes.get();
    }
}
