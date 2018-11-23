function submit_mailer_form(form) {
  var email = $('email').value;
  if (!email || !/^[_.0-9a-z-]+@([0-9a-z][0-9a-z_-]+.)+[a-z]{2,4}$/.test(email)) {
    alert("Не верно заполнено поле Email");
	  return false;
	}
  var city  = $('mailer_city_id');
  if (city) {
      if (!parseInt(city.options[city.selectedIndex].value)) {
          alert('Не выбран город');
          return false;
      }
  }
	$(form).request({
	    onComplete: function(transport) {
        if (200 == transport.status)
          alert(transport.responseText);
      }
	});
	return false;
	
}

function mailerGetCityList(region_id) {
		if (region_id>0) {
			new Ajax.Request('/cityAjaxHandler.php',{
				method: 'POST',
				parameters: {
		        	ajax: true,
		        	region_id: region_id
		        },
		        onException: (function(obj, exc) {
		        	window.alert('Ошибка выполнения скрипта!');
		        }).bind(this),
		        onComplete: (function(response) {
		          var result = response.responseText.evalJSON();
		          if (result.error) {
		          	alert(result.error);
		          } else if (result.options) {
		          	$('mailer_city_id').update('<option value="0">Выберите город</option>');
		          	$('mailer_city_id').insert(result.options);
		          	$('mailer_city_id').selectedIndex = 0;
		          } else {
		          	$('mailer_city_id').update('<option value="0">Выберите город</option>');
		          }
		        }).bind(this)
			});
		}
	}
