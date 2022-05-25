<script setup lang="ts">
import PokemonRepository from "@/repositories/PokemonRepository";
import { useRoute } from "vue-router";
import PokemonCard from "@/components/PokemonCard.vue";
import { ref } from "@vue/reactivity";
import type { PokemonData } from "@/interfaces/PokemonData";
import { onMounted } from "@vue/runtime-core";

const route = useRoute();
const nameOrId = route.params.pokemon.toString();
let pokemonData = ref<PokemonData>();

onMounted(async () => {
  const data = await PokemonRepository.get(nameOrId);
  pokemonData.value = data;
});
</script>

<template>
  <div class="offset-md-2 col-md-8">
    <pokemon-card v-if="pokemonData" :pokemon="pokemonData" info />
  </div>
</template>

<style></style>
