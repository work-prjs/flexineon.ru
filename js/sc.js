function At( SbStr, Pos)
{
	var i, i1, i91= SbStr.length;

	if( Pos== null)
	{
		Pos= 0;
	}

	if( i91< 1 || Pos== -1)
	{
		return -1;
	}

	for( ; ( Pos= this.indexOf( SbStr, Pos))!= -1; Pos++)
	{
		for( i= Pos, i1= 0;
			( i1< i91)&& ( this.charAt( i)== SbStr.charAt( i1));
			i++, i1++
		) ;

		if( i1== i91)
		{
			return Pos;
		}
	}

  return -1;
}

function PosAt( SbStr, Pos)
{
	var i= this.At( SbStr, Pos);

	if( i!= -1)
	{
		i+= SbStr.length;
	}

	return i;
}

String.prototype.At= At;
String.prototype.PosAt= PosAt;

function SaveOrderData( orderData)
{
	var D= new Date();

	if(navigator.appName == "Microsoft Internet Explorer")
	{
		D.setDate( D.getDate()+ 7);

		D= D.toGMTString();

		document.cookie= "orderData="+ orderData+ "; expires="+ D+";";
	}
	else
	{
		D.setTime(D.getTime() + (1000*60*60*24));

		D= D.toGMTString();;

		document.cookie= "orderData="+ escape(orderData)+ "; expires="+ D+";";
	}

}

function SetGoodQuantity( good_id, Quantity)
{
	var orderData= ReadOrderData();

	orderData= DeleteGood( orderData, good_id);

	if( Quantity> 0)
	{
		if( orderData.length== 0)
		{
			orderData+= ',';
		}

		orderData+= good_id+ ':'+ Quantity+ ',';

		if (document.all[ 'order_quantity'])
		{
			if(navigator.appName == "Microsoft Internet Explorer")
			{
				var order_Quantity=
				parseInt( document.all[ 'order_quantity'].innerHTML);

				if( isNaN( order_Quantity))
				{
					order_Quantity= 0;
				}

				document.all[ 'order_quantity'].innerHTML= order_Quantity+ Quantity;
			}
			else
			{
				var order_Quantity=
				parseInt( document.getElementById("order_quantity").innerHTML);

				if( isNaN( order_Quantity))
				{
					order_Quantity= 0;
				}

				document.getElementById("order_quantity").innerHTML= order_Quantity+ Quantity;
			}
		}
	}

	SaveOrderData( orderData);
}

function DeleteGood( orderData, good_id)
{
	var
		i, i1, tmp,
		lookingFor_Str= ','+ good_id+ ':'
		;

	if( ( i= orderData.At( lookingFor_Str))!= -1)
	{
		if( ( i1= orderData.At( ',', i+ 1))!= -1)
		{
			tmp= orderData.substring( 0, i)+ orderData.substring( i1);

			orderData= tmp;

			if (document.all[ 'order_quantity'])
			{
				if(navigator.appName == "Microsoft Internet Explorer")
				{
					var order_Quantity=
					parseInt( document.all[ 'order_quantity'].innerHTML);

					if( isNaN( order_Quantity))
					{
						order_Quantity= 0;
					}

					document.all[ 'order_quantity'].innerHTML=
					order_Quantity- GetGoodQuantity( good_id);
				}
				else
				{
					var order_Quantity=
					parseInt( document.getElementById("order_quantity").innerHTML);

					if( isNaN( order_Quantity))
					{
						order_Quantity= 0;
					}

					document.getElementById("order_quantity").innerHTML=
					order_Quantity- GetGoodQuantity( good_id);
				}
			}
		}
	}

	return orderData;
}

function ReadOrderData()
{
	var i, orderData= '';

	if(navigator.appName == "Microsoft Internet Explorer")
	{
		var  dc= document.cookie;

		if( ( i= dc.PosAt( "orderData="))!= -1)
		{
			var i1= dc.At( ";", i);

			if( i1!= -1)
			{
				orderData= dc.substring( i, i1);
			}
			else
			{
				orderData= dc.substring( i);
			}
		}
	}
	else
	{
		var content = document.cookie;
		var loc = content.indexOf("=");
		var results = content.substring(loc +1, content.length);
		orderData =  unescape(results);
	}

	return orderData;
}

function GetGoodQuantity( good_id)
{
	var orderData= ReadOrderData(),
		i, i1, Quantity= 0,
		lookingFor_Str= ','+ good_id+ ':'
		;

	if( ( i= orderData.PosAt( lookingFor_Str))!= -1)
	{
		if( ( i1= orderData.At( ',', i+ 1))!= -1)
		{
			Quantity= parseInt( orderData.substring( i, i1));

			if( isNaN( Quantity))
			{
				Quantity= 0;
			}
		}
	}

	return Quantity;
}

function GetAllGoodsQuantity()
{
	var orderData= ReadOrderData(),
		i, i1, Quantity= 0,
		lookingFor_Str= ':';

	for( ; ( i= orderData.PosAt( lookingFor_Str, i))!= -1; i= i1+ 1)
	{
		if( ( i1= orderData.At( ',', i+ 1))!= -1)
		{
			Quantity+= parseInt( orderData.substring( i, i1));
		}
		else
		{
			break;
		}
	}

	if( Quantity== 0)
	{
		return 'пусто';
	}

	return Quantity;
}

