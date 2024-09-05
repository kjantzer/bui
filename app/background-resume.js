/*
    # Background Resume

    ```js
    import 'bui/app/background-resume'

    window.addEventListener('background-resume', e=>{ do something })
    ```

    iOS devices (untested on Android) stop processing JS
    when backgrounded for a few seconds (10-20 in my testing)

    When the browser is reopended, safari resumes with the JS "state"
    intact but since time was essentially frozen, no updates (long poll)
    would have been made or received (websocket).

    It may be important to trigger a refresh of data when resuming 
    from the background; this script enables such a function

    How it works:
    Timers are one of the things that will be suspended in the background
    Because of this, we can determine we were backgrounded when 
    a timer stops working. The "lastFired" time should always be 500ms
    and when its not, it means the timer was suspended and then window is
    focused we will trigger a resume event
*/
import device from '../util/device'

const refreshRate = 500
const minTimePassed = refreshRate * 2

if( device.isMobile ){
    
    let lastFired = new Date().getTime();

    setInterval(()=>{

        let now = new Date().getTime();
        
        if(now - lastFired < minTimePassed){
            lastFired = now
        }

    }, refreshRate);

    window.addEventListener('focus', e=>{
        
        let now = new Date().getTime();

        // not enough time has passed, continue on
        if(now - lastFired < minTimePassed){
            lastFired = now
            return
        }

        // window was unfocused for long enough, dispatch a resume event
        window.dispatchEvent(new Event('background-resume'))

        lastFired = now
    })
}