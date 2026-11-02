/*
    Notif animations (Web Animations API)

    Each animation returns keyframes + timing for `el.animate()` so the notif can await `.finished`,
    interrupt an animation midway (close while entering) and pause a timer (the progress bar)
*/

const supportsLinearEasing = window.CSS?.supports?.('animation-timing-function', 'linear(0, 1)')

// damped spring sampled into a css `linear()` easing
function spring({stiffness, damping, mass=1, fallback}){

    if( !supportsLinearEasing )
        return fallback

    let w0 = Math.sqrt(stiffness / mass)
    let zeta = damping / (2 * Math.sqrt(stiffness * mass))
    let wd = w0 * Math.sqrt(1 - zeta * zeta)
    let duration = -Math.log(0.002) / (zeta * w0) // seconds until settled

    let points = []
    for( let i = 0; i <= 50; i++ ){
        let t = duration * i / 50
        let v = 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + (zeta * w0 / wd) * Math.sin(wd * t))
        points.push(Math.round(v * 1000) / 1000)
    }
    points[points.length-1] = 1

    return {easing: `linear(${points.join(', ')})`, duration: Math.round(duration * 1000)}
}

export const EASE = 'cubic-bezier(.2, 0, 0, 1)'
export const EASE_IN = 'cubic-bezier(.4, 0, 1, 1)'

const SPRING = spring({stiffness: 260, damping: 24, fallback: {easing: 'cubic-bezier(.2, 1.1, .4, 1)', duration: 450}})
const SPRING_BOUNCY = spring({stiffness: 320, damping: 15, fallback: {easing: 'cubic-bezier(.3, 1.6, .5, 1)', duration: 500}})

export function prefersReducedMotion(){
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

// which way the notif slides/swipes: toward the edge it is anchored to
export function direction(anchor=''){
    let small = window.matchMedia?.('(max-width: 599px)').matches

    if( small || anchor == 'top' || anchor == 'bottom' )
        return anchor.includes('top') ? {axis: 'y', sign: -1} : {axis: 'y', sign: 1}

    return anchor.includes('left') ? {axis: 'x', sign: -1} : {axis: 'x', sign: 1}
}

function offscreen(dir, extra=''){
    let dist = `calc(${dir.sign} * (100% + 1.5em))${extra}`
    return dir.axis == 'x' ? `translateX(${dist})` : `translateY(${dist})`
}

const FADE_IN = {keyframes: {opacity: [0, 1]}, timing: {duration: 180, easing: 'linear'}}

export function enter(name, dir){

    if( prefersReducedMotion() )
        return [FADE_IN]

    switch(name){
        case 'fade':
            return [{keyframes: {opacity: [0, 1]}, timing: {duration: 250, easing: EASE}}]

        case 'grow':
        case 'scale': // legacy name
            return [FADE_IN, {keyframes: {transform: ['scale(.9)', 'none']}, timing: SPRING}]

        case 'bounce':
            return [FADE_IN, {keyframes: {transform: ['scale(.75)', 'none']}, timing: SPRING_BOUNCY}]

        case 'slide':
        default:
            return [FADE_IN, {keyframes: {transform: [offscreen(dir), 'none']}, timing: SPRING}]
    }
}

// `from` is the current transform/opacity so a closing notif continues from where it is (mid enter or mid swipe)
export function exit(name, dir, from={}){

    let opacity = [from.opacity ?? 1, 0]
    let transformFrom = from.transform && from.transform != 'none' ? from.transform : 'none'

    if( prefersReducedMotion() )
        return [{keyframes: {opacity}, timing: {duration: 150, easing: 'linear'}}]

    if( name == 'slide' || from.swiped )
        return [{keyframes: {opacity, transform: [transformFrom, offscreen(dir)]}, timing: {duration: 220, easing: EASE_IN}}]

    return [{keyframes: {opacity, transform: [transformFrom, 'scale(.94)']}, timing: {duration: 160, easing: EASE_IN}}]
}

// shrink the space the notif takes so the rest of the stack slides into place
export function collapse(el){
    let style = getComputedStyle(el)
    let height = el.offsetHeight // layout height (not scaled by a transform)

    return {
        keyframes: {
            height: [height+'px', '0px'],
            paddingTop: [style.paddingTop, '0px'],
            paddingBottom: [style.paddingBottom, '0px'],
        },
        timing: {duration: prefersReducedMotion() ? 0 : 220, easing: EASE, delay: prefersReducedMotion() ? 0 : 80}
    }
}

// replacing a notif with the same `nid`: morph the height and crossfade the content
export function morph(fromHeight, toHeight){
    if( prefersReducedMotion() )
        return {host: null, content: FADE_IN}

    return {
        host: {keyframes: {height: [fromHeight+'px', toHeight+'px']}, timing: {duration: 260, easing: EASE}},
        content: {keyframes: {opacity: [0, 1], transform: ['scale(.98)', 'none']}, timing: {duration: 220, easing: EASE}}
    }
}

export function play(el, anims){
    return anims.map(({keyframes, timing})=>el.animate(keyframes, {fill: 'both', ...timing}))
}

export function finished(anims){
    return Promise.allSettled(anims.map(a=>a.finished))
}
