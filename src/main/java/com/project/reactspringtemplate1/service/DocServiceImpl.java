package com.project.reactspringtemplate1.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.reactspringtemplate1.models.DocModel;
import com.project.reactspringtemplate1.repository.DocRepository;

@Service
public class DocServiceImpl implements DocService{
	
	@Autowired
	public DocRepository docRepository;

	@Override
	public DocModel saveDoc(DocModel docModel) {
		return docRepository.save(docModel);
	}

	@Override
	public List<DocModel> getAllDocDetail() {
//		System.out.println(docRepository.findAll());
		return docRepository.findAll();
	}

	@Override
	public DocModel updateDoc(DocModel docModel) {
		return docRepository.save(docModel);

}

	@Override
	public void deleteDoc(Long id) {
			docRepository.deleteById(id);
	}

	@Override
	public Optional<DocModel> getDoc(Long id) {
		return docRepository.findById(id);
	}





	
}
