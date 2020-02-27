/*
  // https://ux.shopify.com/improving-ui-with-web-audio-368bf674ccf7
  Safari seems to still use some deprecated method names. I only had issues with two of them — methods for both “starting” and “stopping” playback of a sound. I chose to take this approach:"
*/
const methodPatch = {
  start(source) {
    return (source.start) ? source.start : (startTime = 0) => source.noteOn(startTime);
  },
  stop(source) {
    return (source.stop) ? source.stop : (stopTime = 0) => source.noteOff(stopTime);
  },
};

export default methodPatch;