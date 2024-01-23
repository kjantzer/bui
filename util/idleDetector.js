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

    // already started
    if( controller ) return

    if( !supported() || await IdleDetector.requestPermission() != 'granted' )
        return

    try {
        controller = new AbortController();
        idleDetector = new IdleDetector();

        let userState, screenState;

        idleDetector.addEventListener('change', () => {
            
            let changes = {}
            if( userState && userState != idleDetector.userState ) 
                changes.userState = idleDetector.userState
            if( screenState && screenState != idleDetector.screenState ) 
                changes.screenState = idleDetector.screenState
            
            window.dispatchEvent(new CustomEvent('idle-changed', {
                bubbles: true,
                composed: true,
                detail: changes
            }))

            userState = idleDetector.userState
            screenState = idleDetector.screenState
        })

        await idleDetector.start({
            threshold: threshold * 1000,
            signal: controller.signal,
        })

    } catch (err) {
        controller = null
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