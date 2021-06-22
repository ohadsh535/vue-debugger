import { events } from "./events";
import VueDebugger from "./VueDebugger";

export const Debug = {
  install(Vue, args = {}) {
    function formatMsg(msg) {
      let formattedMsg = msg;
      const msgType = typeof msg;
      switch (msgType) {
        case "object":
          formattedMsg = JSON.stringify(msg, null, 2);
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

    const methods = supportedMethods.reduce((acc, method) => {
      acc[method] = function (...optionalParams) {
        const msgArr = optionalParams[0] || [];

        const formattedMsgArr = msgArr.map((item) => {
          return formatMsg(item);
        });

        events.$emit("log", {
          message: formattedMsgArr.join("\n"),
          severity: method,
        });
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

    window.addEventListener("error", function (e) {
      Vue.prototype["$" + name].error(e.message);
    });

    Vue.prototype["$" + name] = methods;
    Vue[name] = methods;
  },
};

export default Debug;
