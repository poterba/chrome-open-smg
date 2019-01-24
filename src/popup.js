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

  chrome.storage.local.get({ active: {} }, function (result) {

    console.log(result.active);
    for (itemId in result.active)
      addPlaying(result.active[itemId], itemId);
  });
}

chrome.storage.onChanged.addListener(
  function (changes, namespace) { updateCurrent(); }
);

window.onload = updateCurrent
