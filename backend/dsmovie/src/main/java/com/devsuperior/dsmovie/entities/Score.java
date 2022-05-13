package com.devsuperior.dsmovie.entities;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="tb_score")
public class Score {
	
//	Chave primária composta que aponta para as classes Movie e Score
	@EmbeddedId
	private ScorePK id = new ScorePK();
	
	private Double value;
	
	public Score() {}
	
//	Associa o score ao filme passado;
	public void setMovie(Movie movie) {
		id.setMovie(movie);
	}
//	Associa o usuário ao Score(nota do filme)
	public void setUser(User user) {
		id.setUser(user);
	}

	public ScorePK getId() {
		return id;
	}

	public void setId(ScorePK id) {
		this.id = id;
	}

	public Double getValue() {
		return value;
	}

	public void setValue(Double value) {
		this.value = value;
	}
	
	
}
