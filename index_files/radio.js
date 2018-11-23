
function changeRadio(el)
{
	var el = el,
		input = el.find("input").eq(0);
	var nm=input.attr("name");		
	$(".niceRadio input").each(	
	function() {     
		if($(this).attr("name")==nm)
		{
			$(this).parent().removeClass("radioChecked");
		}
	});					  	
	if(el.attr("class").indexOf("niceRadioDisabled")==-1)
	{	
		el.addClass("radioChecked");
		input.attr("checked", true);
	}
    return true;
}

function changeVisualRadio(input)
{
	var wrapInput = input.parent();
	var nm=input.attr("name");		
	$(".niceRadio input").each(	
	function() {     
		if($(this).attr("name")==nm)
		{
			$(this).parent().removeClass("radioChecked");
		}  
	});
	if(input.attr("checked")) 
	{
		wrapInput.addClass("radioChecked");
	}
}

function changeRadioStart(el){
try{
var el = el,
	radioName = el.attr("name"),
	radioId = el.attr("id"),
	radioChecked = el.attr("checked"),
	radioDisabled = el.attr("disabled"),
	radioTab = el.attr("tabindex");
	radioValue = el.attr("value");
	if(radioChecked)
		el.after("<span class='niceRadio radioChecked'>"+
			"<input type='radio'"+
			"name='"+radioName+"'"+
			"id='"+radioId+"'"+
			"checked='"+radioChecked+"'"+
			"tabindex='"+radioTab+"'"+
            "value='"+radioValue+"' /></span>");
	else
		el.after("<span class='niceRadio'>"+
			"<input type='radio'"+
			"name='"+radioName+"'"+
			"id='"+radioId+"'"+
			"tabindex='"+radioTab+"'"+
	        "value='"+radioValue+"' /></span>");	
	if(radioDisabled)
	{
		el.next().addClass("niceRadioDisabled");
		el.next().find("input").eq(0).attr("disabled","disabled");
	}
	
	el.next().bind("mousedown", function(e) { changeRadio($(this)) });
	el.next().find("input").eq(0).bind("change", function(e) { changeVisualRadio($(this)) });
	if($.browser.msie)
	{
		el.next().find("input").eq(0).bind("click", function(e) { changeVisualRadio($(this)) });	
	}
	el.remove();
}
catch(e){	}
    return true;
}
/*
     FILE ARCHIVED ON 05:29:25 Oct 28, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:34:18 Nov 14, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 457.286 (3)
  esindex: 0.023
  captures_list: 679.661
  CDXLines.iter: 13.436 (3)
  PetaboxLoader3.datanode: 591.147 (4)
  exclusion.robots: 200.767
  xauthn.chkprivs: 0.064
  exclusion.robots.policy: 200.747
  RedisCDXSource: 3.931
  PetaboxLoader3.resolve: 86.114
  xauthn.identify: 200.282
  load_resource: 243.34
*/