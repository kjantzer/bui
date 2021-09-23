/*
    IdleDetector

    https://web.dev/idle-detection/
*/
let controller
let idleDetector

export function supported(){ return window.IdleDetector } 

export function userState(){ return idleDetector && idleDetector.userState }
export function screenState(){ return idleDetector && idleDetector.screenState }

// NOTE: make sure this is called from a user gesture action
export async function start({
    threshold=60 // seconds
}={}){

    if( !supported() || await IdleDetector.requestPermission() != 'granted' )
        return

    if( controller ) return

    try {
        controller = new AbortController();
        idleDetector = new IdleDetector();

        idleDetector.addEventListener('change', () => {
            window.dispatchEvent(new CustomEvent('idle-changed', {
                bubbles: true,
                composed: true,
                detail: idleDetector
            }))
        })

        await idleDetector.start({
            threshold: threshold * 1000,
            signal: controller.signal,
        })

    } catch (err) {
        // Deal with initialization errors like permission denied,
        // running outside of top-level frame, etc.
        // TODO: 
        console.error(err.name, err.message);
    }

}

export function stop(){
    controller&&controller.stop()
    controller = null
}

export default {start, stop, 
    get isStarted(){ return !!controller },
    get supported(){ return supported() },
    get userState(){ return userState()},
    get screenState(){ return screenState()}
}