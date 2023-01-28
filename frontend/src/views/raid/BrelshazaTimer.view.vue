<template>
  <BrelTimer />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import BrelTimer from "@/components/guide/raid/brelshazaTimer.component.vue";

export default defineComponent({
  name: "CGuideView",
  components: {
    BrelTimer,
  },
});
</script>
