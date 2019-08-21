import Quill from 'quill/core'

const BlockEmbed = Quill.import('blots/block/embed');

// https://quilljs.com/guides/cloning-medium-with-parchment/#dividers
class DividerBlot extends BlockEmbed { }
DividerBlot.blotName = 'divider';
DividerBlot.tagName = 'hr';

Quill.register(DividerBlot);