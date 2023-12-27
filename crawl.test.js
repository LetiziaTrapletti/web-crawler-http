//jest recognizes test files from the .test.js so adopt this naming convention

const {normalizeURL, getURLsFromHTML} = require('./crawl.js') //this line imports functions from the crawl.js file
const {test, expect} = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected) //if they look equal to each other, Jest is going to log it as a passed test
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path' //it works even if we haven't added any logics, because the new URL constructor does it already because it knows that url are case insensitive
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/">
            Boot.dev Blog
        </a>
    </body>
</html>
`
    const inputsBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputsBaseURL)
    const expected = ["https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">
            Boot.dev Blog
        </a>
    </body>
</html>
`
    const inputsBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputsBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path1/">
            Boot.dev Blog Path One
        </a>
        <a href="/path2/">
            Boot.dev Blog Path Two
        </a>
    </body>
</html>
`
    const inputsBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputsBaseURL)
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="invalid">
            Invalid URL
        </a>
    </body>
</html>
`
    const inputsBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputsBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})


