import methodPatch from './method-patch';

export default class MobileAudioFix {
  constructor(context) {
    this.context = context;
    this.source = this.context.createBufferSource();
    // now fill that buffer with an extremely brief and silent sound
    this.source.buffer = this.context.createBuffer(1, 1, 22050);
    // and connect it to the context destination (audio output speakers)
    this.source.connect(this.context.destination);

    this._startSource = this._startSource.bind(this);
  }

  init() {
    this._patchSourceMethods();
    // register the user initiated "silent sound"
    window.addEventListener('touchstart', this._startSource);
  }

  isUnlocked() {
    const hasStarted = (this.source.playbackState === this.source.PLAYING_STATE);
    const hasFinished = (this.source.playbackState === this.source.FINISHED_STATE);

    return (hasStarted || hasFinished);
  }

  _startSource() {
    this.source.start();

    // wait a single frame before removing the event listener
    setTimeout(() => {
      window.removeEventListener('touchstart', this._startSource);
    }, 60);
  }

  _patchSourceMethods() {
    this.source.start = methodPatch.start(this.source);
  }
}