function splice(requestDetails) {
    // TODO save mapping.

    return {
        cancel: true
    };
}

function traverse(requestDetails) {
    // TODO lookup mapping.

    return {
        redirectUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    };
}

browser.webRequest.onBeforeRequest.addListener(
    splice,
    {urls:["*://s+/*"]},
    ["blocking"]
);

browser.webRequest.onBeforeRequest.addListener(
    traverse,
    {urls:["*://s/*"]},
    ["blocking"]
);
