function addPlaying(tab, number) {
  if (!document.getElementById || !tab) {
    console.log(tab)
    return;
  }

  var button = document.createElement('button');
  button.setAttribute('class', "pure-button");
  button.onclick = function () {
    console.log(tab);
    chrome.tabs.update(tab.id, { active: true });
  }
  button.innerHTML = tab.title;

  var image = document.createElement('img');
  image.setAttribute('src', tab.favIconUrl);
  button.appendChild(image);

  var fieldset = document.getElementById('currently-playing');
  fieldset.appendChild(button);
}

function updateCurrent() {
  var fieldset = document.getElementById('currently-playing');
  fieldset.innerHTML = '';
  console.log('clear');

  chrome.storage.local.get({cp: {}}, function (result) {

    console.log( result.cp );
    for (itemId in result.cp)
      addPlaying( result.cp[itemId], itemId );
  });
}

// function errorHandler(e) {
//   var msg = '';

//   switch (e.code) {
//     case FileError.QUOTA_EXCEEDED_ERR:
//       msg = 'QUOTA_EXCEEDED_ERR';
//       break;
//     case FileError.NOT_FOUND_ERR:
//       msg = 'NOT_FOUND_ERR';
//       break;
//     case FileError.SECURITY_ERR:
//       msg = 'SECURITY_ERR';
//       break;
//     case FileError.INVALID_MODIFICATION_ERR:
//       msg = 'INVALID_MODIFICATION_ERR';
//       break;
//     case FileError.INVALID_STATE_ERR:
//       msg = 'INVALID_STATE_ERR';
//       break;
//     default:
//       msg = 'Unknown Error';
//       break;
//   };

//   console.log('Error: ' + msg);
// }

// function onInitFs(fs) {

//   fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {

//     // fileEntry.isFile === true
//     // fileEntry.name == 'log.txt'
//     // fileEntry.fullPath == '/log.txt'

//   }, errorHandler);

// }

chrome.storage.onChanged.addListener(
  function (changes, namespace) { updateCurrent(); }
);

// window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
window.onload = updateCurrent
