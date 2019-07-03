

function updateTabInfo( _tabId, changeInfo, tab ) {
  // browser.storage.local.get({ active: {} },

  if (tab.audible) {
    browser.storage.local.get({ active: {} }, function (result) {
      currentlyPlaying = result.active || {};
      currentlyPlaying[tab.id] = tab;
      browser.storage.local.set({ active: currentlyPlaying }, function () { });
    });

    var blob = new Blob([tab.title], { type: "text/plain" });
    var url = URL.createObjectURL(blob);
    browser.downloads.download({
      url: url,
      filename: "open-smg.txt",
      conflictAction: "overwrite"
    }, function (_id) {
      browser.storage.local.get({ downloads: [] }, function (result) {
        console.log("waiting download entry %d", _id);
        currentDownloads = result.downloads;
        currentDownloads.push(_id);
        browser.storage.local.set({ downloads: currentDownloads });
      });
    });
  }
}

function updateDownloads(downloadDelta) {
  browser.storage.local.get(
    { downloads: [] },
    function (result) {
      currentDownloads = result.downloads;
      if (currentDownloads.includes(downloadDelta.id) &&
        downloadDelta.state &&
        (downloadDelta.state.current == "complete")) {
        console.log("erasing download entry %d", downloadDelta.id);
        browser.downloads.erase({ id: downloadDelta.id });

        currentDownloads = currentDownloads.filter(function (e) { return e !== downloadDelta.id });
        browser.storage.local.set({ downloads: currentDownloads });
      }
    }
  );
}

// subscriptions
browser.tabs.onUpdated.addListener(updateTabInfo);
browser.downloads.onChanged.addListener(updateDownloads);
