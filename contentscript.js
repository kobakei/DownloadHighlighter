/**
 * Content script
 * When it receives a request, it Highlights all <a> links in a page.
 */
chrome.extension.onRequest.addListener (
	function (request, sender, sendResponse) {

		var suffix1 = [".zip", ".tar", ".7z"];	// archives
		var suffix2 = [".exe", ".msi"];	// execytables

		// Is a link to archive file?
		var isArchive = function (href) {
			for (var i = 0; i < suffix1.length; i++) {
				if (href.indexOf(suffix1[i], href.length - suffix1[i].length) != -1) {
					return true;
				}
			}
			return false;
		}
		// Is a link to executable file?
		var isExecutable = function (href) {
			for (var i = 0; i < suffix2.length; i++) {
				if (href.indexOf(suffix2[i], href.length - suffix2[i].length) != -1) {
					return true;
				}
			}
			return false;
		}

		if (request.greeting == "highlight") {
			// colors
			var color1 = request.color1;
			var color2 = request.color2;
			var color3 = request.color3;
			
			// highlights all links
			console.log('[DownloadHighlighter] Highlight.');
			
			$("a").each(function () {
				var href = $(this).attr("href");
				if (href) {
					href = href.split("?")[0];
					//console.log(href);
					if (isArchive(href)) {
						if (color1 != "_") {
							$(this).css("color", "black");
							$(this).css("background-color", color1);
						}
					} else if (isExecutable(href)) {
						if (color2 != "_") {
							$(this).css("color", "black");
							$(this).css("background-color", color2);
						}
					} else {
						if (color3 != "_") {
							$(this).css("color", "black");
							$(this).css("background-color", color3);
						}
					}
				}
			});
			// returns response to background page
			sendResponse({farewall: 'goodbye'});
		} else {
			// error message
			console.log("null");
			sendResponse({});
		}
	}
);

