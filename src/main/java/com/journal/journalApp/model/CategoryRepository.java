package com.journal.journalApp.model;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	Category findById(String id);
	
	List<Category> findAll();
}