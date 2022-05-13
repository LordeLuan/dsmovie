package com.devsuperior.dsmovie.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsmovie.dto.MovieDTO;
import com.devsuperior.dsmovie.dto.ScoreDTO;
import com.devsuperior.dsmovie.entities.Movie;
import com.devsuperior.dsmovie.entities.Score;
import com.devsuperior.dsmovie.entities.User;
import com.devsuperior.dsmovie.repository.MovieRepository;
import com.devsuperior.dsmovie.repository.ScoreRepository;
import com.devsuperior.dsmovie.repository.UserRepository;

@Service
public class ScoreService {

	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ScoreRepository scoreRepository;
	

	@Transactional
	public MovieDTO saveScore(ScoreDTO dto) {
//		Busca o usuario por email informado no front
		User user = userRepository.findByEmail(dto.getEmail());
//		Se o e-mail não estiver cadastrado pega o email passado no front e insere no banco
		if( user == null) {
			user = new User();
			user.setEmail(dto.getEmail());
			user = userRepository.saveAndFlush(user);
		}
		
//		Busca o filme no banco
		Movie movie = movieRepository.findById(dto.getMovieID()).get();
		
//		atribui ao obj score o movie e user atraves do set
		Score score = new Score();
		score.setMovie(movie);
		score.setUser(user);
//		atribui para o obj score a nota passada no front
		score.setValue(dto.getScore());
//		Salva score no banco com os devidos relacionamento para com o filme e o usuario que deu a nota
		score = scoreRepository.saveAndFlush(score);
		
//		Percorre todo o array de notas que tem no filmes e totaliza as notas
		double sum = 0.0;
		for(Score s : movie.getScores()){
			sum += s.getValue();
		}
		
//		Divide o total das notas pela quantidade de notas
		double avg = sum / movie.getScores().size();
		
//		Seta as informações atualizadas no obj filme retornado do banco
		movie.setScore(avg);
		movie.setCount(movie.getScores().size());
		
//		atualiza as informações do filme no banco
		movie = movieRepository.save(movie);
		
		return new MovieDTO(movie);
	}
	
	
	
}
