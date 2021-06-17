<template>
  <div id="app">
    <div id="main">
      <div class="navigator">
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
      this.view = this.view === 'code' ? 'login' : 'code';
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
  padding: 3px;
  text-align: end;
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
