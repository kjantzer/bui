Notif
=======

A notification presenter inspired by [material snackbars](https://material-ui.com/components/snackbars/)
and [notistack](https://iamhosseindhv.com/notistack/demos#custom-snackbar)

```js
import Notif from 'bui/presenters/nofif'

new Notif({
    msg: 'A simple notifcation'
})

new Notif({
    type: 'info',
    msg: 'Here’s some info'
})

new Notif({
    icon: 'alert',
    color: 'red',
    animation: 'grow',
    msg: 'Something when wrong',
})
```