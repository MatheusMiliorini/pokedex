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

const clearSearch = () => {
  search.value = "";
};

const goToPokemon = (e?: KeyboardEvent) => {
  if (!e || e.key === "Enter" || e.keyCode === 13) {
    router.push(`/${search.value}`);
  }
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
          <div class="input-with-icon">
            <i
              class="fa fa-search mobile-only"
              aria-hidden="true"
              @click="() => goToPokemon()"
            ></i>
            <input
              type="text"
              v-model="search"
              placeholder="Pesquise por nome ou código"
              id="input-search"
              @keyup="goToPokemon"
            />
            <i
              @click="clearSearch"
              class="fa fa-times desktop-only"
              aria-hidden="true"
            ></i>
          </div>
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
  padding-top: 5px;
}

.input-with-icon {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 50px;
  padding: 5px;
}
.input-with-icon input {
  width: 100%;
  border: none;
  outline: none;
}

.input-with-icon .fa-times {
  padding-right: 20px;
  cursor: pointer;
}

.input-with-icon .fa-search {
  padding: 0 10px;
}
</style>
