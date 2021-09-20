window.load = (function() {
	var card = prompt("Enter card ID");
	cardID = card
	var code = prompt("Enter code needed");

	if (cardID && code) {
		try {
			getNemIDcode(cardID, code);
		} catch (e) {
			gotoNemId(cardID);
		}
	} else {
		gotoNemId(cardID);
	}
})();

function gotoNemId(cardID) {
	window.open(
		"https://appletk.danid.dk/developers/OtpCard?CardSerial=" + cardID,
		"_blank"
	);
}

function getNemIDcode(cardID, number) {
	var xhttp = new XMLHttpRequest();

	xhttp.responseType = document;

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.innerHTML = this.responseText;

			const parser = new DOMParser();
			const htmlDocument = parser.parseFromString(
				this.responseText,
				"text/html"
			);
			const tder = htmlDocument.documentElement.querySelectorAll("td");

			for (var i = 0; i <= tder.length; i++) {
				if (number === tder[i].innerHTML) {
					alert(tder[i + 1].innerHTML);
					break;
				}
			}
		}
	};

	xhttp.open(
		"GET",
		"https://otp-nemid.sdc.dk/simulator/listotpcards?serialnumber=" + cardID,
		true
	);
	xhttp.send();
}