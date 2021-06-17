import { events } from "./events";
import VueDebugger from "./VueDebugger";
import "@mdi/font/css/materialdesignicons.css";

export const Debug = {
  install(Vue, args = {}) {
    if (this.installed) return;

    this.installed = true;
    this.params = args;
    this.overrideConsoleLog = true;

    Vue.component(args.componentName || "vue-debugger", VueDebugger);

    const supportedMethods = ["info", "debug", "warn", "error", "log"];

    const name = args.name || "debug";

    const { ...prevConsole } = console;

    const methods = supportedMethods.reduce((acc, method) => {
      acc[method] = (msg) => {
        events.$emit("log", {
          message: msg,
          severity: method,
        });
      };

      if (this.overrideConsoleLog) {
        console[method] = function (data, preventRedundancy) {
          if (!preventRedundancy) {
            acc[method](data);
            prevConsole[method].call(
              this,
              data,
              "\n--\n**!! VueDebugger active !!**"
            );
          }
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
