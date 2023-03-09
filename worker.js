chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.scripting.executeScript(
        {
            target: {tabId: tabId, allFrames: true},
            func: replaceLabelsToLinks,
            args : [getAppId(tab.url)]
        },
    )
});

function replaceLabelsToLinks(appId) {
    let descriptors = document.querySelectorAll('.descriptor[style*=color]');

    descriptors.forEach(async (element, key) => {
        if (key === 0 ||  key === descriptors.length - 1) {
            return;
        }

        let temp = document.createElement('a');
        let skin = await LS.getItem(ACTIVE_SKIN_KEY);

        temp.innerText = element.innerText + ' ' + skin;
        temp.style.color = element.style.color;
        temp.setAttribute('href', await buildLink(appId, element.innerText, skin));

        element.innerHTML = '';
        element.append(temp);
    });
}

/**
 * @param {string} url
 * @returns {string}
 */
function getAppId(url) {
    const POSITION_APP_ID_IN_URL = 3;

    let temp = url.replace('https://', '');
    let urlComponents = temp.split('/');
    return urlComponents[POSITION_APP_ID_IN_URL];
}