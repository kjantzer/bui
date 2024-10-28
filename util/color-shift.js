/*
    # Color Shift

    Changes the RGB/HEX temporarily to a HSL-Value, modifies that value and changes it back to RGB/HEX.

    ```js
    import {changeHue, rgbToHSL, hslToRGB, rgbToHex} from 'bui/util/color-shift'

    changeHue(rgb, degree)
    rgbToHSL(rgb)
    hslToRGB(hsl)
    rgbToHex(r, g, b)
    ```

    Based on: https://stackoverflow.com/a/17433060/484780
*/

// DEPRECATED - use `changeHSL`
export function changeHue(rgb, degree) {
    var hsl = rgbToHSL(rgb);
    hsl.h += degree;
    if (hsl.h > 360) {
        hsl.h -= 360;
    }
    else if (hsl.h < 0) {
        hsl.h += 360;
    }
    return hslToRGB(hsl);
}

// FIXME: not sure this is 100% right yet
export function changeHSL(hsl, {h=0, s=0, l=0}={}){
    let isHex = hsl.startsWith('#')
    
    if( isHex )
        hsl = rgbToHSL(hsl)

    hsl.s = Math.round(hsl.s*100)
    hsl.l = Math.round(hsl.l*100)

    hsl.h += h;
    if( hsl.h > 360 ) hsl.h -= 360;
    else if( hsl.h < 0 ) hsl.h += 360;

    hsl.s += s;
    if( hsl.s > 100 ) hsl.s -= 100;
    else if( hsl.s < 0 ) hsl.s += 100;

    hsl.l += l;
    if( hsl.l > 100 ) hsl.l -= 100;
    else if( hsl.l < 0 ) hsl.l += 100;

    hsl.s = hsl.s/100
    hsl.l = hsl.l/100

    if( isHex ) return hslToRGB(hsl)
    return hsl
}

export default changeHue

// exepcts a string and returns an object
export function rgbToHSL(rgb) {
    // strip the leading # if it's there
    rgb = rgb.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(rgb.length == 3){
        rgb = rgb.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(rgb.substr(0, 2), 16) / 255,
        g = parseInt(rgb.substr(2, 2), 16) / 255,
        b = parseInt(rgb.substr(4, 2), 16) / 255,
        cMax = Math.max(r, g, b),
        cMin = Math.min(r, g, b),
        delta = cMax - cMin,
        l = (cMax + cMin) / 2,
        h = 0,
        s = 0;

    if (delta == 0) {
        h = 0;
    }
    else if (cMax == r) {
        h = 60 * (((g - b) / delta) % 6);
    }
    else if (cMax == g) {
        h = 60 * (((b - r) / delta) + 2);
    }
    else {
        h = 60 * (((r - g) / delta) + 4);
    }

    if (delta == 0) {
        s = 0;
    }
    else {
        s = (delta/(1-Math.abs(2*l - 1)))
    }

    return {
        h: h,
        s: s,
        l: l
    }
}

// expects an object and returns a string
export function hslToRGB(hsl) {
    var h = hsl.h,
        s = hsl.s,
        l = hsl.l,
        c = (1 - Math.abs(2*l - 1)) * s,
        x = c * ( 1 - Math.abs((h / 60 ) % 2 - 1 )),
        m = l - c/ 2,
        r, g, b;

    if (h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else {
        r = c;
        g = 0;
        b = x;
    }

    r = normalize_rgb_value(r, m);
    g = normalize_rgb_value(g, m);
    b = normalize_rgb_value(b, m);

    return rgbToHex(r,g,b);
}

function normalize_rgb_value(color, m) {
    color = Math.floor((color + m) * 255);
    if (color < 0) {
        color = 0;
    }
    return color;
}

export function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// https://stackoverflow.com/a/5624139/484780
export function hexToRgb(hex, {string=false, array=false}) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if( !result ) return null
    
    let r = parseInt(result[1], 16)
    let g = parseInt(result[2], 16)
    let b = parseInt(result[3], 16)

    if( array )
        return [r,g,b]
    if( string )
        return string === 'rgba' ? `rgba(${r}, ${g}, ${b}, 1)` : `rgb(${r}, ${g}, ${b})`
    return {r,g,b}
}