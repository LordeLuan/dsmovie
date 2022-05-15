import axios from "axios";
import MovieCard from "components/MoveCard";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { MoviePage } from "types/movie";
import { BASE_URL } from "utils/requests";

function Listing() {
  // cria uma variavel e uma função para alterar o valor dela com o useState - Acompanha ciclo de vida da página
  const [pageNumber, setPageNumber] = useState(0);

  // useState do tipo MoviePage
  const [page, setPage] = useState<MoviePage>({
    content: [],
    last: true,
    totalPages: 0,
    totalElements: 0,
    size: 12,
    number: 0,
    first: true,
    numberOfElements: 0,
    empty: true,
  });

  // Recebe 2 args, uma funçao para exec e uma lista de objetos para observar de forma assincrona.
  useEffect(() => {
    axios
      .get(`${BASE_URL}/movies?size=${page.size}&page=${pageNumber}&sort=title`)
      .then((response) => {
        const data = response.data as MoviePage;
        setPage(data);
      });
  }, [pageNumber]);

  // Função que está sendo passado para o pagination usar para mudar de pagina
  const handlePageChange = (newPageNumber : number) => {
    setPageNumber(newPageNumber)
  }

  return (
    <>
    {/* Passa o obj page e a função de alterar página */}
      <Pagination page={page}  onChange={handlePageChange} />

      <div className="container">
        <div className="row">
          {page.content.map((movie) => (
            <div key={movie.id} className="col-sm-6 col-lg-4 col-xl-3 mb-3">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Listing;
