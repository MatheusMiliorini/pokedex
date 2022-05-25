import type PokeApiResponse from "@/interfaces/PokeApiResponse";
import type { PokemonData } from "@/interfaces/PokemonData";
import axios, { AxiosError } from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";
const SEARCH_LIMIT = 24;

export default {
  async list(offset?: number): Promise<boolean | PokemonData[]> {
    try {
      const res = await axios.get<PokeApiResponse>(BASE_URL + "pokemon", {
        params: {
          limit: SEARCH_LIMIT,
          offset: offset || 0,
        },
      });
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

  async get(nameOrId: string | number): Promise<PokemonData> {
    const res = await axios.get<PokemonData>(`${BASE_URL}pokemon/${nameOrId}`);
    return res.data;
  },
};
