<p align="right">
  <a href="https://www.buymeacoffee.com/octa.code" target="_blank">
  <img width="200" alt="" src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-3.svg">
  </a>
</p>

# Vue.js Console Debugger

<p align="center">
  <img src="http://cdn.thu.bz/vue-debugger-login.gif">
</p>

## Demo

- http://vue-debugger.octa-code.com/

## Setup


```bash
npm install --save vue-debugger
```

Add dependencies to your `main.js`:

```javascript
import Vue           from 'vue'
import VueDebugger from 'vue-debugger'
import 'vue-debugger/dist/vue-debugger.css'

Vue.use(VueDebugger)
```

Add the global component to your `App.vue`:

```vue
<vue-debugger/>
```

Trigger notifications from your `.vue` files:

```javascript
// capture console.XXX and other errors.
console.log('Hello')
console.error('Hello')
```

```javascript
// simple direct plugin
this.$debug.log('Hello World!')
this.$debug.warn('A warning message')
```

Or trigger logs from other files, for example, your store / router:

```javascript
import Vue from 'vue'

Vue.debug.log('Logged by Vue')
```

### Features



| Features                     | Type          | Description                                                  |
| ---------------------------- | ------------- | ------------------------------------------------------------ |
| ```console.XXX``` capture    | log           | Auto collect all usages of console log levels.               |
| ```Vue.debug.XXX``` log      | log           | Log directly to component view but not to browser console.   |
| Expand - Minimize            | view          | View Modes control to minimize, expand console view.         |
| clear                        | view          | Clear console messages.                                      |

## FAQ

Check closed issues with `FAQ` label to get answers for most asked questions.

## Development

To run a local demo:

```bash
# run the demo
cd demo
npm install
npm run serve
```
<p align="center">
  <img src="http://cdn.thu.bz/vue-debugger-console.gif">
</p>
