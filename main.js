const select = document.getElementById('skin-select');

select.addEventListener('change', function() {
    LS.setItem(ACTIVE_SKIN_KEY, select.value);
    chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
        let currentTab = arrayOfTabs[0];

        if (!currentTab) {
            return;
        }

        let url = new URL(currentTab.url);

        if (url.host !== STEAM_HOST) {
            return;
        }

        chrome.tabs.reload(currentTab.id);
    });
});

setSelectOptionsByLang(select);
setActiveSkinToSelect(select);