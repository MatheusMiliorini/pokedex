<script setup lang="ts">
import type { PokemonData } from "@/interfaces/PokemonData";
import { capitalizeFirst } from "../utils/utils";
import TypeTag from "@/components/TypeTag.vue";

const props = defineProps<{
  pokemon: PokemonData;
}>();
</script>

<template>
  <div class="pokemon-card">
    <img
      :src="props.pokemon.sprites.front_default"
      :alt="`Uma imagem do Pokémon ${props.pokemon.name}`"
    />
    <div>
      <b>{{ capitalizeFirst(props.pokemon.name) }}</b>
    </div>
    <div class="mt-10">
      <b>Cód: {{ props.pokemon.id }}</b>
    </div>
    <div class="types-div mt-30">
      <type-tag
        v-for="type in props.pokemon.types"
        :key="type.slot"
        :type="type.type"
      />
    </div>
  </div>
</template>

<style>
.pokemon-card {
  text-align: center;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 10px;
  box-shadow: 1px 1px 4px lightgrey;
}

.types-div {
  display: flex;
  justify-content: space-around;
  gap: 5px;
}
</style>
