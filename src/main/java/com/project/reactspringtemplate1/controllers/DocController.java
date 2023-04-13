package com.project.reactspringtemplate1.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.reactspringtemplate1.models.DocModel;
import com.project.reactspringtemplate1.service.DocService;

@RestController
@RequestMapping("api/doc")
@CrossOrigin(origins = "*", maxAge = 3600	)
public class DocController {
	
	@Autowired
	private DocService docService;
	
//	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR')")
	@PostMapping("/ad")
	public ResponseEntity<DocModel> addDoc(@Valid @RequestBody DocModel docModel) {
		
		// return ResponseEntity.ok(docService.saveDoc(docModel));
		return new ResponseEntity<DocModel>(docService.saveDoc(docModel), HttpStatus.CREATED);
	}
	
	@GetMapping("/dcdt")
	public ResponseEntity<List<DocModel>> getDocDetail(){
//		List<DocModel> doc = docService.getAllDocDetail();
//		System.out.println(doc);
		// return docService.getAllDocDetail();
		return new ResponseEntity <List<DocModel>>(docService.getAllDocDetail(),HttpStatus.OK);
	}

}
