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
let fetchLock = false;

const searchPokemon = async () => {
  const data = await PokemonRepository.list(pokemonList.value.length);
  if (data === false || typeof data === "boolean") {
    message.value = "Ocorreu um erro ao buscar os Pokemons";
  } else {
    data.forEach((d) => pokemonList.value.push(d));
  }
  fetchLock = false;
};
searchPokemon();

const goToPokemon = () => {
  router.push(`/${search.value}`);
};

const handleScroll = async ({
  target: { scrollTop, clientHeight, scrollHeight },
}) => {
  if (scrollTop + clientHeight >= scrollHeight) {
    if (!fetchLock) {
      fetchLock = true;
      await searchPokemon();
    }
  }
};
</script>

<template>
  <div class="row" id="content" @scroll="handleScroll">
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

#content {
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>
