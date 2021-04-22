# Changelog

## 2021-04-22
- Upgraded `lit-element` and `lit-html` to new `lit` [package](https://lit.dev)
- Upgraded `quill` package to support webpack 5

## 2021-02-26
- BREAKING: `realtime` code moved from `/server/realtime` to root `/realtime`

## 2021-02-23
- REMOVAL: notif `snackbar` element removed (now uses `b-dialog`). The snackbar element was only used internally. Notif syntax remains unchanged.

## 2020-12-14
- REMOVAL: `date-picker` element removed. Internally it was only used by `text-field` and has been completely replaced by `Datepicker`

## 2020-11-17
- BREAKING: icons no longer included by default. Must be registered or import `_all`

## 2020-11-16
- BREAKING: `--theme-color` renamed to `--theme-text`
- BREAKING: `--theme-color-accent` renamed to `--theme-text-accent`
- BREAKING: `--theme-rgb` renamed to `--theme-text-rgb`

## 2020-11-13
- BREAKING: import for `form-control` presenter renamed to `form`
- BREAKING: import for `form-handler.js` renamed to `handler.js`
- BREAKING: import for `form-control.js` renamed to `control.js`