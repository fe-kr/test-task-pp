import { BASE_URL } from "@env";
import axios from "axios";

export const httpClient = axios.create({
  baseURL: BASE_URL,
});
