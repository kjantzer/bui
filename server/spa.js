// Single Page App

module.exports = class SPA {

	constructor(app, {path='/*', requireAuthentication=true, loginPath='/login', api}={}){
        let opts = arguments[1]

        app.get(path, async (req, res) => {
            
            if( requireAuthentication && !req.isAuthenticated() )
                return res.redirect(`${loginPath}?redirect=${req.url}`)

            if( opts.isAllowed?.(req, res) === false )
                return req.next()

            // check API classes for any "index hooks" (hook into the creation of the SPA index page)
            let spaIndexHookData
            let spaIndexHookClass = api && api._classes.find(Class=>{

                // found class with a hook...see if we should use it
                if( Class.spaIndexHook ){

                    // use custom tester
                    if( Class.spaIndexHookTest )
                        return spaIndexHookData = Class.spaIndexHookTest(req)
                    // else match on API root
                    else
                        return spaIndexHookData = req.path.match(new RegExp('^'+Class.api.root))
                }
            })

            let _opts = {...opts}

            // one of the API classes matched the requested index path, invoke the hook to modify the created index opts
            if( spaIndexHookClass ){
                await spaIndexHookClass.spaIndexHook(spaIndexHookData, _opts, req)
            }

            return res.send(html(_opts))
        })

    }

}

// TODO: social meta tag creation help
// https://ogp.me/
// https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup


function html({
    entryJS= '/index.js',
    title='My SPA',
    description='',
    pwaTitle='', // uses title if empty
    statusBarColor='black-translucent',
    manifest='/manifest.json',
    viewport='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, viewport-fit=cover, user-scalable=no',
    
    meta='',

    headBeforeEntryJS='', // aka, google analytics
    headAfterEntryJS='', // other JS to load after entryjs

    htmlAttrs='',
    bodyAttrs='',
    body='',

    appleIcon='',
    icons='', // TODO: improve this?

    // https://web.dev/learn/pwa/enhancements/#splash-screens
    // https://appsco.pe/developer/splash-screens
    splashscreen='',
}={}){ return /*html*/`

<!DOCTYPE html>
<html lang="en" ${htmlAttrs}>
<head>

    <meta charset="UTF-8">

    <!-- clearer text rendering -->
    <meta http-equiv="cleartype" content="on">

    <meta name="viewport" content="${viewport}">
    <meta name="MobileOptimized" content="width" />
    <meta name="HandheldFriendly" content="true">

    <title>${title}</title>
    <meta property="description" content="${description}">
    <meta property="og:site_name" content="${title}">

    ${meta}

    <meta name="theme-color" content="">
    <script>
        // keep the install app title bar from flickering when theme is not default color
        document.head.querySelector('meta[name="theme-color"]').content = localStorage.getItem('meta-theme-color')
    </script>

    <meta name="apple-mobile-web-app-title" content="${pwaTitle||title}" />
    <meta name="apple-mobile-web-app-status-bar-style" content="${statusBarColor}">
    
    <!-- should not use anymore: -->
    <!-- https://web.dev/learn/pwa/enhancements/#fullscreen-support -->
    <!--<meta name="apple-mobile-web-app-capable" content="yes" />-->
    
    <link rel="apple-touch-icon" href="${appleIcon}">
    ${icons}

    ${splashscreen}

    ${manifest?`<link rel="manifest" href="${manifest}">`:''}

    ${headBeforeEntryJS}
    <script src="${entryJS}"></script>
    ${headAfterEntryJS}
    
</head>
<body ${bodyAttrs}>

    ${body}

</body>
</html>
`}