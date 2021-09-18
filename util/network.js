/*
    https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API
*/
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

connection.offline = connection.type == 'none'
connection.online = !connection.offline

connection.addEventListener('change', e=>{
    connection.offline = connection.type == 'none'
    connection.online = !connection.offline
})

export default connection
export {connection}