<script setup lang="ts">
import type { Type2 } from "@/interfaces/PokemonData";

const props = defineProps<{
  type: Type2;
}>();

const typeColors = {
  grass: "#08FEC3",
  poison: "#AF08FE",
  water: "#00A3FF",
  fire: "#FE0808",
  electric: "#FFB800",
  ground: "#85826E",
  fairy: "#FBA1EC",
  normal: "#C4C4C4",
  flying: "#5317FC",
  default: "#0E0E0E",
  bug: "#08821a",
};
</script>

<template>
  <div
    class="type"
    :style="{
      backgroundColor: typeColors[props.type.name] || typeColors['default'],
    }"
  >
    {{ props.type.name.toUpperCase() }}
  </div>
</template>

<style>
.type {
  border-radius: 50px;
  padding: 3px;
  color: white;
  min-width: 50%;
}
</style>
