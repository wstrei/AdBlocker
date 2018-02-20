/*
 * Loaded with the page provided with the extension to manage 
 * banned domains.
 */

// Remove any checked domain in table
var removeDomains = function() {
	var domainsTable = document.getElementById("domainsTable");
	var toRemove = [];
	for (var i=0, row; row = domainsTable.rows[i]; i++) {
		var checkBox = row.cells[0].getElementsByTagName("input")[0];
		if (checkBox && checkBox.checked) {
			// Add to list to remove 
			toRemove.push(i);
		}
	}

	// Remove any checked domains from storage
	chrome.storage.sync.get("banned", function(data) {
		for (var i=0; i < toRemove.length; i++) {

			// This looks weird, but it's because our list shrinks as we remove elements
			data.banned.splice(toRemove[i] - i, 1);
		}

		// Update banned domains
		chrome.storage.sync.set({"banned": data.banned}, populateTable(data.banned));
	});

};

// Populate our table with banned domains
var populateTable = function(bannedDomains) {
	// Clear the table first in case this is a secondary load
	var domainsTable = document.getElementById("domainsTable");
	domainsTable.innerHTML = '';

	// Create all rows
	for (var i=0; i < bannedDomains.length; i++) {
		var newRow = domainsTable.insertRow(-1);
		var cell1 = newRow.insertCell(0);
		cell1.innerHTML = "<input type=\"checkbox\">";

		var cell2 = newRow.insertCell(1);
		cell2.innerHTML = bannedDomains[i];
	}
};

// Set button listeners
var setListeners = function() {
	// Set event listener for remove button
	var removeButton = document.getElementById("removeSelected");
	removeButton.addEventListener("click", removeDomains);
};

// Run when DOM is loaded
window.onload = function() {
	setListeners();
	chrome.storage.sync.get({"banned": []}, function(data) {
		populateTable(data.banned);
	});	
};