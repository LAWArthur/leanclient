<template>
  <div id="app">
    <div class="form">
      <div class="form-grid">
        <label>命题</label><input title="命题" v-model="decl"></input>
        <label>展开深度</label><input title="展开深度" v-model="depth"></input>
      </div>
      <button @click="initialize" id="start-button">开始</button>
    </div>
    <ReteEditor :key="componentKey" :decl="decl" :depth="getDepth"></ReteEditor>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createEditor } from './rete';
import ReteEditor from './ReteEditor.vue';

const isDone = ref(false)

export default defineComponent({
  name: 'App',
  async mounted() {
    
  },
  setup() {
    return { isDone }
  },
  data() {
    return {
      decl: "",
      depth: "",
      componentKey: 0
    }
  },
  computed: {
    getDepth() {
      const val = parseInt(this.depth);
      if (isNaN(val)) return null;
      return val;
    }
  },
  methods: {
    initialize() {
      this.componentKey++;
    }
  },
  components: {
    ReteEditor,
  }
});
</script>

<style>
@import './common.css';
@import './customization/background.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.form {
  width: 60%;
  padding: 20px;
  margin: auto;
  background: #ccc;
  border: 1px solid #eee;
  border-radius: 10px;
}

.form-grid {
  display: grid;
  text-align: left;
  width: 100%;
  margin: 1em 0px;
  grid-template-columns: 1fr 4fr;
  row-gap: 10px;
  columns: 30% 70%;
}

#start-button {
  width: 40%;
}

.rete {
  position: relative;
  width: 80vw;
  height: 70vh;
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
