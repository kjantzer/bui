const APP_TITLE = document.title
const PATH_ROOT = location.pathname
const PATH_PREFIX = '#/'

// normalize path (always begin with `/#/`)
// TODO: allow for prefix to be set by developer
export const normalizePath = path =>{
    return path ? PATH_ROOT+PATH_PREFIX+path.replace(/^[#\/]+/, '') : path
}

export default {
    APP_TITLE,
    PATH_ROOT,
    PATH_PREFIX
}