// Saves options to chrome.storage
function save() {
  var notifications = document.getElementById('notifications').value;
  chrome.storage.sync.set(
    { notifications: notifications },
    function () { }
  );
}

function restore() {
  chrome.storage.sync.get({ notifications: false },
    function (items) {
      document.getElementById('notifications').value = items.notifications;
      document.getElementById('notifications').addEventListener('click', save);
    }
  );
}

function getfolder(e) {
  var files = e.target.files;
  var path = files[0].webkitRelativePath;
  var Folder = path.split("/");
  alert(Folder[0]);
}

document.addEventListener('DOMContentLoaded', restore);
