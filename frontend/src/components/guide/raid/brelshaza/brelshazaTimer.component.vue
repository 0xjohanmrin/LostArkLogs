<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        class="mx-0 px-0 hide-on-sm"
        sm="auto"
        md="auto"
        lg="2"
        xl="2"
      ></v-col>
      <v-col lg="8" xl="8">
        <h1 class="text-left">Brelshaza Timer</h1>
        <h2>Enrage Timer - 20:00</h2>
        <v-btn> Start </v-btn>
      </v-col>
      <v-col
        class="mx-0 px-0 hide-on-sm"
        sm="auto"
        md="auto"
        lg="2"
        xl="2"
      ></v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
let timeElapsed = 0;
let timerInterval = undefined;
let timeLimit = 10;

const startTimer = () => {
  timerInterval = setInterval(() => {
    timeElapsed++;
  }, 1000);
};

const formattedTimeLeft = computed(() => {
  const timeLeft = this.timeLeft;

  const minutes = Math.floor(timeLeft / 60);

  let seconds = timeLeft % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  // The output in MM:SS format
  return `${minutes}:${seconds}`;
});
</script>
