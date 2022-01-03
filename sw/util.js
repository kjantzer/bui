
export async function isClientFocused() {
    let client = await getClient()
    return client && client.focused
}

export function getClient({
    matchingURL=null
}={}){

    return clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    })
    .then((clients) => {

        if( matchingURL ){
            let url = matchingURL ? new URL(matchingURL, self.location.origin).href : matchingURL
            return clients.find(client=>client.url===url)
        }

        // must be "visible" to be focused
        return clients.find(client=>client.visibilityState=='visible') || clients[0]
    });
}