<template>
  <div
    class="vue-debugger--container font-family-monospaced"
    :class="containerClass"
  >
    <div class="vue-debugger--header">
      <div
        class="cursor-pointer"
        :class="headerTitleClass"
        @click="isMinimized = false"
      >
        Console
      </div>
      <div class="spacer" />
      <template v-if="!isMinimized">
        <button class="vue-debugger--btn" @click="isMinimized = true">
          <i class="mdi mdi-minus"> </i>
        </button>
        <button class="vue-debugger--btn" @click="clear">
          <i class="mdi mdi-cancel"> </i>
        </button>
      </template>
    </div>
    <div
      class="vue-debugger--logs-container"
      id="logsContainer"
      ref="logsContainer"
    >
      <template v-for="msg in messages">
        <div
          class="vue-debugger--log-line"
          :class="msg.class"
          v-bind:key="msg.body"
        >
          {{ msg.body }}
        </div>
      </template>
      <div class="empty-msg" v-if="!messages.length">- Logs are clean -</div>
    </div>
  </div>
</template>

<script>
import { events } from "./events";

export default {
  name: "VueDebugger",
  data: function () {
    return {
      messages: [],
      isMinimized: false,
      hasNew: false,
    };
  },
  mounted() {
    events.$on("log", this.log);
  },
  methods: {
    log(val) {
      if (val) {
        const severityClass = typeof val === "string" ? "log" : val.severity;
        const messageBody = typeof val === "string" ? val : val.message;
        this.messages.push({
          class: `${severityClass}--text`,
          body: `[${new Date().toISOString()}]: ${messageBody}`,
        });
      }

      this.hasNew = this.isMinimized;

      setTimeout(() => {
        const elem = this.$refs.logsContainer;
        elem.scrollTop = elem.scrollHeight;
      }, 200);
    },
    clear() {
      this.messages = [];
    },
  },
  computed: {
    containerClass() {
      return this.isMinimized ? "minimized" : "";
    },
    headerTitleClass() {
      const classes = [];
      if (this.isMinimized && this.hasNew) {
        const { class: msgClass = "" } =
          this.messages[this.messages.length - 1];
        classes.push(msgClass, "text--underline");
      }

      return classes.join(" ");
    },
  },
  watch: {
    isMinimized(val) {
      if (!val) {
        this.hasNew = false;
      }
    },
  },
};
</script>

<style scoped>
.vue-debugger--container {
  background-color: #1e1e1e;
  color: #fff;
  display: block;
  max-width: 100%;
  width: 100%;
  text-align: left;
  direction: ltr;
}

.vue-debugger--header {
  align-items: center;
  display: flex;
  background: #323232;
  padding: 3px 5px;
  font-size: 13px;
  font-weight: bold;
}

.font-family-monospaced {
  font-family: monospace;
  position: fixed;
  bottom: 0;
  left: 0;
}

.vue-debugger--logs-container {
  min-height: 50px;
  max-height: 100px;
  font-size: 0.75rem !important;
  letter-spacing: 0.0333333333em !important;
  line-height: 1.25rem;
  overflow: auto;
}

.vue-debugger--log-line {
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0 5px;
}

.info--text {
  color: #eeeeee;
}

.error--text {
  color: #ff5252;
}

.warn--text {
  color: #ffe353;
}

.debug--text {
  color: #2196f3;
}

.text--underline {
  text-decoration: underline;
}

.vue-debugger--container.minimized {
  width: auto;
  opacity: 0.8;
  outline: 1px solid rgba(255, 255, 255, 0.3);
}

.vue-debugger--container.minimized .vue-debugger--logs-container {
  height: 0;
  min-height: 0;
  visibility: hidden;
  width: 0;
}

.spacer {
  flex-grow: 1 !important;
  min-width: 5px;
}

button.vue-debugger--btn {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  font-weight: 500;
  letter-spacing: 0.09em;
  justify-content: center;
  outline: 0;
  position: relative;
  text-decoration: none;
  text-indent: 0.0892857143em;
  text-transform: uppercase;
  transition-duration: 0.28s;
  transition-property: box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  color: #fff;
  background: transparent;
  border-style: none;
  border-radius: 50%;
  height: 28px;
  width: 28px;
  box-shadow: none;
  padding: 0;
  min-width: auto;
}

.vue-debugger--btn i {
  font-size: 16px;
}

.empty-msg {
  opacity: 0.4;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
