import type PokeApiResponse from "@/interfaces/PokeApiResponse";
import type { PokemonData } from "@/interfaces/PokemonData";
import axios, { AxiosError } from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";
const SEARCH_LIMIT = 24;

export default {
  async get(search?: string, page?: number): Promise<boolean | PokemonData[]> {
    try {
      const res = await axios.get<PokeApiResponse>(
        BASE_URL +
          "pokemon" +
          (search !== null ? `/${search?.toLowerCase()}` : ""),
        {
          params: {
            limit: SEARCH_LIMIT,
            offset: (page || 0) * SEARCH_LIMIT,
          },
        }
      );
      const pokemons: PokemonData[] = [];
      await Promise.all(
        res.data.results.map(async (poke) => {
          const allPokemonData = await axios.get<PokemonData>(poke.url);
          pokemons.push(allPokemonData.data);
        })
      );
      return pokemons;
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 404) {
          return [];
        }
      }
      return false;
    }
  },
};
