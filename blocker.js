//keep an ongoing list of blacklist or whitelist until user clears list
chrome.tabs.onUpdated.addListener(async function () {
  console.log("TAB UPDATED");
  let { url } = await getCurrentTab();
  console.log(url);
});

function getInputValue() {
  // Selecting the input element and get its value
  var inputVal = document.getElementById("whitelist").value;
  let blacklist = inputVal.split("\n");
  return blacklist;
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

/* TODO: for each element in the array of urls, check if there is a currently open tab with a
matching url. If so, close that tab. Then, if a new tab is open, reference it to the
blacklist and close it if it is on there. Keep the URLs inputted in the textbox 
so the user can come back to it.*/

document.getElementById("Save").addEventListener("click", () => {
  const count = 0;
  getInputValue().forEach(async (site) => {
    const currentTab = (await getCurrentTab()).url;

    if (check.checked && currentTab.includes(site)) {
      // chrome.tabs.discard({
      //   tabIds: currentTab[count]
      // });

      chrome.tabs.create({
        url: "block.html"
      });

      // document.head.innerHTML = generateSTYLES();
      // document.body.innerHTML = generateHTML(site);
    }
    count++;
  });
});

// boolean white or black
// if white
// any website which is not this is not openable
// if black
// these websites are not allowed
