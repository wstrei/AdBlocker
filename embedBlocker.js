/* 
 * Gets embedded in all new HTML pages, and removes domains matching those stored
 * in Chrome.
 */
var removeDomains = function() {
	// Fetch all banned domains
	chrome.storage.sync.get({'banned':[]}, function(data) {
		for (var i=0; i < data.banned.length; i++) {
			bannedDomain = data.banned[i];

			// Look for frames with banned domains
			var $frameElem = $("iframe[src*='" + bannedDomain + "']");
			console.log($frameElem)
			$frameElem.remove();

			// Look for any anchors with banned domains
			var $aElem = $("a[href*='" + bannedDomain + "']");
			console.log($aElem);
			$aElem.remove();

			// This is used in case an iframe is dynamically loaded. 
			// This will load in the iframe, and empty it.
			if (document.URL.includes(bannedDomain)) {
				document.all[0].innerHTML = '';
			}
		}
	});
};

$(window).on('load', removeDomains);