<template>
    <div class="rete" :class="{done : isDone}" ref="rete"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createEditor } from './rete';

const isDone = ref(false)

export default defineComponent({
  name: 'App',
  async mounted() {
    const { destroy } = await createEditor(this.$refs.rete as HTMLElement, isDone, this.$props as any)
    this.destroy = destroy
  },
  unmounted() {
    this.destroy()
  },
  setup() {
    return { isDone }
  },
  props: ["decl", "depth"],
  data() {
    return {
      destroy: () => {}
    }
  }
});
</script>

<style>
@import './common.css';
@import './customization/background.css';

.rete {
  position: relative;
  width: 80vw;
  height: 90vh;
  font-size: 1rem;
  background: white;
  margin: 1em auto;
  border-radius: 1em;
  text-align: left;
  border: 3px solid #55b881;
  &.done {
    background: #a1f196;
  }
}
</style>
