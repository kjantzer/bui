
module.exports = async function createHash(input, length) {
  
  const encoder = new TextEncoder()
  const data = encoder.encode(input)

  // Create SHA-256 hash
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)

  // Convert ArrayBuffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')

  return length ? hashHex.slice(0, length) : hashHex
}