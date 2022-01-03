import debounce from './debounce'

export default function throttle(fn, wait, {immediate=true}={}){
    return debounce(fn, wait, {maxWait: wait, immediate})
}

export {throttle, debounce}