$(document).ready(function() {
	$('aside > nav > ul > li').click(function() {
		var target = $("#" + $(this).children().attr('link'));
		$('html, body').animate({
			scrollTop : target.offset().top - 50
		}, 400);
	});
});
