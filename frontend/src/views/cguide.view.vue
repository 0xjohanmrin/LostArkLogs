<template>
  <CommunityGuide />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import CommunityGuide from "@/components/guide/communityGuide.component.vue";

export default defineComponent({
  name: "CGuideView",
  components: {
    CommunityGuide,
  },
});
</script>
