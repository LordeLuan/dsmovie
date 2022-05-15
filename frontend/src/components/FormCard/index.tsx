import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Movie } from 'types/movie';
import { BASE_URL } from 'utils/requests';
import { validateEmail } from 'utils/validate';
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Styles.css'

type Props = {
  movieId : string;
}

function FormCard( {movieId} : Props) {

    const navigate = useNavigate();

    const [movie, setMovie] = useState<Movie>();

    useEffect(() => {
        axios.get(`${BASE_URL}/movies/${movieId}`)
            .then(response => {
                setMovie(response.data)
            });
    }, [ movieId ]);

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
      // Cancela o envio padrão do form por submit
      event.preventDefault();

      // Pegando valor do campo id email
      const email = (event.target as any).email.value;
      const score = (event.target as any).score.value;

      if(!validateEmail(email)){
        return;
      }

      // Objeto de configuração da requisição Axios
      const config: AxiosRequestConfig = {
        baseURL: BASE_URL,
        method: 'PUT',
        url: '/scores',
        // Os nomes dos dados tem que ser exatamente igual aos atributos da entidade no back
        data: {
          email: email,
          movieID: movieId,
          score: score
        }
      }

      // Requisição de put
      axios(config).then(response => {
        // Mensagem confirmando ao usuario o envio da avaliação
        toast("✔ Avaliação enviada!",{
          position: "top-right",
          draggable: true,
          transition: Bounce,
          autoClose: 3500,
          closeOnClick: false,
          pauseOnHover: false,
          progress: undefined
          });
          // função que espera um determinado tempo para executar a função dentro dela
        setTimeout(() => {  
          
          navigate("/");

         }, 4200);
      }).catch(err => {  //Caso der erro na requisição irá aparecer uma mensagem na tela informando
        if(err){
          toast("Erro ao enviar a avialiação",{
            className: "error-toast",
            draggable: true,
            position: toast.POSITION.TOP_RIGHT
          })
        }
      })
    }
 

  return (
    <div className="dsmovie-form-container">
      <img className="dsmovie-movie-card-image" src={movie?.image} alt={movie?.title} />
      <div className="dsmovie-card-bottom-container">
        <h3>{movie?.title}</h3>
        <form className="dsmovie-form" onSubmit={handleSubmit}>
          <div className="form-group dsmovie-form-group">
            <label htmlFor="email">Informe seu email</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="form-group dsmovie-form-group">
            <label htmlFor="score">Informe sua avaliação</label>
            <select className="form-control" id="score">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="dsmovie-form-btn-container">
            <button type="submit" className="btn btn-primary dsmovie-btn">
              Salvar
            </button>
            <ToastContainer />
          </div>
        </form>
        <Link to="/">
          <button className="btn btn-primary dsmovie-btn mt-3">Cancelar</button>
        </Link>
      </div>
    </div>
  );
}

export default FormCard;
