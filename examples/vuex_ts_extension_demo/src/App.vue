<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { mapState, mapMutations, mapActions } from "./store";

export default Vue.extend({
  name: "App",
  components: {
    HelloWorld,
  },
  computed: {
    ...mapState("test", ["isShow", "text"]),
    ...mapState(["isModule"]),
  },
  created() {
    console.log("text--", this.text);

    this.changeText("xixixi");
    console.log("textAfter---", this.text);
    console.log("isModule");

    this.changeModuleAsync("123");
  },
  methods: {
    ...mapMutations("test", ["changeText"]),
    ...mapActions(["changeModuleAsync"]),
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
