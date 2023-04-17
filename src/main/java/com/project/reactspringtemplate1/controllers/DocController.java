package com.project.reactspringtemplate1.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR')")
	@PostMapping("/ad")
	public ResponseEntity<DocModel> addDoc(@Valid @RequestBody DocModel docModel) {
		
		// return ResponseEntity.ok(docService.saveDoc(docModel));
		return new ResponseEntity<DocModel>(docService.saveDoc(docModel), HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR')")
	@GetMapping("/dcdt")
	public ResponseEntity<List<DocModel>> getDocDetail(){
//		List<DocModel> doc = docService.getAllDocDetail();
//		System.out.println(doc);
		// return docService.getAllDocDetail();
		return new ResponseEntity <List<DocModel>>(docService.getAllDocDetail(),HttpStatus.OK);
	}

	@PutMapping("/dcdt/{id}")
	public ResponseEntity<DocModel> updateDoc(@PathVariable Long id, @RequestBody DocModel docModel){
		docModel.setId(id);
		return new ResponseEntity<DocModel>(docService.updateDoc(docModel), HttpStatus.OK);
	}

	@DeleteMapping("/dcdt/{id}")
	public ResponseEntity<HttpStatus> deleteDoc(@PathVariable Long id){
		docService.deleteDoc(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/dcdt/{id}")
	public ResponseEntity<DocModel> getDoc(@PathVariable Long id ){
		Optional <DocModel> doc = docService.getDoc(id);
		if(doc.isPresent()){
			// return new ResponseEntity<DocModel>(docService.getDoc(id), HttpStatus.OK);
			return new ResponseEntity<DocModel>(doc.get(),HttpStatus.OK);
		}
		return new ResponseEntity<DocModel>(HttpStatus.NOT_FOUND);
		
	}

}
