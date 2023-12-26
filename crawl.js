function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}` //remove protocol
    if (hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0,-1) //remove last character if url ends in /
    } else return hostPath
}

//export the function, so i can import it in the crawl.test.js file
module.exports = {
    normalizeURL
}