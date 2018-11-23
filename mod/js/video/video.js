function play_video(id, url, width, height) {
	if (!width) width = "422";
	if (!height) height = "337";
    var flashvars = {st:"/media/uppod_style.txt",file:url};
	var params = {bgcolor:"#000000", allowFullScreen:"true",WMODE:"transparent", allowScriptAccess:"always"};
	var attributes = {id:id, name:id};
	swfobject.embedSWF("/media/uppod.swf", id, width, height, "10.0.0",false,flashvars, params,attributes);
}

function play_video_in_dialog(url, title) {
	var dialog = new Dialog({
        title:title,
        content:new Element('div',{id:'player'}),
        width:500,
        height:281,
        afterOpen:function(){
            var flashvars = {st:"/media/uppod_style.txt",file:url};
			var params = {bgcolor:"#000000", allowFullScreen:"true", WMODE:"transparent", allowScriptAccess:"always"};
			var attributes = {id:"player",name:"player"};
			swfobject.embedSWF("/media/uppod.swf", "player", "422", "337", "10.0.0",false,flashvars, params,attributes);
        }
	});
	dialog.open();
}

function get_video(id) {
	new Ajax.Request( '/videoAjaxHandler.php',
		{
			asynchronous: false,
			method: 'post',
			parameters: {id: id},
			onException: (function(obj, exc) {
				alert('getVideo error: ' + exc.number + "  "+exc.description);
			}).bind(this),
			onComplete: function(response) {
				  var json = response.responseText.evalJSON();
				  if (json.error) {
				  	alert(json.error); 
				  } else {
					  play_video('player',json.url);
				  		
				  		var a = new Element('A', {href:json.url_page});
				  		a.update(json.title);
				  		$('v_title').update(a);
						if ($('v_descr')) {
						    $('v_descr').update(json.description);
						    var a_next = new Element('A', {href:json.url_page});
						    a_next.update(new Element('IMG', {width:"82", height:"15", align:"bottom", src:"images/cht_40.png"}));
						    $('v_descr').insert(a_next);
						}
				  }
			  }
		}
	);
}

function get_video_page(type, category, page, limit) {
	var container = $(type+'-video');
	if (container) {
		new Ajax.Request( '/videoAjaxHandler.php',
				{
					asynchronous: false,
					method: 'post',
					parameters: {type: type, category_id: category, page: page, limit: limit},
					onException: (function(obj, exc) {
						alert('getVideoPage error: ' + exc.number + "  "+exc.description);
					}).bind(this),
					onComplete: function(response) {
						  var json = response.responseText.evalJSON();
						  if (json.error) {
						  	alert(json.error); 
						  } else {
							 if (json.videos) {
								 container.update();
								 for (i=0; i<json.videos.length; i++) {
									 var video = json.videos[i];
									 var mainDiv = new Element('DIV', {'class':'dop_video_item  c1'});
									 var dateDiv = new Element('DIV', {'class':'date'});
									 dateDiv.update(video.date_create);
									 mainDiv.update(dateDiv);
									 var imgDiv = new Element('DIV', {'class':'anons_block_off_img'});
									 if (video.preview) {
										 imgDiv.update(new Element('IMG', {src: video.preview, width: 104, height: 81}));
									 } else {
										 imgDiv.update(new Element('IMG', {src: '/img/no_preview.jpg', width: 104, height: 81}));
									 }
									 mainDiv.insert(imgDiv);
									 
									 var infoDiv = new Element('DIV', {'class':'info'});
									 var strong = new Element('STRONG');
									 var a = new Element('A', {onclick:'get_video('+video.id+');', href: '#player'});
									 a.update(video.title);
									 strong.update(a);
									 infoDiv.update(strong);
									 infoDiv.insert('<br /><img src="/img/view.png" class="view_icon">&nbsp;'+video.count_view);
									 mainDiv.insert(infoDiv);
									 
									 container.insert(mainDiv);
								 }
								 if (json.paginator) {
									 var paginator = $(type+'-video-paginator');
									 paginator.update();
									 paginator.insert(
										//new Element('DIV',{'class':'arr_left'}).update(
											new Element('DIV', 
											  {'class':'arr_left', onclick:(json.paginator.prev?'get_video_page("'+type+'", '+category+', '+json.paginator.prev+', '+limit+'); return false;':'')}).update('&nbsp;')
										//)
									 );
									 if (json.paginator.pages && json.paginator.pages.length>0) {
										var divPages = new Element('DIV',{'class':'pages'})
										 for (i=0; i<json.paginator.pages.length; i++) {
											 divPages.insert(
											  new Element('A',{
													href: '#', 
													onclick:'get_video_page("'+type+'", '+category+', '+json.paginator.pages[i].value+', '+limit+'); return false;',
													'class': (json.paginator.pages[i].current?'current':'')
											  }).update(json.paginator.pages[i].text)
											 );
											}
										 paginator.insert(divPages);
									 }
									 paginator.insert(
										//new Element('DIV',{'class':'arr_right'}).update(
											new Element('DIV', 
											  {'class':'arr_right', onclick:(json.paginator.next?'get_video_page("'+type+'", '+category+', '+json.paginator.next+', '+limit+'); return false;':'')}).update('&nbsp;')
										//)
									 );
								 }
							 }
						  }
					  }
				}
			);
	}
}