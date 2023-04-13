package com.project.reactspringtemplate1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.reactspringtemplate1.models.DocModel;

@Repository
public interface DocRepository extends JpaRepository<DocModel, Long>{

}
