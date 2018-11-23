jQuery(function(){
	
jQuery('.icheck').mousedown(function() {
	if( jQuery(this).find('input').prop('disabled') == true ){
		return false;
	}
	changeCheck(jQuery(this));
});

jQuery('.icheck').each(function() {
	changeCheckStart(jQuery(this));
	if( jQuery(this).find('input').prop('disabled') == true ){
		jQuery(this).addClass('disabled')
		return false;
	}
});

function changeCheck(el){
 var el = el,
 input = el.find('input').eq(0);
 if(!input.attr('checked')) {
  el.addClass('checked');	
  input.attr('checked', true)
 } else {
  el.removeClass('checked');	
  input.attr('checked', false)
 }
 return true;
}

function changeCheckStart(el){
	var el = el,
	input = el.find('input').eq(0);
	if(input.attr('checked')) {
		el.addClass('checked');	
	}
	return true;
}	
		
});

