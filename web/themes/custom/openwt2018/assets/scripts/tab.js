function openTab(evt, tab) {
  var i;
  var x = document.getElementsByClassName("tab-page");
  var y = document.getElementsByClassName("btn-active");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  tablinks = document.getElementsByClassName("w3-button");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" btn-active", "");
  }
  document.getElementById(tab).style.display = "block";
  evt.currentTarget.className += " btn-active";
}

function openApplication() {
  document.getElementById("defaultOpen").click();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
