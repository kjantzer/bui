// NOT used, but kept in case. See https://www.mathsuniverse.com/pico
let ymodem = (() => {
    const path = { basename: (filePath) => filePath.split('/').pop() }
    let Buffer = {
      from: (arr) => new Uint8Array(arr), // .buffer ?
      alloc: (size, fill = 0) => {
        if (fill) {
          let arr = []
          for (let i = 0; i < size; i++) arr.push(fill)
          return new Uint8Array(arr)
        } else {
          return new Uint8Array(size)
        }
      },
      copy: (source, target, targetStart = 0, sourceStart = 0, sourceEnd = source.length) => {
        for (let i = 0; sourceStart + i < sourceEnd; i++) {
          target[targetStart + i] = source[sourceStart + i]
        }
      },
      write: (target, string, offset = 0) => {
        let buf = (new TextEncoder()).encode(string) // .buffer ?
        Buffer.copy(buf, target, offset)
      },
      writeUInt16BE: (target, value, offset = 0) => {
        target[offset] = ((value >> 8) & 0xff) // 1st 8bits
        target[offset+1] = value & 0xff // 2nd 8bits
      }
    }

    // from crc16xmodem.js
    let crc16 = (() => {
      const crc16xmodem = defineCrc('xmodem', function(buf, previous) {
        let crc = typeof previous !== 'undefined' ? ~~previous : 0x0;
        for (let index = 0; index < buf.length; index++) {
          const byte = buf[index];
          let code = (crc >>> 8) & 0xff;
          code ^= byte & 0xff;
          code ^= code >>> 4;
          crc = (crc << 8) & 0xffff;
          crc ^= code;
          code = (code << 5) & 0xffff;
          crc ^= code;
          code = (code << 7) & 0xffff;
          crc ^= code;
        }
        return crc;
      });
      function defineCrc (model, calc) {
        const fn = (buf, previous) => calc(buf, previous) >>> 0;
        fn.signed = calc;
        fn.unsigned = fn;
        fn.model = model;
        return fn;
      }
      return crc16xmodem
    })()

    const PACKET_SIZE = 1024;
    const STX = 0x02; // start 1K=1024byte data packet
    const EOT = 0x04; // end of transmission
    const ACK = 0x06; // acknowledgement
    const NAK = 0x15; // negative acknowledgement
    const CAN = 0x18; // 24 two in a row aborts transfer
    const CRC16 = 0x43; // 0d67 "C", request 16-bit CRC

     // Make file header payload from file path and size
    function makeFileHeader(filePath, fileSize) {
      var payload = Buffer.alloc(PACKET_SIZE, 0x00);
      var offset = 0;
      if (filePath) {
        var filename = filePath.split('/').pop();
        Buffer.write(payload, filename, offset);
        offset = filename.length + 1;
      }
      if (fileSize) {
        Buffer.write(payload, fileSize.toString() + " ", offset);
      }
      return payload;
    }

    // Split buffer into multiple smaller buffers of the given size
    function splitBuffer(buffer, size, fixedSize) {
      if (buffer.byteLength > size) {
        var array = [];
        var start = 0;
        var end = start + size - 1;
        while (start < buffer.byteLength) {
          if (end >= buffer.byteLength) {
            end = buffer.byteLength - 1;
          }
          var chunk = Buffer.alloc(fixedSize || end - start + 1, 0xff);
          Buffer.copy(buffer, chunk, 0, start, end + 1);
          array.push(chunk);
          start = start + size;
          end = start + size - 1;
        }
        return array;
      } else {
        var buf = Buffer.alloc(fixedSize || size, 0xff);
        Buffer.copy(buffer, buf, 0, 0, buffer.byteLength);
        return [buf];
      }
    }

    // Transfer a file to serial port using ymodem protocol
    async function transfer(filename, buffer, callback, progressCallback) {
      var queue = [];
      var totalBytes = 0;
      var writtenBytes = 0;
      var seq = 0;
      var session = false;
      var sending = false;
      var finished = false;

      // Send buffer to the Pico
      function sendBuffer(buffer) {
        var chunks = splitBuffer(buffer, 256);
        chunks.forEach(async (chunk) => {
          // console.log('OUT', chunk)
          // output.textContent += `\n\nOUT: \n${asciify(chunk)}`
          await writeToPico(chunk, 'buffer')
          // serial.drain((err) => err ? close() : false)
        });
      }

      // Send packet
      function sendPacket() {
        if (seq < queue.length) {
          // make a packet (3 for packet header, YModem.PACKET_SIZE for payload, 2 for crc16)
          var packet = Buffer.alloc(3 + PACKET_SIZE + 2);
          // header
          packet[0] = STX;
          packet[1] = seq;
          packet[2] = 0xff - packet[1];
          // payload
          var payload = queue[seq];
          Buffer.copy(payload, packet, 3)
          var crc = crc16(payload);
          Buffer.writeUInt16BE(packet, crc, packet.byteLength - 2);
          // send
          sendBuffer(packet);
        } else {
          // send EOT
          if (sending) sendBuffer(Buffer.from([EOT]));
        }
      }

      // Handler for data from Ymodem
      function handler (data) {
        for (var i = 0; i < data.byteLength; i++) {
          if (!finished) {
            var ch = data[i];
            if (ch === CRC16) {
              if (!sending) {
                sendPacket();
                sending = true;
              }
            } else if (ch === ACK) {
              if (!session) {
                close();
              }
              if (sending) {
                if (seq < queue.length) {
                  if (writtenBytes < totalBytes) {
                    writtenBytes = (seq + 1) * PACKET_SIZE;
                    if (writtenBytes > totalBytes) {
                      writtenBytes = totalBytes;
                    }
                    if (progressCallback) {
                      progressCallback({
                        writtenBytes: writtenBytes,
                        totalBytes: totalBytes,
                      });
                    }
                  }
                  seq++;
                  sendPacket();
                } else {
                  // send complete
                  if (session) {
                    // file sent successfully
                  }
                  sending = false;
                  session = false;
                  // send null header for end of session
                  var endsession = Buffer.alloc(PACKET_SIZE + 5, 0x00);
                  endsession[0] = STX;
                  endsession[1] = 0x00;
                  endsession[2] = 0xff;
                  sendBuffer(endsession);
                }
              }
            } else if (ch === NAK) {
              sendPacket();
            } else if (ch === CAN) {
              close();
            }
          }
        }
      }

      // Finish transmittion
      function close(err) {
        readHandler = null
        session = false;
        sending = false;
        if (!finished && callback) {
          if (err) {
            callback(err);
          } else {
            callback(null, {
              filePath: filename,
              totalBytes: totalBytes,
              writtenBytes: writtenBytes,
            });
          }
        }
        finished = true;
      }

      // Make file header payload
      totalBytes = buffer.byteLength;
      var headerPayload = makeFileHeader(filename, totalBytes);
      queue.push(headerPayload);

      // Make file data packets
      var payloads = splitBuffer(buffer, PACKET_SIZE, PACKET_SIZE);
      payloads.forEach((payload) => queue.push(payload));

      // Start to transfer
      session = true;

      // Listen to data coming from the Pico's ymodem implementation
      readHandler = handler
    }

    return { transfer }
  })()