package com.journal.journalApp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

import java.util.Set;

@Data
@NoArgsConstructor
@Entity
public class Category{
	@Id
    @GeneratedValue
    private String id;
	
	private String name;
	
	@ManyToMany
    private Set<Entry> entries;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}