<script setup lang="ts">
import PokemonRepository from "@/repositories/PokemonRepository";
import { useRoute } from "vue-router";
import PokemonCard from "@/components/PokemonCard.vue";
import { ref } from "@vue/reactivity";
import type { PokemonData } from "@/interfaces/PokemonData";
import { onMounted } from "@vue/runtime-core";

const route = useRoute();
const nameOrId = route.params.pokemon.toString().toLowerCase();
const pokemonData = ref<PokemonData>();
const hasLoaded = ref(false);

onMounted(async () => {
  try {
    const data = await PokemonRepository.get(nameOrId);
    pokemonData.value = data;
  } catch (e) {
    //
  }
  hasLoaded.value = true;
});
</script>

<template>
  <div class="offset-md-2 col-md-8">
    <pokemon-card v-if="pokemonData" :pokemon="pokemonData" info />
    <div v-else-if="hasLoaded" class="not-found">
      <div>Esse pokemon não foi encontrado :(</div>
      <div class="back-button">
        <router-link to="/">Voltar</router-link>
      </div>
    </div>
  </div>
</template>

<style>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 500px;
}
</style>
