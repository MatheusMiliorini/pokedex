<script setup lang="ts">
import type { PokemonData } from "@/interfaces/PokemonData";
import { capitalizeFirst } from "@/utils/utils";
import TypeTag from "@/components/TypeTag.vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  pokemon: PokemonData;
  info?: boolean;
}>();

const router = useRouter();

const goToDetails = () => {
  if (!props.info) {
    router.push(`/${props.pokemon.name}`);
  }
};
</script>

<template>
  <div>
    <div
      class="pokemon-card"
      :style="{ cursor: info ? '' : 'pointer' }"
      @click="goToDetails"
    >
      <img
        :src="props.pokemon.sprites.front_default"
        :alt="`Uma imagem do Pokémon ${props.pokemon.name}`"
        :class="info ? 'big-image' : ''"
      />
      <div>
        <b>{{ capitalizeFirst(props.pokemon.name) }}</b>
      </div>
      <div v-if="!info" class="mt-10">
        <b>Cód: {{ props.pokemon.id }}</b>
      </div>
      <div class="types-div mt-70">
        <type-tag
          v-for="type in props.pokemon.types"
          :key="type.slot"
          :type="type.type"
        />
      </div>
    </div>
    <div v-if="info" class="pokemon-card mt-70">
      <div class="abilities-title">Habilidades</div>
      <div
        class="ability-item"
        v-for="ability in pokemon.abilities"
        :key="ability.slot"
      >
        {{ capitalizeFirst(ability.ability.name) }}
      </div>
    </div>
    <div class="back-button" v-if="info">
      <router-link to="/">Voltar</router-link>
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

.back-button a {
  text-decoration: none;
}

.abilities-title {
  font-weight: bold;
  font-size: 18px;
  padding: 10px 0px;
}

.ability-item {
  text-align: left;
  border-top: 1px solid lightgrey;
  color: rgb(85, 85, 85);
  size: 14px;
  padding: 5px;
}

.big-image {
  height: 200px;
}
</style>
