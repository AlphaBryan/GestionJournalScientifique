package com.uqam.api.mapper;

import com.uqam.api.dto.CategoryDTO;
import com.uqam.api.model.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryDTOMapper {
    CategoryDTO toCategoryDTO(Category category);
}
