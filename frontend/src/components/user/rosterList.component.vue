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
      <v-col lg="8" xl="8" class="text-center">
        <h1 class="text-left">Add Roster</h1>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="newCharacter.name"
                  label="Nickname"
                  name="CharacterName"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  v-model="newCharacter.rclass"
                  :items="classList"
                  label="Class"
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="newCharacter.gearLevel"
                  label="GearLevel"
                  name="CharacterName"
                ></v-text-field>
              </v-col>
              <v-col>
                {{ newCharacter }}
                <v-btn @click="addCharacter"> Add </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-row v-if="charList" class="pt-5">
          <v-col cols="3" v-for="(char, index) in charList" :key="index">
            <v-card @click="selectCharacter(char)">
              <v-card-title> {{ char.name }}</v-card-title>
              <v-card-text>
                <img :src="getTableImage(char.rclass)" alt="" srcset="" />
                <div class="text-left">
                  <h2>Item Level {{ char.gearLevel }}</h2>
                  <h3>Class: {{ char.rclass }}</h3>
                  {{ char._id }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary">Edit</v-btn>
                <v-btn color="error">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
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

<script lang="ts" setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { Classes } from "@/model/lostark-class";

const valid = ref(false);
const classR = ref("");
const store = useStore();
const router = useRouter();
const newCharacter = ref({
  name: "",
  rclass: "",
  gearLevel: 0,
  lazy: false,
});

onMounted(() => {
  setTimeout(() => {
    store.dispatch("getCharactersbyAuthorId");
  }, 1500);
});

const charList = computed(() => store.getters["characters"]);

let classList = computed(() => {
  return Classes.filter(function (item) {
    return item.name !== "Unreleased";
  }).map((item) => {
    return item.name;
  });
});

const getTableImage = (name: string) => {
  console.log("getTableImage " + name);
  let x = Classes.filter((item) => item.name === name);
  let icon = `img/classes/${(x[0].id + "").padStart(2, "0")}.png`;

  return icon;
};

const selectCharacter = (char: any) => {
  console.log("selectCharacter", char);
  store.dispatch("setSelectedCharacter", char);
  router.push({ path: `/roster/${char._id}` });
};

const addCharacter = async () => {
  let nCharacter = {
    name: newCharacter.value.name,
    rclass: newCharacter.value.rclass,
    gearLevel: newCharacter.value.gearLevel,
    lazy: newCharacter.value.lazy,
  };
  console.log("add", nCharacter);
  await store.dispatch("uploadCharacters", nCharacter);
};
</script>
