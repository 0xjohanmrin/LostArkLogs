<template>
  <v-container>
    <h4>Gem Snipping Calculator</h4>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="900">
          <v-card-title> Calculator </v-card-title>
          <v-card-text>
            <div>
              <v-row>
                <v-col>
                  <v-select
                    density="compact"
                    hide-details
                    label="From"
                    :items="levelList"
                    v-model="from"
                  ></v-select>
                  <v-text-field
                    label="Price"
                    density="compact"
                    hide-details
                    class="mt-5"
                    v-model="gemPrice"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-select
                    density="compact"
                    hide-details
                    label="To"
                    :items="levelList"
                    v-model="to"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-btn @click="calculate()"> Calculate </v-btn>
                </v-col>
              </v-row>

              <v-table density="compact">
                <thead>
                  <tr>
                    <th class="text-left">Level</th>
                    <th class="text-left">NumberOfGems</th>
                    <th class="text-left">GemCost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(gem, index) in gemperlevel" :key="index">
                    <th>
                      {{ from + index }}
                    </th>
                    <th>{{ gem }} gems</th>
                    <th>{{ (gem * gemPrice).toFixed(2) }} g</th>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mx-auto" max-width="900">
          <v-card-title> Snipping Calculator </v-card-title>
          <v-card-text>
            <div>
              <v-row>
                <v-col>
                  <v-select
                    density="compact"
                    hide-details
                    label="Gem Level"
                    :items="levelList"
                    v-model="gemLevel"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Price"
                    density="compact"
                    hide-details
                    v-model="gemLevelPrice"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-btn @click="calculatePrice()"> Calculate </v-btn>
                </v-col>
              </v-row>

              <v-table density="compact">
                <thead>
                  <tr>
                    <th class="text-left">Level</th>
                    <th class="text-left">NumberOfGems</th>
                    <th class="text-left">GemCost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(gem, index) in gemLevelArrayReverse" :key="index">
                    <th>
                      {{ 1 + index }}
                    </th>
                    <th>{{ gem }} gems</th>
                    <th>{{ (gemLevelPrice / gem).toFixed(2) }} g</th>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </v-card-text>
        </v-card></v-col
      >
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

let levelList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let from = ref(1);
let to = ref(7);
let gemPrice = ref(0);

let gemLevel = ref(7);
let gemLevelPrice = ref(0);
let gemperlevel = ref([] as number[]);
let gemLevelArray = ref([] as number[]);

let calculate = () => {
  const gemToUpgrade = 3;
  gemperlevel.value = [];
  let nextLevelGem = 0;
  for (let i = from.value; i <= to.value; i++) {
    if (nextLevelGem == 0) {
      nextLevelGem = 1;
    } else {
      nextLevelGem = nextLevelGem * gemToUpgrade;
    }
    gemperlevel.value.push(nextLevelGem);
  }
};

let calculatePrice = () => {
  const gemToUpgrade = 3;
  gemLevelArray.value = [];
  let nextLevelGem = 0;
  for (let i = 0; i < gemLevel.value; i++) {
    if (nextLevelGem == 0) {
      nextLevelGem = 1;
    } else {
      nextLevelGem = nextLevelGem * gemToUpgrade;
    }
    console.log(nextLevelGem);
    gemLevelArray.value.push(nextLevelGem);
  }
};

let gemLevelArrayReverse = computed(() => {
  let x = gemLevelArray.value.slice(0).reverse();
  return x;
});
</script>
