function getXmlHttpObject() {
    var XMLHttp = null;
    if(window.XMLHttpRequest) {
       try {
          XMLHttp = new XMLHttpRequest();
       } catch (e) {}
    } else if(window.ActiveXObject) {
       try {
          XMLHttp = new ActiveXObject("Msxml2.XMLHTTP");
       } catch (e) {
          try {
             XMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (e) {}
       }
    }
    return XMLHttp;
}

function StrDecode(str) {
    var ar1 = Array(" ","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�");
    var ar2 = Array("%20","%E0","%E1","%E2","%E3","%E4","%E5","%B8","%E6","%E7","%E8","%E9","%EA","%EB","%EC","%ED","%EE","%EF","%F0","%F1","%F2","%F3","%F4","%F5","%F6","%F7","%F8","%F9","%FA","%FB","%FC","%FD","%FE","%FF","%C0","%C1","%C2","%C3","%C4","%C5","%A8","%C6","%C7","%C8","%C9","%CA","%CB","%CC","%CD","%CE","%CF","%D0","%D1","%D2","%D3","%D4","%D5","%D6","%D7","%D8","%D9","%DA","%DB","%DC","%DD","%DE","%DF","%21","%22");
    buf1 = str;
    for(var k=0; k<ar2.length; k++){
        var i = buf1.indexOf(ar2[k]);
        while(i>-1){
            buf1 = buf1.replace(ar2[k], ar1[k]);
            i = buf1.indexOf(ar2[k],i);
        }
    }
    return buf1;
}

function getCart(str) {
    if(document.getElementById("ucart")) {
         str = StrDecode(str);
         if(str != "��� �������") {
            str += '<br><div style="margin-top:5px;"><a href="?clear_cart=true">��������</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="/order/"><b>�������� �����</b></a></div>';
            alert("��������� � �������");
         }
         document.getElementById("ucart").innerHTML = str;
    }
}
var xmlhttpobj = getXmlHttpObject();
function handlFunct() {
       if(xmlhttpobj.readyState == 4) {
             var rtxt = xmlhttpobj.responseText;
             if(rtxt.length > 0) {
                 //alert("");
                 getCart(rtxt);
             }
       }
}

function addGoods(g_id) {
    //if(xmlhttpobj) xmlhttpobj.abort();
    if(document.getElementById("g_count_"+g_id)) {
      count = parseInt(document.getElementById("g_count_"+g_id).value);
    } else count = 1;
    if(count>0 && count<=99999) {
    xmlhttpobj.open("GET","/mod/cart.php?action=add&g_id=" + g_id + "&count=" + count);
    xmlhttpobj.onreadystatechange = handlFunct;
    xmlhttpobj.send(null);
    //}
    }
}
