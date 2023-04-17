package com.project.reactspringtemplate1.service;

import java.util.List;
import java.util.Optional;

import com.project.reactspringtemplate1.models.DocModel;


public interface DocService {
	
	public DocModel saveDoc(DocModel docModel);
	
	public List<DocModel> getAllDocDetail();

	public DocModel updateDoc(DocModel docModel);

	public void deleteDoc(Long id);

	public Optional<DocModel> getDoc(Long id);

	// public Optional<DocModel> getDoc(String subj);
}
