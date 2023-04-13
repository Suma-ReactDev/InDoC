package com.project.reactspringtemplate1.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.reactspringtemplate1.models.DocModel;


public interface DocService {
	
	public DocModel saveDoc(DocModel docModel);
	
	public List<DocModel> getAllDocDetail();

}
