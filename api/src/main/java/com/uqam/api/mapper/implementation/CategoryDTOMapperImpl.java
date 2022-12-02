package com.uqam.api.mapper.implementation;

import com.uqam.api.dto.CategoryDTO;
import com.uqam.api.mapper.CategoryDTOMapper;
import com.uqam.api.model.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryDTOMapperImpl implements CategoryDTOMapper {
    @Override
    public CategoryDTO toCategoryDTO(Category category) {
        return new CategoryDTO(category.getId(), category.getLabel());
    }
}
