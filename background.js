var activated = true;

// Ecoute le click sur l'icône de l'application
chrome.browserAction.onClicked.addListener(function(tab) {
	activated = !activated;
	if(activated)
		chrome.browserAction.setIcon({path:"default.png"});
	else
		chrome.browserAction.setIcon({path:"disabled.png"});
});

// Ecoute les messages envoyés depuis le script exécuté sur l'onglet
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	  sendResponse({activated: activated});
	}
);
