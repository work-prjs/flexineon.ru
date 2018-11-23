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


/*
     FILE ARCHIVED ON 05:35:51 Oct 28, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:33:24 Nov 14, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 190.809 (3)
  esindex: 0.007
  captures_list: 2546.987
  CDXLines.iter: 12.536 (3)
  PetaboxLoader3.datanode: 143.707 (4)
  exclusion.robots: 2338.509
  xauthn.chkprivs: 0.056
  exclusion.robots.policy: 2338.495
  RedisCDXSource: 1.639
  PetaboxLoader3.resolve: 118.801 (4)
  xauthn.identify: 2338.094
  load_resource: 122.498
*/