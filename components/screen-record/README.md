# Screen Recorder

A simple shared component that allows for a screen to be recorded. Includes webcam and mic.

> This is a basic working implemetation. Customization via code is limited.

## How to Use

```js
import ScreenRecord from 'bui/components/screen-record'

function start(){
    ScreenRecord.shared.open()
}
```

## Features
- Can record tab, browser, or entire screen
- Captures camera avatar and mic audio
- Avatar can be dragged around and snaps to edges if past the edge
- Two avatar sizes
- 720p, 1080p, and 1440p resolutions
- Can draw on the screen while recording (when holding `shift+ctrl/cmd`)

## TODO
- mic/video enable/disable