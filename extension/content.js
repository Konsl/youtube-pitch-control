const storageAPI = (chrome && chrome.runtime) ? chrome.storage : browser.storage;

function updateVideoAttributes(preservesPitch) {
    const videos = document.getElementsByTagName("video");
    console.log(`[Youtube Pitch Control] Found ${videos.length} video elements...${videos.length == 0 ? 'Retrying in 200 ms...' : ''}`);

    if (videos.length == 0) {
        setTimeout(updateVideoAttributes.bind(this, preservesPitch), 200);
        return;
    }

    for (const video of document.getElementsByTagName("video")) {
        if ("preservesPitch" in video)
            video.preservesPitch = preservesPitch;
        else if ("mozPreservesPitch" in video)
            video.mozPreservesPitch = preservesPitch;
        else {
            console.log("[Youtube Pitch Control] Error: preservesPitch is not supported (should have been detected by min version attribute in manifest)");
            return;
        }
    }
}

storageAPI.sync.get(["disablePitchShifting"], (res) => {
    updateVideoAttributes(!res.disablePitchShifting);
});

storageAPI.onChanged.addListener((changes) => {
    if (changes.disablePitchShifting !== undefined)
        updateVideoAttributes(!changes.disablePitchShifting.newValue);
});