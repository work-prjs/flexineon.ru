jQuery(function() {

    /*---------------------Горизонтальная карусель-------------------------*/
    var i = 2, j = 2;
    jQuery('.accessories .next-img').click(function() {
        var length = jQuery(this).siblings('div').children('.horizontal-carusel-images').children('a').children('img').length;
        if (i < (length - 3)) {
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (i) + ')').hide();
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (i + 1) + '), img:eq(' + (i + 5) + ')')
                    .removeClass()
                    .toggleClass('rear');
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (i + 2) + '), img:eq(' + (i + 4) + ')')
                    .removeClass()
                    .toggleClass('middle');
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (i + 3) + ')')
                    .removeClass()
                    .toggleClass('front');
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (i + 5) + ')').show();
            i++;
        }
        ;
    });
    jQuery('.accessories .prev-img').click(function() {
        if (i > 0) {
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (i + 4) + ')').hide();
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (i - 1) + '), img:eq(' + (i + 3) + ')')
                    .removeClass()
                    .toggleClass('rear');
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (i) + '), img:eq(' + (i + 2) + ')')
                    .removeClass()
                    .toggleClass('middle');
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (i + 1) + ')')
                    .removeClass()
                    .toggleClass('front');
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (i - 1) + ')').show();
            i--;
        }
        ;
    });

    jQuery('.buying .next-img').click(function() {
        var length = jQuery(this).siblings('div').children('.horizontal-carusel-images').children('a').children('img').length;
        if (j < (length - 3)) {
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images ')
                    .children('a')
                    .children('img:eq(' + (j) + ')').hide();
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (j + 1) + '), img:eq(' + (j + 5) + ')')
                    .removeClass()
                    .toggleClass('rear');
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (j + 2) + '), img:eq(' + (j + 4) + ')')
                    .removeClass()
                    .toggleClass('middle');
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (j + 3) + ')')
                    .removeClass()
                    .toggleClass('front');
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (j + 5) + ')').show();
            j++;
        }
        ;
    });
    jQuery('.buying .prev-img').click(function() {
        if (j > 0) {
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (j + 4) + ')').hide();
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (j - 1) + '), img:eq(' + (j + 3) + ')')
                    .removeClass()
                    .toggleClass('rear');
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (j) + '), img:eq(' + (j + 2) + ')')
                    .removeClass()
                    .toggleClass('middle');
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (j + 1) + ')')
                    .removeClass()
                    .toggleClass('front');
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('a')
                    .children('img:eq(' + (j - 1) + ')').show();
            j--;
        }
        ;
    });
    /*--------------------------------------------------------------------*/

    /*-----------------------Вертикальная карусель-------------------*/
    var v = 1;
    jQuery('#carusel-down').click(function() {
        var length = jQuery(this).siblings('div').children('.horizontal-carusel-images').children('img').length;
        if (v < (length - 2)) {
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('img:eq(' + (v) + ')').removeClass().hide();
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('img:eq(' + (v + 1) + '), img:eq(' + (v + 3) + ')')
                    .removeClass()
                    .toggleClass('rear');
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('img:eq(' + (v + 2) + ')')
                    .removeClass()
                    .toggleClass('front');
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('img:eq(' + (v + 3) + ')').show();
            v++;
        }
        var imagePreview = jQuery(this).siblings('div').children('.horizontal-carusel-images').children('.front')
        var img = imagePreview.attr('big_src');
        jQuery('.product-img-prewiew a').attr('href', img);
        jQuery(imagePreview).click(function() {
            jQuery('.product-img-prewiew a img').attr('src',img);
        });
    });
    jQuery('#carusel-up').click(function() {
        if (v > 0) {
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('img:eq(' + (v + 2) + ')').removeClass().hide();
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('img:eq(' + (v - 1) + '), img:eq(' + (v + 1) + ')')
                    .removeClass()
                    .toggleClass('rear');
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('img:eq(' + (v) + ')')
                    .removeClass()
                    .toggleClass('front');
            jQuery(this).siblings('div')
                    .children('.horizontal-carusel-images')
                    .children('img:eq(' + (v - 1) + ')').show();
            v--;
        }
         var imagePreview = jQuery(this).siblings('div').children('.horizontal-carusel-images').children('.front')
        var img = imagePreview.attr('big_src');
        jQuery('.product-img-prewiew a').attr('href', img);
        jQuery(imagePreview).click(function() {
            jQuery('.product-img-prewiew a img').attr('src',img);
        });
        ;
    });
    /*--------------------------------------------------------------------*/



    var hint = '<div class="opt">Оптовые цены предоставляются при сумме заказа более <strong> 30 000 руб</strong></div>';

    jQuery('.hint-wrap').mouseenter(function() {
        jQuery(this).append(hint);
    });
    jQuery('.hint').mouseleave(function() {
        jQuery(this).parent().children('div').remove();
    });


    /*--------------------Смена вкладок таблицы-----------------*/

    jQuery('.features-nav').children('a').click(function() {
        var tab = ($(this).index());
        jQuery(this).siblings('a').removeClass();
        jQuery(this).addClass('features-nav-active');
        jQuery('.features-table').children().attr('class', 'hide')
        jQuery('.features-table').children().eq(tab).removeClass('hide').addClass('feat-' + (tab + 1));
    })
});


/*
     FILE ARCHIVED ON 06:56:02 Oct 28, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:33:25 Nov 14, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 81.423 (3)
  esindex: 0.006
  captures_list: 2473.073
  CDXLines.iter: 11.665 (3)
  PetaboxLoader3.datanode: 80.511 (4)
  exclusion.robots: 2375.545
  xauthn.chkprivs: 0.041
  exclusion.robots.policy: 2375.524
  RedisCDXSource: 0.824
  PetaboxLoader3.resolve: 20.004
  xauthn.identify: 2375.189
  load_resource: 52.211
*/