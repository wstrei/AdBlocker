/*
 * Runs when extension is first loaded, and creates the context menu item as well
 * as the function handler for the context menu item. 
 */

// Add domain to banned list stored in Chrome
var addToBannedDomains = function(info, tab) {
	chrome.storage.sync.get({"banned": []}, function(data) {
		var toBan = null;

		// If we have a frameUrl, use that
		if (info.frameUrl && info.frameUrl != "about:blank") {
			var hostname = gethostname(info.frameUrl);
			if (hostname) {
				toBan = hostname;
			}
		} else if (info.linkUrl) {
			// Otherwise, use the linkUrl
			var hostname = gethostname(info.linkUrl);
			if (hostname) {
				toBan = hostname;
			}
		}

		// If we found a hostname, add it
		if (toBan) {
			if (data.banned.indexOf(toBan) < 0) {
				data.banned.push(toBan);
				chrome.storage.sync.set({"banned":data.banned});
			}
		}
	});
}

// Little helper function to extract a hostname
var gethostname = function(url) {
	var match = url.match(':\\/\\/(.[^/:]+)');
	if (match.length > 1) {
		return match[1];
	}
	return null;
}

// Creates context menu item to block domain
var createMenuItem = function(details) {
	var menuProperties = {"id": "blockAd",
		"title": "Block ads from this source",
		"contexts": ["all"]};
	chrome.contextMenus.create(menuProperties);
	chrome.contextMenus.onClicked.addListener(addTpBannedDomains);
}

// Create context menu item when extension is first installed
chrome.runtime.onInstalled.addListener(createMenuItem);