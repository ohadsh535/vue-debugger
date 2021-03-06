import { events } from "./events";
import VueDebugger from "./VueDebugger";

export const Debug = {
  install(
    Vue,
    args = {
      componentName: null,
    }
  ) {
    function formatMsg(msg) {
      let formattedMsg = msg;
      const msgType = typeof msg;
      switch (msgType) {
        case "object":
          if (msg.message && msg.stack) formattedMsg = msg.message;
          else formattedMsg = JSON.stringify(msg, null, 2);
          break;
      }

      return formattedMsg;
    }

    if (this.installed) return;

    this.installed = true;
    this.params = args;
    this.overrideConsoleLog = true;

    Vue.component(args.componentName || "vue-debugger", VueDebugger);

    const supportedMethods = ["info", "debug", "warn", "error", "log"];

    const name = args.name || "debug";

    const { ...prevConsole } = console;

    // Prototype new console object.
    if (this.overrideConsoleLog) {
      // eslint-disable-next-line no-global-assign
      console = {};
    }

    const methods = supportedMethods.reduce((acc, method) => {
      acc[method] = function (...optionalParams) {
        try {
          const msgArr = optionalParams[0] || [];

          const formattedMsgArr = msgArr.map((item) => {
            return formatMsg(item);
          });

          events.$emit("log", {
            message: formattedMsgArr.join("\n"),
            severity: method,
          });
        } catch (err) {
          prevConsole.log("vue-debugger exception", err);
        }
      };

      if (this.overrideConsoleLog) {
        /* eslint-disable-next-line no-console */
        console[method] = function (...args) {
          acc[method](args);

          prevConsole[method].call(this, ...args);
        };
      }
      return acc;
    }, {});

    // Re-assign console with non-overridden methods.
    Object.keys(prevConsole)
      .filter((name) => !supportedMethods.includes(name))
      .map((funcName) => {
        console[funcName] = prevConsole[funcName];
      });

    window.addEventListener("error", function (e) {
      Vue.prototype["$" + name].error(e.message);
    });

    Vue.prototype["$" + name] = methods;
    Vue[name] = methods;
  },
};

export default Debug;
