// Function to set up platform button event listeners
function setupPlatformButtons() {
    const pages = {
      'xbox': 'xbox.html',
      'playstation': 'playstation.html',
      'pc': 'pc.html',
      'nintendo-switch': 'switch.html'
    };
  
    Object.keys(pages).forEach(function (id) {
      var btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', function () {
          console.log("Navigating to " + pages[id]);
          window.location.href = pages[id];
        });
      } else {
        console.error("Button not found: " + id);
      }
    });
  }
  
  // Use Cordova's deviceready if available; otherwise use DOMContentLoaded
  function onDeviceReady() {
    setupPlatformButtons();
  }
  
  if (window.cordova) {
    document.addEventListener('deviceready', onDeviceReady, false);
  } else {
    document.addEventListener('DOMContentLoaded', onDeviceReady);
  }