# BarcodeScanner

Many barcode scanners enter barcode values like a person would while typing on a keyboard.
The script listens for a set of characters to be entered very quickly. It is assumed
that a human cannot enter the characters this fast and thus must be a barcode scanner.

`textInput` events are also supported but require a barcode button key to be set in: `textInputKeys`

```js
import BarcodeScanner from 'bui/util/barcodeScanner'

// init once
BarcodeScanner()

window.addEventListener('barcode-scanned', e=>{
    let {str, type} = e.detail
})

// react to specific barcode (see parsers below)
window.addEventListener('barcode-scanned:isbn', e=>{
    let {str, val, type} = e.detail
})
```

### Parsers

Parsers can be defined to pre-format the scanned values before emitting the result. By default there are no parsers defined.

```js
// add single parser
BarcodeScanner.addParser('isbn', /^(978[\d]{10})$/)

// add several at once
BarcodeScanner.addParser({
    // simple regex match
    isbn: /^(978[\d]{10})$/,

    // additional settings
    id_list: {
		patt: /^IDs:(.+)/,
		type: 'int',
        // assuming scanned code was "IDs:1,2,53,134" parsed result will be `[1, 2, 53, 134]`
		parse(result){ result.val=result.val.split(',') }
	}
})
```

### Camera

There is a camera version available that uses `Dialog` and `Notif` to present. This can be useful on Android phones and tablets.

Upon a successful scan, it will emit the same `barcode-scanned` events

```js
import BarcodeCamera from 'bui/util/barcodeScanner/camera'

if( BarcodeCamera.isSupported ){
    
    BarcodeCamera.open() // default settings
   
    BarcodeCamera.open({
        anchor: 'top-right',
        scanner: {
            continuous: false, // closes after first scan
            formats: ['qr_code', 'ean_13', 'code_128'],
            facingMode: 'environment',
            width: 640,
            aspectRatio: 1.7777777778,
            focusDistance: 0.2,
            detectInterval: 100 
        }
    })

    // programtaically close the shared barcode scanner
    BarcodeCamera.shared.close()
}
```

> NOTE: requires `BarcodeDetector` (not available on iOS) https://caniuse.com/?search=BarcodeDetector