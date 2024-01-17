const check = document.getElementById("check");

check.addEventListener("click", () => {
  chrome.action.setBadgeText({ text: check.checked ? "on" : "off" });
});
