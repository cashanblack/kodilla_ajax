/* v2 */
$(function () {
	var globResp;

	var url = 'https://restcountries.eu/rest/v1/name/';
	var $countriesList = $('#countries');

	$('#search').on('click', searchCountries);
	$('body').on('click', 'li', expandField); // hehe....

	function searchCountries() {

		$countriesList.empty();
		var countryName = $('#country-name').val();

		// sprawdzenie na długosć
		if (countryName.length < 2) {
			return alert("Prosze wpisac co najmniej 2 znaki w pole wyszukiwania");
			// znaczy tak ?
		} else {
			getCountriesList(countryName)
		}
	}

	// ajax'owe zapytanie do serwera
	function getCountriesList(countryName) {
		$.ajax({
			url: url + countryName,
			method: 'GET',
			success: function (resp) {
				showCountriesList(resp, countryName);
			},
			statusCode: {
				404: function () {
					$countriesList.empty();
					var $row = $('<li>').text('Brak danych');
					$countriesList.append($row);
				}
			}

		});
	}
	// filtrowanie i wyświetlanie listy państw
	function showCountriesList(resp, countryName) {
		$countriesList.empty();
		globResp = resp.filter(function (tableCell) {
				return reCheckName(tableCell.name, countryName)
			}).forEach(function (item, posInResp) {
				var $row = $('<li>').text(item.name).attr("pos", posInResp);
				$countriesList.append($row);
			})
			// faktycznie, możn akorzystać z 2-giego parametru.. umkneło...
			// chain'owanie - kurde strasznie źle mi się to czyta.
			// mówisz ze to standard i wypada to łaczyć ?

	}

	// refilrtacja nazw Państw aby zniwelowac byka mechanizmy serwerowego
	// można było wsdzić wprost w funkcje anonimowa, ale...
	function reCheckName(tableCellname, countryName) {
		return (tableCellname.toLowerCase()).indexOf((countryName.toLowerCase())) > -1;
	}

	// doładowywane i rozwijanie detali
	function expandField() {
		$("li .details").hide();

		if (!$(this).children(".details").length) {
			var $detailsInRow = $('<div>').addClass("details");
			$(this).append($detailsInRow);
			//
			if ($(this).attr("pos")) {
				$(this).children(".details").text("capital: " + globResp[$(this).attr("pos")].capital);

			}
		}

		$(this).children(".details").show();

	}
});

/*
// v.1 - bez filtrowani po nazwach , za to bez dynamicznego doładowywania
// detali, wszytsko jest zapakowane "odrazu"

$(function () {

var url = 'https://restcountries.eu/rest/v1/name/';
var $countriesList = $('#countries');

$('#search').on('click', searchCountries);
$('body').on('click', 'li', expandField); // hehe....

function searchCountries() {
var countryName = $('#country-name').val();
if (countryName.length < 3) {
alert("Prosze wpisac co najmniej 3 znaki w pole wyszukiwania");
return false
}
//
$.ajax({
url: url + countryName,
method: 'GET',
success: showCountriesList
});
}

function showCountriesList(resp) {
$countriesList.empty();
resp.forEach(function (item) {
var $row = $('<li>').text(item.name)
var $detailsInRow = $('<div>').text("capital: " + item.capital).addClass("details");
$row.append($detailsInRow);
$countriesList.append($row);
})
}

function expandField() {
$("li .details").hide();
$(this).children(".details").show();
}
});

*/
