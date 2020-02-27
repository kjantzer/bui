export default function fetchAudioBuffer(path, context) {
  const audioRequest = new Request(path);

  return fetch(audioRequest).then((response) => {
    return response.arrayBuffer();
  }).then((arrayBuffer) => {
    return context.decodeAudioData(arrayBuffer);
  }).catch((error) => {
    throw Error(`Asset failed to load: ${error.message}`);
  });
}