<template>
  <div id="app">
    <div id="main">
      <div class="navigator">
        <a href="https://badge.fury.io/js/vue-debugger" rel="nofollow"><img src="https://camo.githubusercontent.com/f973a2499d2acbd885d5f85b200d9ecc04e645d1eebc12532ae2cd6f320f931b/68747470733a2f2f62616467652e667572792e696f2f6a732f7675652d64656275676765722e737667" alt="npm version" data-canonical-src="https://badge.fury.io/js/vue-debugger.svg" style="max-width:100%;"></a>
        <a href="#" @click="toggleView">{{view === 'code' ? 'Example 2' : 'Example 1'}}</a>
      </div>
      <exec-code v-if="view === 'code'"/>
      <login-form v-else />

    </div>
    <vue-debugger/>
  </div>
</template>

<script>
import ExecCode from "./components/ExecCode";
import LoginForm from "./components/LoginForm";
export default {
  name: 'App',
  data: () => ({
    view: 'code'
  }),
  components: {
    LoginForm,
    ExecCode
  },
  methods: {
    toggleView() {
      const newView = this.view === 'code' ? 'login' : 'code';
      console.warn(`Changed view: ${this.view} -> ${newView}`)
      this.view = newView;
    }
  }
}
</script>

<style>
body {
  margin: 0;
  background: #eeeeee;
}
.container {
  padding: 60px 10px 0;
  display: flex;
  flex-direction: column;
  max-width: 640px;
  margin: 0 auto;
  width: calc(100% - 20px);
}
.navigator {
  background: #2c3e50;
  padding: 5px 15px;
  text-align: end;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.navigator a {
  color: #fff;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  display: flex;
}
#main {
  display: flex;
  flex-direction: column;
  flex: 1;
}
button {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  padding: 0 16px;
  min-width: 64px;
  height: 36px;
  vertical-align: middle;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: uppercase;
  color: rgb(255, 255, 255);
  background-color: rgb(33, 150, 243);
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  font-family: var(--pure-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
  font-size: 14px;
  font-weight: 500;
  line-height: 36px;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
button:disabled {
  color: rgba(0, 0, 0, 0.38);
  background-color: rgba(0, 0, 0, 0.12);
  box-shadow: none;
  cursor: initial;
}

button:disabled::before {
  opacity: 0;
}

button:disabled::after {
  opacity: 0;
}
</style>
