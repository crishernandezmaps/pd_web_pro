$(function(){
  ancho = window.innerWidth;
  if (ancho < 1023){
    //console.log('mobile')

    /******* Menu hamburguesa **********/

    //oculto desde el principio
    $('#menu_op').children('li').addClass('oculto');

    //al hacer click en la hamburguesa
    $('#hamburguesa').click(function(event){
      event.preventDefault();
      event.stopPropagation();
      //si el menu está oculto, mostrar
      if ($('#menu_op').children('li').hasClass('oculto')){
        $('#menu_op').children('li').removeClass('oculto').addClass('fadeInTop')
      } else { //sino, ocultar
        $('#menu_op').children('li').addClass('oculto');
      }

    }); //fin click

  }//fin mobile


});
