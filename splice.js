const splice_matcher = /^[a-z]*:\/\/s\+\/(.*)$/;
const traversal_matcher = /^[a-z]*:\/\/s\/(.*)$/;

var slices = {};

function splice(requestDetails) {
    browser.tabs.query({active: true, currentWindow: true})
        .then(tabs => {
            const key = splice_matcher.exec(requestDetails.url)[1];
            slices[key] = tabs[0].url;
        });

    return {
        cancel: true
    };
}

function traverse(requestDetails) {
    const key = traversal_matcher.exec(requestDetails.url)[1];

    return {
        redirectUrl: slices[key]
    };
}

browser.webRequest.onBeforeRequest.addListener(
    splice,
    {urls: ["*://s+/*"]},
    ["blocking"]
);

browser.webRequest.onBeforeRequest.addListener(
    traverse,
    {urls: ["*://s/*"]},
    ["blocking"]
);
