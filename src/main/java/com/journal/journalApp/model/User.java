package com.journal.journalApp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
public class User{
	@Id
    @GeneratedValue
    private Long id;
	
	private String firstName;
	private String lastName;
	private String email;
	
	@ManyToMany
    private Set<Entry> entries;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}