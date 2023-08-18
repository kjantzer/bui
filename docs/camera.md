# Camera

## Setup

```html
<b-camera></b-camera>
```

## Methods

#### `start`

Note: this method must be called from a user action if the user has not yet given camera permission

```js
start({
    facingMode='environment',
    width=1920,
    aspectRatio=1.7777777778,
    audio=false,
    deviceId=null,
    mirror=null
}={})
```

#### `toggleStart`

#### `stop`

#### `takePicture`

```js
takePicture({filename}={})
```

#### `saveFrame`

Alias of `takePicture`

## Camera Controls

Enables `right+click` to change camera settings

```html
<b-camera>
    <b-camera-controls></b-camera-controls>
</b-camera>
```