import Quill from 'quill/core';
import Toolbar from 'quill/modules/toolbar';
import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import {AlignStyle} from 'quill/formats/align';
// import Header from 'quill/formats/header';
// import Blockquote from 'quill/formats/blockquote';
import List from 'quill/formats/list';

// custom modules
import './clipboard'
import './divider'
import {lineBreakMatcher, keyboardLinebreak} from './break'

Quill.register({
  'modules/toolbar': Toolbar,
  'formats/bold': Bold,
  'formats/italic': Italic,
  'formats/align': AlignStyle,
//   'formats/header': Header,
//   'formats/blockquote': Blockquote,
  'formats/list': List,
});

export {
    Quill,
    lineBreakMatcher,
    keyboardLinebreak
}