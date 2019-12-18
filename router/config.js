
const config = {
    APP_TITLE: document.title,
    PATH_ROOT: location.pathname,
    PATH_PREFIX: '',
    clearInvalidPath: true
}

export default config

// normalize path (always begin with prefix and path root)
export const normalizePath = path =>{
    return path ? config.PATH_ROOT+config.PATH_PREFIX+cleansePath(path) : path
}

export const cleansePath = path =>{
    return path.replace(new RegExp(`^(${config.PATH_ROOT})?(${config.PATH_PREFIX})?`), '')
}

