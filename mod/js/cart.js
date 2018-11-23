function updateCartInfo(result) {
    var sum = $('trash_total_sum');
    if (sum)
        sum.update(result.summa);
    var count = $('trash_total_count');
    if (count)
        count.update(result.count);
    if (result.ajax_html) {
        var elAjaxHtml = $('ajax_html');
        if (elAjaxHtml)
            elAjaxHtml.update(result.ajax_html);
    }
    if (result.discount) {
        var elDiscount = $('current_discount');
        if (elDiscount)
            elDiscount.update(result.discount);
    }
    var yes = $('trash_block_yes');
    var no = $('trash_block_no');
    if (result.count > 0) {
        if (no)
            no.setStyle({
                display: 'none'
            });
        if (yes)
            yes.setStyle({
                display: 'block'
            });
    } else {
        if (yes)
            yes.setStyle({
                display: 'none'
            });
        if (no)
            no.setStyle({
                display: 'block'
            });
    }
}

function addIntoTrash(articleId) {
    var inputCount = $('countArticleTrash' + articleId);
    var count = 0;
    if (inputCount) {
        count = parseFloat(inputCount.value);
        if (count == 0) {
            alert('Не задано кол-во.');
            inputCount.pulsate({
                pulses: 5
            });
            return false;
        }
    }

    var other_field_array = new Array();
    $(document.body).select('select[article_id="' + articleId + '"]').each(function(el) {
        if (el.name.search("field_") != -1) {
            other_field_array.push({
                name: el.name.replace("field_", ""),
                value: el.options[el.selectedIndex].value,
                description: el.options[el.selectedIndex].innerHTML
            });
        }
    });
    var params = {
        article: articleId,
        count: count,
        other_field: other_field_array
    };
    if (inputCount)
        new Effect.Opacity(inputCount, {
            from: 1,
            to: 0
        });

    new Ajax.Request('/magazineAjaxHandler.php',
            {
                //asynchronous: false,
                method: 'post',
                parameters: {
                    args: Object.toJSON(params)
                },
                onException: (function(obj, exc) {
                    window.alert('Ошибка добавления в корзину: ' + exc.number + "  " + exc.description);
                }).bind(this),
                onComplete: (function(answer) {
                    if (200 == answer.status) {
                        if (inputCount)
                            new Effect.Opacity(inputCount, {
                                from: 0,
                                to: 1
                            });
                        var result = answer.responseText.evalJSON();
                        if (result.html) {
                            alert(result.html);
                            updateCartInfo(result);
                        } else if (result.error) {
                            alert(result.error);
                        } else {
                            alert('Unknown error');
                        }
                        //window.location.reload();
                    }
                }).bind(this)
            }
    );
}

function deleteCart(id) {
    var args = {
        module: 'cart',
        action: 'delete',
        id: id
    };
    jQuery.ajax({
        url: "/ajaxHandler.php",
        data: {args: Object.toJSON(args)},
        dataType: 'json',
        type: 'POST',
        success: function(res) {
            updateCartInfo(res);
        }
    });
}

function recountCart() {
	var counts = [];
	jQuery('input.cart_count').each(function(index, el) {
		counts.push({
			id: parseInt(el.id.replace('cnt_','')),
			count: el.value
		});	
	});
	var args = {
        module: 'cart',
        action: 'recount',
        data: counts
    };
	jQuery.ajax({
        url: "/ajaxHandler.php",
        data: {args: Object.toJSON(args)},
        dataType: 'json',
        type: 'POST',
        success: function(res) {
            updateCartInfo(res);
        }
    });
}

