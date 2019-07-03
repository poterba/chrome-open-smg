function reset()
{
  console.log( "reset options" );
  browser.storage.local.set( {
    notifications: false,
    active: {},
    downloads: []
  }, restore );
}

function restore()
{
  document.getElementById('reset').addEventListener('click', reset);

  browser.storage.local.get( { notifications: false }, function (items) {
      // load, or initial setup
      document.getElementById('notifications').checked = items.notifications;
      document.getElementById('notificationsLabel').innerHTML = browser.i18n.getMessage("optNotification");

      // bind to save
      document.getElementById('notifications').addEventListener('change', function(){
        browser.storage.local.set( { notifications: document.getElementById('notifications').checked } );
      });
    }
  );
}

document.addEventListener('DOMContentLoaded', restore);