function parseSum( sm)
{
	var c, resultS= '';

	for( i= 0; i< sm.length; i++)
	{
		c= sm.charAt( i);

		if( c>= '0' && c<= '9')
		{
			resultS+= c;
		}

		if( c== ',')
		{
			resultS+= '.';
		}
	}

	return parseFloat( resultS);
}

function roundSum( sm)
{
	sm= ''+ Math.round( sm* 100);

	csm= sm.substring( 0, sm.length- 2);
	sm= ','+ sm.substring( sm.length- 2);

	for( cn3= 0, i= csm.length- 1; i>= 0; i--, cn3++)
	{
		if( cn3== 3)
		{
			sm= ' '+ sm;

			cn3= 0;
		}

		sm= csm.charAt( i)+ sm;
	}

	return sm;
}

function AddSum( sm, good_id, cost)
{
	Q= GetGoodQuantity( good_id);

	return parseFloat( sm)+ Q* cost;
}

function AddSumZ( sm, good_id, cost)
{
	Q= GetGoodQuantity( good_id);

	if (eval("typeof(QuantityPrices" + good_id + ")") != "undefined")
	{
		var aCost = getCosts(good_id, 0, Q, cost);
		cost = aCost[1];
	}

	return parseFloat( sm)+ Q* cost;
}

function getCosts(good_id, oldQ, col, cost, win)
{
	var aQPrice = eval("QuantityPrices"+ good_id);
	var oldCost = cost, newCost = cost;

	for(var i = 0, i9 = aQPrice.length; i < i9; i++)
	{
		if (oldQ >= aQPrice[i][0])
		{
			oldCost = aQPrice[i][1];
		}
		if (col >= aQPrice[i][0])
		{
			newCost = aQPrice[i][1];
		}
	}

	var aCost = new Array();
	aCost[0] = oldCost;
	aCost[1] = newCost;

	var da = document.all;
	if (win)
	{
		da = win.document.all;
	}

	if( da["price" + good_id])
	{
		da["price" + good_id].innerHTML = roundSum(newCost);
	}

	return aCost;
}

function AddToOrder( good_id, col, text_obj, cost, sum_obj, win)
{
	oldQ= GetGoodQuantity( good_id);
	var oldCost = cost;
	if (eval("typeof(QuantityPrices" + good_id + ")") != "undefined")
	{
		var aCost = getCosts(good_id, oldQ, col, cost, win);
		oldCost = aCost[0];
		cost = aCost[1];
	}

	col= parseInt( col);

	if( isNaN( col))
	{
		col= 0;
	}

	SetGoodQuantity( good_id, col);

	text_obj.value= col;

	if( sum_obj)
	{
		sum_obj.innerHTML= roundSum( col* cost);
	}

	if(navigator.appName == "Microsoft Internet Explorer")
	{
		var d= document.all;

		if( win)
		{
			d= win.document.all;
		}

		if( d.summa)
		{
			oldS= parseSum( d.summa.innerHTML);
			S = oldS- oldQ* oldCost+ col* cost;

			pc = disc_tab[1];

			for(var i=2; i< disc_tab.length-1; )
			{
				if(disc_tab[i] >0 && S >= disc_tab[i])
				{
					pc+= disc_tab[i+1];
					break;
				}
				i+=2;
			}

			d.discount.innerHTML=
			roundSum( S*pc*0.01);

			d.summa_disc.innerHTML=
			roundSum(S - S*pc*0.01);

			d.summa.innerHTML=
			roundSum( S);
		}
	}
	else if(navigator.appName == "Netscape")
	{
		var d_summa = document.getElementById("summa");
		var d_discount = document.getElementById("discount");
		var d_summa_disc = document.getElementById("summa_disc");

		if( d_summa)
		{
			oldS= parseSum( d_summa.innerHTML);

			S = oldS- oldQ* oldCost+ col* cost;

			pc = disc_tab[1];

			for(var i=2; i< disc_tab.length-1; )
			{
				if(disc_tab[i] >0 && S >= disc_tab[i])
				{
					pc+= disc_tab[i+1];
					break;
				}
				i+=2;
			}

			d_discount.innerHTML=
			roundSum( S*pc*0.01);

			d_summa_disc.innerHTML=
			roundSum(S - S*pc*0.01);

			d_summa.innerHTML=
			roundSum( S);
		}
	}
}


function openImageinWindow(im,w,h,table,imgtitle)
{
	var p= im.src.indexOf( '&');

	if( p== -1)
	{
		return;
	}

	if (!table)
		table = '';

	if (!imgtitle)
		imgtitle = '';

	var imurl= im.src.substring( 0, p)+'&width='+w+'&height='+h+'&tabname='+table+'&title='+imgtitle;

	window.open(
		imurl+ '&mode=nw','',
		'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,top='+((screen.height-h)>>1)+',left='+ ((screen.width-w)>>1)+',height='+h+',width='+w);

}

function cook_inTable(obj, id, str)
{
	str1 = new String(str);

	if(str1.substring(0,3) == 'chk')
	{
		document.cookie= str+id+"="+obj.status;
	}
	else
	{
		document.cookie= str+id+"="+obj.value;
	}
}

function discount_refresh(pc)
{
	S= parseSum( d.summa.innerHTML);

	d.discount.innerHTML=	roundSum( S*pc);
}

var isLoad;