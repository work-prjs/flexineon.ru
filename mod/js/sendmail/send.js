function checkForm(theform) {
	var form_err = '';
	for (var i=0;i<theform.elements.length;i++) {
		theform.elements[i].disabled = 'true';
		if (theform.elements[i].getAttribute('required') != undefined && theform.elements[i].getAttribute('required') == 'true') {
			if (theform.elements[i].value == undefined || theform.elements[i].value == '') {
				//for "select" type elements
				if (theform.elements[i].length != undefined)
				{
					if (theform.elements[i].selectedIndex == undefined || theform.elements[i].options[theform.elements[i].selectedIndex] == undefined || theform.elements[i].options[theform.elements[i].selectedIndex].value == '' ) {
						form_err = form_err + '\n  -- ' + theform.elements[i].name;
					}
				}
				else form_err = form_err + '\n  -- ' + theform.elements[i].name;
			 }
		}
	}
	for (var i=0;i<theform.elements.length;i++) theform.elements[i].disabled = '';		
	
	if (form_err != '') {
		form_err = "Заполните поля:" + form_err;
		alert(form_err);
		return false;
	} else return true;
}
	
function ajaxSendMail(form_id) {
	if (!checkForm($(form_id))) return false;
	var formText = $(form_id).innerHTML;
	var action = $(form_id).action;
	var email = action.substring(action.lastIndexOf('/')+1,action.length);
	var fields = {};
	var kaptcha_str = '';
	var kaptcha = false;
	$A($(form_id).getElements()).map(Element.extend).each(
		function (el) {
			if (el.name) {
				if (el.name==(form_id+"keystring")) {
					kaptcha_str = el.value;
					kaptcha = true;
				} else {
					switch (el.nodeName) {
						case 'SELECT': 
							fields[el.name] = 	{	
													type: el.nodeName,
													subtype: el.nodeName,
													description: el.readAttribute('description'), 
													value: el.options[el.selectedIndex].value,
													text: el.options[el.selectedIndex].text
												};
							break;
						case 'TEXTAREA':
							fields[el.name] = 	{	
													type: el.nodeName,
													subtype: el.nodeName,
													description: el.readAttribute('description'), 
													value: el.value,
													text: el.value
												};
							break;
						case 'INPUT':
							var flag = false;
							switch (el.type) {
								case 'submit':
								case 'button':
								case 'reset':
									flag = true;
									break;
								case 'checkbox':
								case 'radio':
									flag = !el.checked;
									break;
								default:
									flag = false;
							}
							if (flag) break;
						default:
							fields[el.name] = 	{	
													type: el.nodeName,
													subtype: el.type,
													description: el.readAttribute('description'), 
													value: el.value,
													text: el.value
												};
					}
				}
			}			
		}
	);
	var params = {text: formText, form_email: email, field: fields, template: $(form_id).readAttribute('tmp'), form_id: form_id, kaptcha: kaptcha, kaptcha_str: kaptcha_str};
	$(form_id).update('<img src="/mod/js/sendmail/ajax-loader.gif" /><span>Ждите. Отправка формы...</span>');
	var ajax = new Ajax.Request( '/sendmail.php',
		{
			asynchronous: false,
			method: $(form_id).method,
			parameters: {args: Object.toJSON(params)},
			onException: function(obj, exc) {
				window.alert('SendMail error: ' + exc.number + "  "+exc.description);
			}.bind(this),
			onComplete: function(answer) {
				if (200 == answer.status) {
					if (Prototype.Browser.IE) {
						alert(answer.responseText);	
						window.location.reload();
					} else {
						$(form_id).update(formText);
						alert(answer.responseText);	
					}
				}
			}.bind(this)
		}
	);
	return false;
}