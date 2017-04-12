/* updatre ex1 - for info
var url = 'http://api.icndb.com/jokes/random';
var $button = $('#get-joke').on('click', function () {
getJoke();
});
var $paragraph = $('#joke');

getJoke();

function getJoke() {
$.ajax({
method: 'GET',
url: url,
success: function (res) {
$paragraph.text(res.value.joke);
}
});
}
 */
$(function () {
	/*** ***/
	var tweetLink = "https://twitter.com/intent/tweet?text=";
	var quoteUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&key=867576&format=jsonp&lang=en&jsonp=?";
	/*** ***/
	
	getQuote();
	$('.trigger').click(function () {
		getQuote();
	})

	/*** ***/
	function getQuote() {
		$.getJSON(quoteUrl, createTweet);
	}

	function createTweet(input) {
		if (!input.quoteAuthor.length) {
			input.quoteAuthor = "Unknown author";
		}
		var tweetText = "Quote of the day - " + input.quoteText + " Author: " + input.quoteAuthor;

		if (tweetText.length > 140) {
			getQuote();
		} else {
			var tweet = tweetLink + encodeURIComponent(tweetText);
			$('.quote').text(input.quoteText);
			$('.author').text("Author: " + input.quoteAuthor);
			$('.tweet').attr('href', tweet);
		}
	}
});
