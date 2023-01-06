export const SocialPlatforms = {
    instagram: 'https://www.instagram.com/',
    twitter: 'https://twitter.com/',
    facebook: 'https://www.facebook.com/',
    youtube: 'https://www.youtube.com/channel/',
    tiktok: 'https://www.tiktok.com/@'
}

export default function(platform, handle, {fallback=false, stripAtSign=true}={}){

    platform = String(platform).toLowerCase()

    let platformLink = SocialPlatforms[platform]

    if( handle.match(/^www/) )
        handle = '//'+handle

    if( handle.match(/^http/) )
        return handle

    // not all social platforms handle the @
    if( stripAtSign )
        handle = handle.replace(/^@/, '')

    if( !platformLink ) return fallback === false ? handle : fallback

    if( typeof platformLink == 'function' )
        return platformLink(handle)
    
    return platformLink+handle
}