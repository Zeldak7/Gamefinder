document.addEventListener("DOMContentLoaded", function() {
    var backButton = document.getElementById("back-button");
    if (backButton) {
      backButton.addEventListener("click", function() {
        window.location.href = "index.html";
      });
    }
  });