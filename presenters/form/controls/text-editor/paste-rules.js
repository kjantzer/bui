/*
    Based off of: https://github.com/ProseMirror/prosemirror-inputrules/blob/master/src/rules.js
*/
export const emDash = [/--/g, "—"]
export const ellipsis = [/\.\.\./g, "…"]
export const apostrophe = [/\b'\b/g, '’']
export const openDoubleQuote = [/(?:^|[\s\{\[\(\<'"\u2018\u201C])(")/g, '“']
export const closeDoubleQuote = [/(")(?:$|[\s\}\]\)\>'"\u2018\u201C])/g, '”']
export const openSingleQuote = [/(?:^|[\s\{\[\(\<'"\u2018\u201C])(')/g, '‘']
export const closeSingleQuote = [/(')(?:$|[\s\}\]\)\>'"\u2018\u201C])/g, '’']

export const smartQuotes = [openDoubleQuote, closeDoubleQuote, openSingleQuote, closeSingleQuote]