<script setup lang="ts">
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { RouterView } from "vue-router";
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
  </header>

  <div class="container" id="container">
    <RouterView />
  </div>
</template>

<style>
@import url("assets/base.css");

header {
  box-shadow: 0px 1px 3px lightgrey;
  width: 100%;
  background-color: #fff;
}

.logo {
  padding: 5px;
}
</style>
