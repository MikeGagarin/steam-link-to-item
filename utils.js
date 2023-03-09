const ACTIVE_SKIN_KEY = 'activeSkin';
const STEAM_ITEM_URL = 'https://steamcommunity.com/market/listings';
const STEAM_HOST = 'steamcommunity.com';

/**
 * Simulate localStorage
 * @type {{getItem: (function(string): Promise<string>), setItem: (function(string, string): void)}}
 */
const LS = {
    getItem: async key => (await chrome.storage.local.get(key))[key],
    setItem: (key, val) => chrome.storage.local.set({[key]: val})
};

/**
 * Sets options inside a select
 * @param {Element} select
 */
function setSelectOptionsByLang(select) {
    let stringOptions = '';
    select.innerHTML = '';

    LANG.forEach(([key, value]) => {
        stringOptions += "<option value='(" + value + ")'>" + value + "</option>";
    })

    select.innerHTML = stringOptions;
}

/**
 * @param {Element} select
 */
async function setActiveSkinToSelect(select) {
    let activeSkin = await LS.getItem(ACTIVE_SKIN_KEY);
    if (activeSkin) {
        select.value = activeSkin;
    }
}

/**
 * @param {string} url
 * @param {Array<string>} parameters
 * @returns {string}
 */
function addParametersToUrl(url, parameters) {
    parameters.forEach((parameter) => {
       url += '/' + parameter;
    });

    return url;
}

/**
 * @param {string} appId
 * @param {string} itemName
 * @returns {string}
 */
function buildLink(appId, itemName, skin) {
    let itemNameSkin = itemName + ' ' + skin;
    return addParametersToUrl(STEAM_ITEM_URL, [appId, itemNameSkin]);
}

