/*
    # Network

    Simplified network connection data

    ```js
    import network from 'bui/util/network'

    network.online // true
    ```

    https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API

    > NOTE: only works on desktop chrome/edge and android
*/
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

if( connection ){

    connection.offline = connection.type == 'none'
    connection.online = !connection.offline

    connection.addEventListener('change', e=>{
        connection.offline = connection.type == 'none'
        connection.online = !connection.offline
    })
}

export default connection
export {connection}