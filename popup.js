/*
 * Gets loaded with the extension popup, just sets a couple
 * button listeners.
 */

document.addEventListener('DOMContentLoaded', function() {
	var blockerButton = document.getElementById("submit");
	blockerButton.addEventListener('click', function() {
		var domain = document.getElementById('domain').value;
		chrome.storage.sync.get({"banned": []}, function(data) {
			console.log("adding: " + domain);
			console.log(data.banned);
			data.banned.push(domain);
			chrome.storage.sync.set({"banned":data.banned});
		});
	});

	 var viewAllButton = document.getElementById('viewAll');
	 viewAll.addEventListener('click', function() {
	 	window.open('viewAll.html');
	 });

	 var removeAll = document.getElementById('removeAll');
	 removeAll.addEventListener('click', function() {
	 	chrome.storage.sync.set({'banned': []});
	 });
});