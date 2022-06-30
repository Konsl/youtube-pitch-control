const storageAPI = (chrome && chrome.runtime) ? chrome.storage : browser.storage;

let disablePitchShifting = false;

storageAPI.sync.get(["disablePitchShifting"], (data) => {
    if (data.disablePitchShifting === undefined)
        storageAPI.sync.set({
            disablePitchShifting: false
        });
    else
        disablePitchShifting = data.disablePitchShifting;
});

storageAPI.onChanged.addListener((change) => {
    if (change.disablePitchShifting !== undefined)
        disablePitchShifting = change.disablePitchShifting.newValue;
});