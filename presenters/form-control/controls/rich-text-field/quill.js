import Quill from 'quill/core';
import Toolbar from 'quill/modules/toolbar';
import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
// import Header from 'quill/formats/header';
// import Blockquote from 'quill/formats/blockquote';
import List, { ListItem } from 'quill/formats/list';

// custom modules
// import './clipboard'
import './divider'
import {lineBreakMatcher, keyboardLinebreak} from './break'

Quill.register({
  'modules/toolbar': Toolbar,
  'formats/bold': Bold,
  'formats/italic': Italic,
//   'formats/header': Header,
//   'formats/blockquote': Blockquote,
  'formats/list': List,
  'formats/list-item': ListItem,
});

export {
    Quill,
    lineBreakMatcher,
    keyboardLinebreak
}