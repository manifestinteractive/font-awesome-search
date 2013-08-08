$(function() {
	$.each(icons, function(index, value) {
		var aliases = '';
		$.each(value.aliases, function(alias_index, alias) {
			aliases += alias;
			if((alias_index + 1) < value.aliases.length)
			{
				aliases += ',';
			}
		});
		var html = '<li data-order="'+index+'" data-icon="'+value.label+'" data-aliases="'+aliases+'" data-code="'+value.code+'" data-category="'+value.category+'" data-release="'+value.release+'">' +
			'<i class="icon-'+value.label+'"></i>' +
			'<span>icon-'+value.label+'<\/span>' +
			'<\/li>';
		$('.icons').append(html);
	});

	$('body').keyup(navigate);
	$('#search').keyup(find_icons);
	$('#release').change(find_icons);
	$('#catagory').change(find_icons);
	$('#reset').click(reset);

	$( "#search" ).autocomplete({
		delay: 0,
		minLength: 2,
		source: icons,
		select: function(){
			setTimeout(find_icons, 100);

			setTimeout(function(){
				if($( "ul.icons li:visible" ).length === 1)
				{
					 $("ul.icons li:visible").trigger('click');
				}
			}, 300);
		}
	});

	$('ul.icons li').click(function(){
		render_details($(this).data());
	});
});

function reset()
{
	if(typeof window._gaq !== 'undefined')
	{
		_gaq.push(['_trackEvent', 'Icons', 'Reset']);
	}

	$('#search').val('');
	$('#catagory').val('');
	$('#release').val('');
	$("ul.icons li").show();
	$('ul.icons li').removeClass('active');
	$('.list').removeClass('detailed');
	$('.details').slideUp('fast');
	window.scrollTo(0, 0);
	$('#search').focus();
}

// Search for matching icons
function find_icons(evt)
{
	// Ignore moving around in input field with arrows
	if (typeof evt != 'undefined' && ( evt.keyCode == 27 || evt.keyCode == 37 || evt.keyCode == 38 || evt.keyCode == 39 || evt.keyCode == 40 ))
	{
		return false;
	}

	// Update GUI
	$('ul.icons li').removeClass('active');
	$('.list').removeClass('detailed');
	$('.details').slideUp('fast');

	// Fetch Search Terms
	var value = $('#search').val().toLowerCase();
	var category = $('#catagory').val();
	var release = $('#release').val();

	// Check if we have a search term only
	if(value !== '' && category === '' && release === '')
	{
		$("ul.icons li").hide();
		$("ul.icons li[data-icon*='"+value+"']").show();
		$("ul.icons li[data-aliases*='"+value+"']").show();
	}
	// Check if we have a search term with a category
	else if(value !== '' && category !== '' && release === '')
	{
		$("ul.icons li").hide();
		$("ul.icons li[data-icon*='"+value+"']").show();
		$("ul.icons li[data-aliases*='"+value+"']").show();
		$("ul.icons li:not([data-category='"+category+"'])").hide();
	}
	// Check if we have a search term with a release
	else if(value !== '' && category === '' && release !== '')
	{
		$("ul.icons li").hide();
		$("ul.icons li[data-icon*='"+value+"']").show();
		$("ul.icons li[data-aliases*='"+value+"']").show();
		$("ul.icons li:not([data-release='"+release+"'])").hide();
	}
	// Check if we have a search term with a category and release
	else if(value !== '' && category !== '' && release !== '')
	{
		$("ul.icons li").hide();
		$("ul.icons li[data-icon*='"+value+"']").show();
		$("ul.icons li[data-aliases*='"+value+"']").show();
		$("ul.icons li:not([data-category='"+category+"'])").hide();
		$("ul.icons li:not([data-release='"+release+"'])").hide();
	}
	else if(category !== '' && release !== '')
	{
		$("ul.icons li").hide();
		$("ul.icons li[data-category='"+category+"']").show();
		$("ul.icons li[data-release='"+release+"']").show();
		$("ul.icons li:not([data-category='"+category+"'])").hide();
		$("ul.icons li:not([data-release='"+release+"'])").hide();
	}
	else if(category !== '')
	{
		$("ul.icons li").hide();
		$("ul.icons li[data-category='"+category+"']").show();
	}
	else if(release !== '')
	{
		$("ul.icons li").hide();
		$("ul.icons li[data-release='"+release+"']").show();
	}
	else
	{
		$("ul.icons li").show();
	}

	// Check if the enter key was pressed, and if there was only one result
	if (typeof evt != 'undefined' && evt.keyCode == 13) {
		$('#search').autocomplete('close');

		if($( "ul.icons li:visible" ).length === 1)
		{
			 $("ul.icons li:visible").trigger('click');
		}
	}

	return false;
}

