Pi Pico with Kaluma over WebSerial
========================================

Inspired by: https://www.mathsuniverse.com/pico

### Basic Use

```js
import PiPico from 'bui/util/piPico'

let pico = new PiPico()

// will be true if user already connected previously
console.log(pico.isConnected)

// from a user action
pico.requestPort()

let resp = await pico.write('.hi')

// or listen for any pico reads
// from = "write" or "push"
pico.on('read', ({value, from})=>console.log(from, value)
pico.write('.hi')
```