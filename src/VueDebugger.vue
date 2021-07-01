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
          <svg style="width: 22px; height: 22px" viewBox="0 0 32 25">
            <path fill="currentColor" d="M19,13H5V11H19V13Z" />
          </svg>
        </button>
        <button class="vue-debugger--btn" @click="clear">
          <svg style="width: 22px; height: 22px" viewBox="0 0 32 25">
            <path
              fill="currentColor"
              d="M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z"
            />
          </svg>
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
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      messages: [],
      isMinimized: false,
      hasNew: false,
    };
  },
  mounted() {
    this.isMinimized = !this.expanded;
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
        if (elem) elem.scrollTop = elem.scrollHeight;
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
  z-index: 1;
}
.vue-debugger--header {
  align-items: center;
  display: flex;
  background: #323232;
  padding: 3px 5px;
  font-size: 13px;
  font-weight: bold;
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
.spacer {
  flex-grow: 1 !important;
  min-width: 5px;
}
.empty-msg {
  opacity: 0.4;
}
.cursor-pointer {
  cursor: pointer;
}
.font-family-monospaced {
  font-family: monospace;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