// Render Details when Icon is selected
function render_details(data)
{
	if(typeof window._gaq !== 'undefined')
	{
		_gaq.push(['_trackEvent', 'Icons', 'Clicked', data.icon]);
	}

	// Did the user click the icon that was already active
	if($("ul.icons li[data-icon='"+data.icon+"']").hasClass('active'))
	{
		$('.details').slideUp('fast');
		$('.list').removeClass('detailed');
		$('ul.icons li').removeClass('active');
	}
	// Activate the selected icon
	else
	{
		$('ul.icons li').removeClass('active');

		$("ul.icons li[data-icon='"+data.icon+"']").addClass('active');

		$('.details .name').html('<h1><a href="http://fortawesome.github.io/Font-Awesome/icon/'+data.icon+'/" target="_blank">icon-'+data.icon+'&nbsp;<i class="icon-external-link-sign"><\/i><\/a><\/h1>');

		if(data.aliases != '')
		{
			$('.details .name h1').append('<span class="aliases">( Aliases:&nbsp; '+data.aliases+' )</span>');
		}

		$('.details .info').html('<b>Unicode:</b> <pre><code class="xml">&amp;#x'+data.code+'<\/code><\/pre>&nbsp;&middot;&nbsp; <b>Created:</b> v'+data.release+' &nbsp;&middot;&nbsp; <b>Category:</b> '+data.category+'');
		$('.details .copy').html('<pre><code class="xml">&lt;i class="icon-'+data.icon+'">&lt;\/i> icon-'+data.icon+'<\/code><\/pre>');

		$('.details .demo i').remove();
		$('.details .demo').append('<i class="sample icon-'+data.icon+' size-4"><\/i>');
		$('.details .demo').append('<i class="sample icon-'+data.icon+' size-3"><\/i>');
		$('.details .demo').append('<i class="sample icon-'+data.icon+' size-2"><\/i>');
		$('.details .demo').append('<i class="sample icon-'+data.icon+' size-1"><\/i>');

		$('.details').slideDown('fast');

		$('.size-4').fadeIn('fast');
		setTimeout(function(){ $('.size-3').fadeIn('fast'); }, 100);
		setTimeout(function(){ $('.size-2').fadeIn('fast'); }, 200);
		setTimeout(function(){ $('.size-1').fadeIn('fast'); }, 300);

		$('.list').addClass('detailed');

		$('pre code').each(function(i, e) {hljs.highlightBlock(e)});
	}
}

// Listen for Key Presses on Body
function navigate(evt)
{
	var prev = null,
		next = null,
		escape = 27,
		left = 37,
		up = 38,
		right = 39,
		down = 40,
		active = $('ul.icons li.active'),
		tag = evt.target;

	// Exit if we're inside an input field
	if (tag == 'input' || tag == 'textarea')
	{
		return false;
	}

	// Check if nothing is selected and that we are using a known key
	if (active.length == 0 && ( evt.keyCode == left || evt.keyCode == up || evt.keyCode == right || evt.keyCode == down ))
	{
		$('ul.icons li:visible').first().trigger('click');

		if(typeof window._gaq !== 'undefined')
		{
			_gaq.push(['_trackEvent', 'Icons', 'Moved', 'Initialized']);
		}
	}
	// Something is selected so lets move around based on what key is pressed
	else
	{
		// Reset GUI
		if(evt.keyCode == escape)
		{
			reset();
		}
		// Jump one back at a time ( some might be hidden, so figure out which are visible )
		if(evt.keyCode == left)
		{
			prev = ($(active).prev(':visible').length >= 1) ? $(active).prev(':visible') : $(active).prevUntil(':visible').last().prev();
			prev.trigger('click');

			if(typeof window._gaq !== 'undefined')
			{
				_gaq.push(['_trackEvent', 'Icons', 'Moved', 'Left']);
			}
		}
		// Jump three back at a time ( some might be hidden, so figure out which are visible )
		else if(evt.keyCode == up)
		{
			prev1 = ($(active).prev(':visible').length >= 1) ? $(active).prev(':visible') : $(active).prevUntil(':visible').last().prev();
			prev2 = ($(prev1).prev(':visible').length >= 1) ? $(prev1).prev(':visible') : $(prev1).prevUntil(':visible').last().prev();
			prev3 = ($(prev2).prev(':visible').length >= 1) ? $(prev2).prev(':visible') : $(prev2).prevUntil(':visible').last().prev();
			prev3.trigger('click');

			if(typeof window._gaq !== 'undefined')
			{
				_gaq.push(['_trackEvent', 'Icons', 'Moved', 'Up']);
			}
		}
		// Jump one forward at a time ( some might be hidden, so figure out which are visible )
		else if(evt.keyCode == right)
		{
			next = ($(active).next(':visible').length >= 1) ? $(active).next(':visible') : $(active).nextUntil(':visible').last().next();
			next.trigger('click');

			if(typeof window._gaq !== 'undefined')
			{
				_gaq.push(['_trackEvent', 'Icons', 'Moved', 'Right']);
			}
		}
		// Jump three forward at a time ( some might be hidden, so figure out which are visible )
		else if(evt.keyCode == down)
		{
			next1 = ($(active).next(':visible').length >= 1) ? $(active).next(':visible') : $(active).nextUntil(':visible').last().next();
			next2 = ($(next1).next(':visible').length >= 1) ? $(next1).next(':visible') : $(next1).nextUntil(':visible').last().next();
			next3 = ($(next2).next(':visible').length >= 1) ? $(next2).next(':visible') : $(next2).nextUntil(':visible').last().next();
			next3.trigger('click');

			if(typeof window._gaq !== 'undefined')
			{
				_gaq.push(['_trackEvent', 'Icons', 'Moved', 'Down']);
			}
		}
	}
}
