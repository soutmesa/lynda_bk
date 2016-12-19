$(function(){
	$('body').on('click', '.faq-links', function(){
		var collapsed = $(this).find('i').hasClass('fa-plus-square-o');
		$('.faq-links').find('i').removeClass('fa-minus-square-o');
		$('.faq-links').find('i').addClass('fa-plus-square-o');
		if(collapsed){
			$(this).find('i').toggleClass('fa-plus-square-o fa-minus-square-o');
		}
	});
});