function addArticle(id) {
    var tr = $('trash_add_'+id);
    if (!tr) {
        tr = $('trash_'+id);
        if (!tr)
            return false;
    }
    var object = {};
    var color = tr.select('select[name=field_color]');
    if (color.length==1) {
        object.color = color[0].options[color[0].selectedIndex].value;
        object.color_text = color[0].options[color[0].selectedIndex].text;
    } else 
        object.color = null;
    var cup = tr.select('select[name=field_cup]');
    if (cup.length==1) {
        object.cup = cup[0].options[cup[0].selectedIndex].value;
        object.cup_text = cup[0].options[cup[0].selectedIndex].text;
    } else 
        object.cup = null;
                
    object.count_fields = [];
    var count_fields = tr.select("input[name=count_field[]]");
    var count = 0;
    if (count_fields.length>0) {
        count_fields.each(function(input){
            object.count_fields.push(input.value);
            if (input.value)
                count += parseInt(input.value);
        });
    }   
    if (count==0) {
        alert('Не задано кол-во');
        return false;
    }
    object.id = id;    
    object.action = 'addtrash';
    new Ajax.Request( '/magazineAjaxHandler.php',
    {
        //asynchronous: false,
        method: 'post',
        parameters: {
            args: Object.toJSON(object)
        },
        onException: (function(obj, exc) {
            window.alert('Ошибка добавления в корзину: ' + exc.number + "  "+exc.description);
        }).bind(this),
        onComplete: (function(answer) {
            if (200 == answer.status) {
                var result = answer.responseText.evalJSON();
                if (result.html) {
                    alert(result.html);
                    window.location.reload();
                } else if (result.error){
                    alert(result.error);
                }	else {
                    alert('Unknown error');
                }			      
            }
        }).bind(this)
    }
);
    return false;
}

function createCountEditor(id, field) {
    var params = {
        action: 'editCount',
        id: id,
        field: field
    }
    new Ajax.InPlaceEditor('editor_count_'+id+'_'+field,
    '/magazineAjaxHandler.php?args='+Object.toJSON(params),
    {
        cancelControl: 'button',
        highlightEndColor: '#E5EFFD'
    }
);
}

function update_cart_block(sum, count) {
    if (count) {
        if ($('trash_block_no')) $('trash_block_no').hide();
        if ($('trash_block_yes')) $('trash_block_yes').show();
        if ($('trash_total_count')) $('trash_total_count').update(count);
        if ($('trash_total_sum')) $('trash_total_sum').update(sum);
    } else {
        if ($('trash_block_yes')) $('trash_block_yes').hide();
        if ($('trash_block_no')) $('trash_block_no').show();
    }
}

function addHotelIntoTrash(args) {
    var params = {
        module: 'hotel',
        action: 'addToTrash',
        numbers: Object.toJSON(args)
    };
    new Ajax.Request('/ajaxHandler.php',
    {
        //asynchronous: false,
        method: 'post',
        parameters: {
            args: Object.toJSON(params)
        },
        onException: (function(obj, exc) {
            window.alert('Ошибка добавления в корзину: ' + exc.number + "  "+exc.description);
        }).bind(this),
        onComplete: (function(answer) {
            if (200 == answer.status) {
                var result = answer.responseText.evalJSON();
                if (result.html) {
                    alert(result.html);
                    update_cart_block(result.sum, result.count);
                } else if (result.error){
                    alert(result.error);
                }	else {
                    alert('Unknown error');
                }			      
            }
        }).bind(this)
    }
);
}

function addServiceIntoTrash(kindId) {
    var countEl = $('hotel_service_'+kindId+'_count');
    var dateEl = $('hotel_service_'+kindId+'_date');
    var count = 1;
    var date = null;
    if ((countEl!==undefined) && (countEl!==null)) {
        if (parseInt(countEl.value)) {
            count = countEl.value;
        }
    }
    if ((dateEl!==undefined) && (dateEl!==null)) {
            date = dateEl.value;
    }
    
    var params = {
        module: 'hotel',
        action: 'addToTrash',
        kind_id: kindId, 
        count: count,
        date: date
    };

    new Ajax.Request('/ajaxHandler.php',
    {
        //asynchronous: false,
        method: 'post',
        parameters: {
            args: Object.toJSON(params)
        },
        onException: (function(obj, exc) {
            window.alert('Ошибка добавления в корзину: ' + exc.number + "  "+exc.description);
        }).bind(this),
        onComplete: (function(answer) {
            if (200 == answer.status) {
                var result = answer.responseText.evalJSON();
                if (result.html) {
                    alert(result.html);
                    update_cart_block(result.sum, result.count);
                } else if (result.error){
                    alert(result.error);
                }	else {
                    alert('Unknown error');
                }			      
            }
        }).bind(this)
    }
);
}