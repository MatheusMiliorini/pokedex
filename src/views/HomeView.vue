<script setup lang="ts">
import { ref } from "@vue/reactivity";

import PokemonRepository from "@/repositories/PokemonRepository";
import type { PokemonData } from "@/interfaces/PokemonData";
import PokemonCard from "@/components/PokemonCard.vue";

const search = ref("");
const message = ref("");
const pokemonList = ref<PokemonData[]>([]);

const searchPokemon = async () => {
  const data = await PokemonRepository.get(search.value);
  if (data === false || typeof data === "boolean") {
    message.value = "Ocorreu um erro ao buscar os Pokemons";
  } else {
    pokemonList.value = data;
  }
};

searchPokemon();
</script>

<template>
  <div class="row">
    <div class="col-md-10 offset-md-1">
      <div class="row">
        <input
          type="text"
          v-model="search"
          placeholder="Pesquise por nome ou código"
          class="form-control rounded-input"
        />
      </div>
      <div class="row">
        <div class="col-md-3" v-for="pokemon in pokemonList" :key="pokemon.id">
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
</style>
