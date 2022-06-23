export const SocialPlatforms = {
    instagram: 'https://www.instagram.com/',
    twitter: 'https://twitter.com/',
    facebook: 'https://www.facebook.com/',
    youtube: 'https://www.youtube.com/channel/',
    tiktok: 'https://www.tiktok.com/@'
}

export default function(platform, handle, {fallback=null}={}){

    platform = String(platform).toLowerCase()

    let platformLink = SocialPlatforms[platform]

    if( !platformLink ) return fallback

    if( typeof platformLink == 'function' )
        return platformLink(handle)
    
    return platformLink+handle
}