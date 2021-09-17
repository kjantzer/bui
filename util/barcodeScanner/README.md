## `BarcodeScanner`

```js
import BarcodeScanner from 'bui/util/barcodeScanner'

// init
BarcodeScanner()

// react to specific barcode
window.addEventListener('barcode-scanned:isbn', e=>{
    let {str, val, type} = e.detail
})

// react to any scanned barcode
window.addEventListener('barcode-scanned', e=>{
    let {str, type} = e.detail
})
```

### Parsers

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

There is a camera version available that uses Dialog and Notif to present.

Upon a successful scan, it will emit the same `barcode-scanned` events

```js
import BarcodeCamera from 'bui/util/barcodeScanner/camera'

if( BarcodeCamera.isSupported ){
    
    BarcodeCamera.open() // default settings
   
    BarcodeCamera.open({
        anchor: 'top-right',
        scanner: {
            continous: false, // closes after first scan
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