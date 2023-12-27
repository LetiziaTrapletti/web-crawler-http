const {JSDOM} = require('jsdom')

async function crawlPage(currentURL){
    console.log(`actively crawling: ${currentURL}`)
    try{
        const resp = await fetch(currentURL)

        if (resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return
        }

        const contentType = resp.headers.get("content-type")

        if(!contentType.includes("text/html")){
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
            return
        }

        console.log(await resp.text())
    } catch (err){
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`)
    }
}

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody) //jsdom takes html as a string and creates an in-memory object that mirrors the html
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements){
        if (linkElement.href.slice(0,1) === '/'){
            //relative
            try{
                const urlObj = new URL(`${baseURL}${linkElement.href}`) //if the url is invalid, the URl constructor will throw and error
            urls.push(`${baseURL}${linkElement.href}`)
            } catch(err){
                console.log(`error with relative url: ${err.message}`)
            }
        } else {
            //absolute
            try{
                const urlObj = new URL(linkElement.href) //if the url is invalid, the URl constructor will throw and error
                urls.push(linkElement.href)
            } catch(err){
                console.log(`error with absolute url: ${err.message}`)
            }
            
        } 
    }
    return urls
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}` //remove protocol
    if (hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0,-1) //remove last character if url ends in /
    } else return hostPath
}

//export the function, so i can import it in the crawl.test.js file
module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}