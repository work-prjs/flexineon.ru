function countPlus(el) {
	var input = Number(jQuery(el).prev('input[type="text"]').val());
			if(input == ""){
			jQuery(el).prev('input[type="text"]').val(1);
			return false;
		};
		jQuery(el).prev('input[type="text"]').val(input+1)
}

function countMinus(el) {
	var input = Number(jQuery(el).next('input[type="text"]').val());
			if(input == "" || input < 2){
			jQuery(el).next('input[type="text"]').val(1);
			return false;
		};
		jQuery(el).next('input[type="text"]').val(input-1)
}

jQuery(document).ready(function() {
	
	//placeholder
	jQuery('input[placeholder], textarea[placeholder]').placeholder();
	
	/* PIE */
	if (window.PIE) {
		jQuery('.item-preview, .sub-item-data').each(function() {
		PIE.attach(this);
		});
	}

	jQuery("#carousel").featureCarousel({
		
	});
    jQuery("#but_prev").click(function () {
          carousel.prev();
    });
    jQuery("#but_next").click(function () {
      carousel.next();
    });


	jQuery(".partners").jCarouselLite({
		hoverPause: true,
		speed: 1000,
		visible: 4,
		btnNext: ".next",
		btnPrev: ".prev",
		auto: 3000,
		mouseWheel: false
	});

	jQuery(".niceRadio").each(function(){     
		changeRadioStart($(this));     
	});

	jQuery("#slider").slider({
		min: 0,
		max: 50000,
		values: [0,50000],
		range: true,
		animate: 500,
		stop: function(event, ui) {
	        jQuery("input#minCost").val(jQuery("#slider").slider("values",0));
	        jQuery("input#maxCost").val(jQuery("#slider").slider("values",1));
	    },
	    slide: function(event, ui){
	        jQuery("input#minCost").val(jQuery("#slider").slider("values",0));
		    jQuery("input#maxCost").val(jQuery("#slider").slider("values",1));
	    }
	});

	jQuery("input#minCost").change(function(){

	    var value1=jQuery("input#minCost").val();
	    var value2=jQuery("input#maxCost").val();

    if(parseInt(value1) > parseInt(value2)){
        value1 = value2;
        jQuery("input#minCost").val(value1);
    }

    jQuery("#slider").slider("values",0,value1);  

	});

	jQuery("input#maxCost").change(function(){

	    var value1=jQuery("input#minCost").val();

	    var value2=jQuery("input#maxCost").val();

	    if (value2 > 50000) { value2 = 50000; jQuery("input#maxCost").val(50000)}

	 

	    if(parseInt(value1) > parseInt(value2)){

	        value2 = value1;

	        jQuery("input#maxCost").val(value2);

	    }

	    jQuery("#slider").slider("values",1,value2);

	});


	// фильтрация ввода в поля
	/*jQuery('input').keypress(function(event){
		var key, keyChar;
		if(!event) var event = window.event;
		
		if (event.keyCode) key = event.keyCode;
		else if(event.which) key = event.which;
		
		if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
		keyChar=String.fromCharCode(key);
		if(!/\d/.test(keyChar))	return false;
	
	});*/

	jQuery('#basket-btn').click(function(){
		jQuery('.basket-table').slideDown("slow");
		return false;
	});

    jQuery(document).click( function(event){
		if( jQuery(event.target).closest('.basket-table').length ) return;
		jQuery('.basket-table').slideUp("slow");
		event.stopPropagation();
    });

	jQuery('.hide-table').click(function(e){
		jQuery('.basket-table').slideUp("slow");
		return false;
	});
	
	jQuery('.count .plus').click(function(){
			countPlus(this);
	});

	jQuery('.count .minus').click(function(){
		countMinus(this);
	 });

	jQuery('.tabs .list .item').each(function(i){
		jQuery(this).click(function(){
			jQuery('.tabs .list .item').removeClass('active').eq(i).addClass('active');
			jQuery('.tabs .box .item').removeClass('active').eq(i).addClass('active');
		});
	});

});