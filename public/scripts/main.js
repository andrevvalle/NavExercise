$(document).ready(function() {
	var y = $(document).height();
	$('.overlay').css({
		height: y
	});

	$.getJSON(window.location.origin + "/api/nav.json", function(data) {

		$('#menu').append('<ul id="ul-nav"></ul>');

		var $ul = $('#ul-nav');
		getList(data.items, $ul);

		function getList(item, $list) {

			if ($.isArray(item)) {
				$.each(item, function(key, value) {
					getList(value, $list);
				});
				return;
			}
			if (item) {
				var $li = $('<li class="item" role="menuitem"></li>');
				if (item.url && item.label) {
					$li.append($('<a href="' + item.url + '" class="submenu-item">' + item.label + '</a>'));
				}
				if (item.items && item.items.length) {
					var $sublist = $("<ul class='submenu-ul'></ul>");
					getList(item.items, $sublist);
					$li.addClass('submenu');
					$li.append($sublist);
				}
				$list.append($li);
			}
		}

	});

	$('#toggle-menu').click(function(event) {
		event.preventDefault();
		$(this).toggleClass('open');
		$('.wrap-content').toggleClass('open');
		$('body').toggleClass('mobile-open');
		$('.overlay').fadeToggle();
	});

	AppHuge();
});

function AppHuge() {

	$(document).on('click', 'li.submenu', function() {
		var base = $(this).addClass('open');
		if (base.hasClass('open') === true) {
			CloseSub();
		}
		var ul = $(this).find('ul');
		if (!ul.is(':visible')) {
			ul.closest('li').addClass('open');
			$('.overlay').fadeIn();
			ul.slideDown();
		}
	});

	function CloseSub() {
		var base = $('nav ul li');
		if (base.hasClass('open') === true) {
			base.removeClass('open').find('ul').slideUp();

			if ($(window).width() > 768) {
				$('.overlay').fadeOut(10);
			}

		}
	}
}