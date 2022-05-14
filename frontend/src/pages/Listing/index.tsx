import axios from "axios";
import MovieCard from "components/MoveCard";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { MoviePage } from "types/movie";
import { BASE_URL } from "utils/requests";

function Listing() {

  // cria uma variavel e uma função para alterar o valor dela com o useState
  const [pageNumber, setPageNumber] = useState(0);

  // Recebe 2 args, uma funç~çao para exec e uma lista de objetos para observar de forma assincrona.
  useEffect(() => {
    axios.get(`${BASE_URL}/movies?size=12&page=1`)
         .then(response => {
            const data = response.data as MoviePage;
            console.log(response.data);
            //  Alterando valor com useState
            setPageNumber(data.number);
         });
  }, []);

  return (
    <>
      <p>{pageNumber}</p>
      <Pagination />
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
            <MovieCard />
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
            <MovieCard />
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
            <MovieCard />
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
            <MovieCard />
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
            <MovieCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default Listing;
