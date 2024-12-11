/*
  # createHash

  ```js
  let hash = createHash('some string')
  let hash = createHash('some string', {type: 'SHA-256', length: 10})
  ```

  > See: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
*/
module.exports = async function createHash(input, {type='SHA-256', length}={}) {

  if( typeof input != 'string' )
    try{ input = JSON.stringify(input) }catch(err){}
  
  const encoder = new TextEncoder()
  const data = encoder.encode(input)

  // Create SHA-256 hash
  const hashBuffer = await crypto.subtle.digest(type, data)

  // Convert ArrayBuffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')

  return length ? hashHex.slice(0, length) : hashHex
}