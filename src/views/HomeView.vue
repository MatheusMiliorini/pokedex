<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

import PokemonRepository from "@/repositories/PokemonRepository";
import type { PokemonData } from "@/interfaces/PokemonData";
import PokemonCard from "@/components/PokemonCard.vue";

const router = useRouter();
const search = ref("");
const message = ref("");
const pokemonList = ref<PokemonData[]>([]);

const searchPokemon = async () => {
  const data = await PokemonRepository.list(pokemonList.value.length);
  if (data === false || typeof data === "boolean") {
    message.value = "Ocorreu um erro ao buscar os Pokemons";
  } else {
    pokemonList.value = data;
  }
};
searchPokemon();

const goToPokemon = () => {
  router.push(`/${search.value}`);
};
</script>

<template>
  <div class="row">
    <div class="col-12 col-md-10 offset-md-1">
      <div class="row">
        <div class="col-12">
          <input
            type="text"
            v-model="search"
            placeholder="Pesquise por nome ou código"
            class="form-control rounded-input"
            id="input-search"
            @change="goToPokemon"
          />
        </div>
      </div>
      <div class="row">
        <div
          class="col-6 col-md-3"
          v-for="pokemon in pokemonList"
          :key="pokemon.id"
        >
          <pokemon-card :pokemon="pokemon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rounded-input {
  border-radius: 50px;
}

#input-search::placeholder {
  color: lightgrey;
}
</style>
