const splice_matcher = /^[a-z]*:\/\/s\+\/(.*)$/;
const traversal_matcher = /^[a-z]*:\/\/s\/(.*)$/;
const local_storage_key = 'splice::mapping';

var mapping = {};

window.onload = function() {
    chrome.storage.local.get(local_storage_key, (value) => {
        mapping = value;
    });
}

function splice(requestDetails) {
    browser.tabs.query({active: true, currentWindow: true})
        .then(tabs => {
            const key = splice_matcher.exec(requestDetails.url)[1];
            mapping[key] = tabs[0].url;

            chrome.storage.local.set({local_storage_key: mapping});
        });

    return {
        cancel: true
    };
}

function traverse(requestDetails) {
    const key = traversal_matcher.exec(requestDetails.url)[1];

    return {
        redirectUrl: mapping[key]
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
