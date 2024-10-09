# Comments

## Client

Allows for realtime comments to be added to any view/section. Comments are grouped under a "group" and "ID" for that group (`gid`)

### Setup

```js
import Comments from 'bui/components/comments'

// these are the defaults, change if neeed
Comments.API_ROOT = '/api'
Comments.User = window.User
Comments.extensions = [] // for things like "mentions"
Comments.avatarTag = 'avatar-element'
Comments.nameTag = 'name-tag-element' // defaults to avatar if not set
```

#### Mentions
If you want support for mentions, you need to do additional setup

```js
import {html} from 'lit'
import mentionPlugin, {MentionElement}  from 'bui/components/comments/mentions'

// create the custom "mention" element
customElements.define('mention-element', class extends MentionElement {

	static items(query){
        // example
		return Users.toJSON()
		.filter(user=>user.name.toLowerCase().startsWith(query.toLowerCase()))
		.slice(0, 5)
		.map(user=>{return {label: user.name, val: user.id}})
	}

    render(){return html`@${this.uname}`}
})

// then create and add the mention plugin as an extension
Comments.extensions = [mentionPlugin('mention-element')]
```

### Use

Here's an example for adding comments to a book record:

```html
<b-comments group="book" gid="4805"></b-comments>
```

#### Group
`group` should be the name of the table for which this comment parent model is in.

#### GID
`gid` (group ID) should be the unique ID of the parent model

#### Meta
Comments have additional "metadata" stored in the `meta` field. By default `location.pathname` is stored under `path` and any mentions under `mentions`

You can choose to add additional metadata by setting `.meta` (either an object or a function that returns an object is expected)

```html
<b-comments group="book" gid="4805" .meta=${{title: 'Only Yesterday'}}></b-comments>
```

#### `.renderMeta(model)`
Use this to render the extra data after the comment. Like the data in `model.get('meta')` or anything else you desire.

```html
<b-comments group="book" .model=${this.model} .renderMeta=${renderMeta}></b-comments>
```
```js
// "model" is a comment
function renderMeta(model){ return html`<b-text>${JSON.stringify(model.get('meta'))</b-text>`}
```

#### placeholderBtn
What should the "new comment" button show? Defaults to `Comment`

#### placeholder
What do show in an empty comment input. Defaults to `Write a comment`

#### limit
Defaults to 10. Change to limit how many comments are shown A "show all" button will be displayed when limit is reached

#### Model
You can give the comment a model and the `GID` and `Meta` will be set using that model. Note: `group` must still be set

- `gid` = model.id
- `meta` = model.commentMeta

```html
<b-comments group="book" .model=${this.model}></b-comments>
```

### File Attachments
Comments can support attaching files with the `.uploads` option. When writing a new comment, files can be dropped onto the input to attach. The file(s) will be uploaded when the comment is submitted.

```html
<b-comments 
	group="book" 
	.model=${this.model}
	.uploads=${true}
></b-comments>
```

> In the future, `.uploads` may support a hash of options such as `.uploads=${{accept:".pdf"}}`

### Styling

### Parts
- `write-comment`
- `comment`

Example:

```css
/* make comments look more like post it notes */
b-comment::part(comment) {
	background: yellow;
	padding: .5em;
	border-radius: 5px;
}
```

### Events

#### Will Take Action

- `new-comment`
- `show-menu` - right+click menu about to be shown
- `edit`
- `delete`
- `resolve` - when comment "resolved" is toggled
- `react` - when reactions is toggled

> See `helpers/lit/will-take-action` for usability

***

## Server

```js
const Comments = require(bui`components/comments/server/model`)

// add class to your API init
new API(app, [
	Comments
], {root: '/api'})
```

### Push Messages

Comments support a push msg hook for when new comments are added. By default, nothing happens. Add a `PushMsg` class to enable this feature.

```js
const Comments = require(bui`components/comments/server/model`)

Comments.PushMsg = class PushMsg {
	constructor(msgData){
		this.msgData = msgData
	}

	sendTo(mentions){
		// send msgData to each mention
	}
}
```

Whenever a new comment is added, the PushMsg class will be inoked as so:

```js
new PushMsg(msg).sendTo(mentions)
```

Alternatively, you can subclass the comments class to override the `sendPushMsg`

```js
or subclass with own logic
class MyComments extends Comments(){
	sendPushMsg(){
		let {comment_plain, meta} = this.attrs
		let {mentions} = meta
		/* implement own logic */
	}
}
```

### Files
Comments can support uploaded attachments. You can override the default upload location if desired:

```js
const Comments = require(bui`components/comments/server/model`)

Comments.FileOpts = {
	ASSETS_PATH: '/mnt/data', // default
	dirRoot: 'attachments' // default is ''
}
```

### Notes
- no permisions right now
    - anyone can edit an existing comment
    - anyone an delete
    - anyone can comment