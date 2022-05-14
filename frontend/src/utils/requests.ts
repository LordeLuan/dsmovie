// Setando o endpoint da api
// Caso a variavel REACT_APP_BACKEND_URL não tenha valor, será utilizado o localhost
export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? "http://localhost:8080";
