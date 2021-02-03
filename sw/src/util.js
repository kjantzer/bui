
export function isClientFocused() {
    return clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    })
    .then((clients) => {
        return !!clients.find(client=>client.focused)
    });
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

        return clients.find(client=>client.focused) || clients[0]
    });
}