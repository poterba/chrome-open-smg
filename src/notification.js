

function notify(changes, _namespace) {
  if (!changes.active)
    return;

  browser.storage.local.get( { notifications: false }, function (result) {
    if (result.notifications)
    {
      console.log(changes.active);
      for (var prop in changes.active.newValue)
      {
        var id = Math.floor(Math.random() * 9007199254740992) + 1;
        browser.notifications.create(
          id.toString(),
          {
            type: "basic",
            iconUrl: "/res/ico/128x128.png",
            title: "Open SMG",
            message: changes.active.newValue[prop].title
          }
        );
        break;
      }
    }
  });
}

function removeNotification(arg) {
  console.log(arg);
}

browser.storage.onChanged.addListener(notify);
browser.notifications.onClosed.addListener(removeNotification);
