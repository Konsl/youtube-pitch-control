document.title = chrome.i18n.getMessage('name');
document.getElementById("heading").innerText = chrome.i18n.getMessage('name');
document.getElementById("toggle-text").innerText = chrome.i18n.getMessage('settingstext');

let disablePitchShifting = undefined;

function updateToggle() {
    const element = document.getElementById("toggle-disable-pitch-shifting");

    if (disablePitchShifting && !element.classList.contains('toggle-enabled'))
        element.classList.add('toggle-enabled');
    if (!disablePitchShifting && element.classList.contains('toggle-enabled'))
        element.classList.remove('toggle-enabled');
}

document
    .getElementById("toggle-disable-pitch-shifting")
    .addEventListener("click", (ev) => {
        disablePitchShifting = !disablePitchShifting;
        updateToggle();

        chrome.storage.sync.set({
            disablePitchShifting: disablePitchShifting
        });
    });

chrome.storage.sync.get(["disablePitchShifting"], (res) => {
    disablePitchShifting = res.disablePitchShifting;
    updateToggle();
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.disablePitchShifting !== undefined) {
        disablePitchShifting = changes.disablePitchShifting.newValue;
        updateToggle();
    }
});