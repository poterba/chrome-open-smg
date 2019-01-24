

function updateTabInfo( _tabId, changeInfo, tab ) {
  // chrome.storage.local.get({ active: {} },

  if (tab.audible) {
    chrome.storage.local.get({ active: {} }, function (result) {
      currentlyPlaying = result.active || {};
      currentlyPlaying[tab.id] = tab;
      chrome.storage.local.set({ active: currentlyPlaying }, function () { });
    });

    var blob = new Blob([tab.title], { type: "text/plain" });
    var url = URL.createObjectURL(blob);
    chrome.downloads.download({
      url: url,
      filename: "open-smg.txt",
      conflictAction: "overwrite"
    }, function (_id) {
      chrome.storage.local.get({ downloads: [] }, function (result) {
        console.log("waiting download entry %d", _id);
        currentDownloads = result.downloads;
        currentDownloads.push(_id);
        chrome.storage.local.set({ downloads: currentDownloads });
      });
    });
  }
}

function updateDownloads(downloadDelta) {
  chrome.storage.local.get(
    { downloads: [] },
    function (result) {
      currentDownloads = result.downloads;
      if (currentDownloads.includes(downloadDelta.id) &&
        downloadDelta.state &&
        (downloadDelta.state.current == "complete")) {
        console.log("erasing download entry %d", downloadDelta.id);
        chrome.downloads.erase({ id: downloadDelta.id });

        currentDownloads = currentDownloads.filter(function (e) { return e !== downloadDelta.id });
        chrome.storage.local.set({ downloads: currentDownloads });
      }
    }
  );
}

// subscriptions
chrome.tabs.onUpdated.addListener(updateTabInfo);
chrome.downloads.onChanged.addListener(updateDownloads);