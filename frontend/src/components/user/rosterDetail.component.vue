<template>
  <h1>CharacterName</h1>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <table v-if="activePreset" id="table">
          <thead>
            <tr>
              <th class="theader">Acc</th>
              <th v-for="(col, index) in activePreset.header" :key="index">
                <div>
                  <vue-select
                    label="name"
                    :options="options"
                    v-model="col.engraving"
                    :reduce="(option:any) => option.name"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, jindex) in rowAcc"
              :key="jindex"
              class="trbody text-center"
            >
              <td>
                <img :src="row.img" class="table-image" />

                {{ row.name }}
              </td>
              <td v-for="(col, index) in columns" :key="index">
                <vue-select
                  class="node-select"
                  v-model="activePreset.table[jindex][index]"
                  :options="optionRow(row.type)"
                  :noDrop="
                    sameRow(activePreset.table[jindex], row.type) &&
                    activePreset.table[jindex][index] == 0
                  "
                  :clearable="false"
                />
              </td>
            </tr>

            <tr class="text-center">
              <td>Total</td>
              <td v-for="(col, index) in activePreset.header" :key="index">
                <div v-if="col.engraving">
                  <div class="d-flex justify-center align-center">
                    <div>
                      <img
                        v-if="getEngImage(col.engraving)"
                        :src="getEngImage(col.engraving)"
                        referrerpolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p>
                        + {{ col.value }}
                        {{ col.engraving }}
                      </p>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        {{ getTotalEngraving() }}
      </v-col>
      <!--       <v-col cols="12"> {{ char.gearset.builds[activeSet] }} </v-col>
 -->
      <v-col cols="12"> Gear </v-col>
    </v-row>
  </v-container>
  {{ char }}
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";
import { Classes } from "@/model/lostark-class";
import { Engraving, Acc, sortEngravig } from "@/model/assets";

const store = useStore();

const char = computed(() => store.getters["selectedCharacter"]);
const activeSet = 0;

const tableEmpty = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];
const headerEmpty = [
  {
    name: "Engraving1",
    engraving: "",
    value: 0,
  },
  {
    name: "Engraving2",
    engraving: "",
    value: 0,
  },
  {
    name: "Engraving3",
    engraving: "",
    value: 0,
  },
  {
    name: "Engraving4",
    engraving: "",
    value: 0,
  },
  {
    name: "Engraving5",
    engraving: "",
    value: 0,
  },
  {
    name: "Engraving6",
    engraving: "",
    value: 0,
  },
];
const activePreset = ref();
const options = ref(sortEngravig);
const columns = ref(headerEmpty);

onMounted(() => {
  let x = localStorage.getItem("engraving");
  console.log("Mounted", x);
  if (x) {
    preset.value = JSON.parse(x);
  } else {
    preset.value = [
      {
        name: "New Page",
        header: headerEmpty,
        table: tableEmpty,
      },
    ];
  }
  activePreset.value = preset.value[0];
});
const preset = ref();
const rowAcc = ref(Acc);

const sameRow = (elements: any, type: any) => {
  let count = 0;
  let x;
  let y;
  elements.forEach((element: any) => {
    if (element == 0) {
      count++;
    }
  });
  switch (type) {
    case "Stone":
      x = count <= 4 ? true : false;
      break;
    case "Book":
      x = count <= 5 ? true : false;
      break;
    default:
      x = count <= 4 ? true : false;
      break;
  }
  return x;
};
const getEngImage = (eng: string) => {
  return options.value.find((e) => e.name == eng).img;
};
const optionRow = (type: any) => {
  if (type == "Stone") {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }
  if (type == "Book") {
    return [0, 3, 6, 9, 12];
  }
  return [0, 1, 2, 3, 4, 5, 6];
};
function getTotalEngraving() {
  if (activePreset.value) {
    for (let index = 0; index < activePreset.value.header.length; index++) {
      let sum = 0;
      for (let jindex = 0; jindex < rowAcc.value.length; jindex++) {
        sum += activePreset.value.table[jindex][index];
      }
      activePreset.value.header[index].value = sum;
    }
    window.localStorage.setItem("engraving", JSON.stringify(preset.value));
  }
}
</script>

<style scoped>
#table {
  width: 100%;
  table-layout: fixed;
}
.table-image {
  max-width: 40px;
}
.node-select {
  width: 70%;
  margin-left: auto;
}
table,
th,
td {
  border: 1px solid rgb(243, 243, 243);
}
>>> {
  --vs-controls-color: #664cc3;
  --vs-border-color: #664cc3;

  --vs-dropdown-bg: #282c34;
  --vs-dropdown-color: #cc99cd;
  --vs-dropdown-option-color: #cc99cd;

  --vs-selected-bg: #664cc3;
  --vs-selected-color: #eeeeee;

  --vs-search-input-color: #eeeeee;

  --vs-dropdown-option--active-bg: #664cc3;
  --vs-dropdown-option--active-color: #eeeeee;
}
</style>
