package com.uqam.api.behaviour.category;

import com.uqam.api.dto.CategoryDTO;
import com.uqam.api.mapper.CategoryDTOMapper;
import com.uqam.api.model.entity.Category;
import com.uqam.api.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("categories")
public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryDTOMapper categoryDTOMapper;

    public CategoryController(CategoryService categoryService, CategoryDTOMapper categoryDTOMapper) {
        this.categoryService = categoryService;
        this.categoryDTOMapper = categoryDTOMapper;
    }

    @GetMapping("/")
    public ResponseEntity<List<CategoryDTO>> getCategories() {
        Iterable<Category> categories = categoryService.getAll();
        List<CategoryDTO> categoryDTOS = new ArrayList<>();
        for (Category category : categories) {
            categoryDTOS.add(categoryDTOMapper.toCategoryDTO(category));
        }

        return ResponseEntity.ok().body(categoryDTOS);
    }

    @PostMapping("/")
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody @Valid CreateCategoryRequest request) {
        Category category = categoryService.create(request.getLabel());
        return new ResponseEntity<>(categoryDTOMapper.toCategoryDTO(category), HttpStatus.CREATED);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable("categoryId") Integer categoryId, @RequestBody @Valid UpdateCategoryRequest request) {
        Category category = categoryService.update(categoryId, request.getLabel());
        if (category == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok().body(categoryDTOMapper.toCategoryDTO(category));
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Object> deleteCategory(@PathVariable("categoryId") Integer categoryId) {
        Category category = categoryService.delete(categoryId);
        if (category == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok().build();
    }

}
