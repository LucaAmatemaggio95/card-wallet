import axios from "axios";
import { CardPost } from "../types";

const deleteCard = (id: number) => {
  return axios.delete(`http://localhost:3333/cardsData/${id}`);
};

const postNewCard = (data: CardPost) => {
  return axios.post("http://localhost:3333/cardsData", data);
};

export { deleteCard, postNewCard };
