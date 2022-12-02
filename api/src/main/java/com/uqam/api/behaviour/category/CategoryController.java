package com.uqam.api.behaviour.category;

import com.uqam.api.dto.CategoryDTO;
import com.uqam.api.mapper.CategoryDTOMapper;
import com.uqam.api.model.dao.CategoryDAO;
import com.uqam.api.model.entity.Category;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("categories")
public class CategoryController {

    private final CategoryDAO categoryDAO;
    private final CategoryDTOMapper categoryDTOMapper;

    public CategoryController(CategoryDAO categoryDAO, CategoryDTOMapper categoryDTOMapper) {
        this.categoryDAO = categoryDAO;
        this.categoryDTOMapper = categoryDTOMapper;
    }

    @GetMapping("/")
    public ResponseEntity<List<CategoryDTO>> getCategories() {
        Iterable<Category> categories = categoryDAO.findAll();
        List<CategoryDTO> categoryDTOS = new ArrayList<>();
        for (Category category : categories) {
            categoryDTOS.add(categoryDTOMapper.toCategoryDTO(category));
        }

        return ResponseEntity.ok().body(categoryDTOS);
    }

    @PostMapping("/")
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody @Valid CreateCategoryRequest request) {
        Category category = categoryDAO.save(new Category(request.getLabel()));
        return new ResponseEntity<>(categoryDTOMapper.toCategoryDTO(category), HttpStatus.CREATED);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable("categoryId") Integer categoryId, @RequestBody @Valid UpdateCategoryRequest request) {
        Optional<Category> categoryRes = categoryDAO.findById(categoryId);
        if (categoryRes.isEmpty()) return ResponseEntity.badRequest().build();
        Category category = categoryRes.get();
        category.setLabel(request.getLabel());
        category = categoryDAO.save(category);

        return ResponseEntity.ok().body(categoryDTOMapper.toCategoryDTO(category));
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Object> deleteCategory(@PathVariable("categoryId") Integer categoryId) {
        Optional<Category> categoryRes = categoryDAO.findById(categoryId);
        if (categoryRes.isEmpty()) return ResponseEntity.badRequest().build();

        categoryDAO.delete(categoryRes.get());

        return ResponseEntity.ok().build();
    }

}
