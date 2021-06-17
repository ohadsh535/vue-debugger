<template>
  <div class="container">
    <textarea rows="20" class="console-input" v-model="code" />
    <button @click="execCode">Execute</button>
  </div>
</template>

<script>
export default {
  name: 'ExecCode',
  data: () => ({
    code: ''
  }),
  methods: {
    execCode() {
      eval(this.code);
    },
  },
  components: {
  }
}
</script>

<style>
.console-input {
  display: flex;
  flex: 1;
  resize: none;
  background: #2c3e50;
  color: #ffe353;
  padding: 5px;
  margin-bottom: 10px;
}
</style>
