//***********************************************
//Variables
var imagen;

var lastScrollTop = 0;
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

var footerTop = $('footer').offset().top;

var ancho = $(window).width();
//window.innerWidth;
console.log(ancho)

//***********************************************
//Funciones
function onScroll(event){
  var scrollPos = $(document).scrollTop() + 150;
  $('#menu_op li a').each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (refElement.position().top < scrollPos && refElement.position().top + refElement.height() > scrollPos) {
      $('#menu_op ul li a').removeClass("active");
      currLink.addClass("active");
    }
    else{
      currLink.removeClass("active");
    }
  });
}

function navVisible(){
  var windowTop = $(document).scrollTop();
  var windowBottom = windowTop + window.innerHeight;

  var st = window.pageYOffset || document.documentElement.scrollTop;
  //  if ((st < lastScrollTop) && ((footerTop - windowBottom)>0)){
    if((st < lastScrollTop) && ((footerTop - windowBottom + 100)>0)){
       //console.log('para abajo');
       navbar.classList.add("sticky");
       navbar.classList.add("fadeInTop");
     } else {
       //console.log('para arriba');
       navbar.classList.remove("sticky");
       navbar.classList.remove("fadeInTop");
       if (ancho < 1023){
         $('#menu_op').children('li').addClass('oculto')
       }
     };

     lastScrollTop = st;
     var opc = this.hash;

     //animar
     $('nav').animate({
       position: "toggle"
     }, 800, function(){
       //window.location.hash = opc;
     });

  };

function selecTopico(topico){
    //console.log(this)
    //cambiar color img
    $('.section__topics').children('img').removeClass('active')
    $(topico).children('img').addClass('active')

    //cambiar color texto
    $('.section__topics').children('h4').removeClass('active')
    $(topico).children('h4').addClass('active')

    //activar párrafo visible
    $('.section__topics').children('p').addClass('oculto')
    $(topico).children('p').removeClass('oculto').addClass('fadeInTop')

    if (ancho < 767){
      var copiarTexto = $(topico).children('p').text();

      $('#topicsMobile').text(copiarTexto);
    }
};
function servActivo(ese, pantalla){
  var textoSelec = $(ese).attr('id').substr(0, 2);
  //console.log(textoSelec)
  $(ese).siblings('circle').removeClass('active');
  $(ese).addClass('active')

  //titulo texto
  $('text.active').removeClass('active')
  $(ese).next('text').addClass('active')

  //cambiar texto
  //ocultar
  $('foreignObject p').addClass('oculto').removeClass('fadeInTop')

  //mostrar
  $(pantalla).children('foreignObject').children('#'+textoSelec).removeClass('oculto').addClass('fadeInTop')
  console.log(pantalla)
} //aquí iría qué pasa sin hover



//***********************************************
$(function(){

  //Sticky navbar
    window.onscroll = function() {navVisible()};
  //Menu: Clase active
    $('#menu_op').children('li').click(function(){
      $('.active').removeClass('active');
      $(this).children('a').addClass('active')
    });

  //Cambiar img coffe a blanco
  $('.btn-icono').hover(function(){
    $(this).children('img').attr('src', 'assets/img/iconos/coffe03_white.svg')
  }, function(){
    $(this).children('img').attr('src', 'assets/img/iconos/coffe03.svg')
  })
  //Scrolltop: Clase active
      $(document).on("scroll", onScroll);

  //Smooth scroll
      $('a').click(function(event){

      if (this.hash !== ""){
        event.preventDefault();

        var opc = this.hash;

        $('html, body').animate({
          scrollTop: $(opc).offset().top
        }, 1000, function(){
          window.location.hash = opc;
        })
      }
    });

  //About: Cambiar active
      $('.section__topics').hover(function(){
        var topico = this;
        selecTopico(topico);
      });
      $('.section__topics').click(function(){
      var topico = this;
      selecTopico(topico);
    });

  //About: intervalos timer
      setInterval(function () {
          var topicActive = $('.section__topics').children('.active');
          //posición del elemento activo
          var topicIndex = topicActive.parent().index();

          //cantidad de elementos en topics
          var turno = $('.section__topics').length;

          //evaluar si no se ha alcanzado el último elemento
          if (turno-1 > topicIndex){
            topicActive.parent().next('div').click()
          } else {
            $('.section__topics').first().click()
          }
        }, 3500);

  //Servicios: intervalos timer
    setInterval(function () {
        var servActive = $('circle.active');
        //posición del elemento activo
        var servIndex = servActive.index();

        //cantidad de elementos en servicios
        var totalServicios = $('.svg__servicios').children().length;


        //evaluar si no se ha alcanzado el último elemento
        //console.log(totalServicios/2, servIndex)
        if (totalServicios/2 > servIndex){
          servActive.next().next().next().click()
        } else {
          $('.svg__cadaServ').first('.svg__cadaServ').click()
        }
      }, 5000);

  //Servicios: active con hover y click
  var pantalla;
  if (ancho < 400){
      pantalla = '#svg_servMobile';
      $('#svg_servDesktop').addClass('oculto')
    } else{
      pantalla = '#svg_servDesktop';
      $('#svg_servMobile').addClass('oculto')
    }

      $(pantalla).children('.svg__cadaServ').hover(function(){
        var eso = this;
        servActivo(eso, pantalla)
        });
      $(pantalla).children('.svg__cadaServ').click(function(){
      var eso = this;
      servActivo(eso, pantalla)
      });


  //Team: Cambiar foto con :hover
      $('.pd_miembro').hover(function(){
            $( this ).children('figure').children('.pd_serio')
            .fadeOut(300);
          },function() { //función al quitar :hover
          $( this ).children('figure').children('.pd_serio')
          .fadeIn(600);
        }
      );

      $('[name="saberMas"]').click(function(){
        $('[href="#about"]').click()
        //alert('sip')
      })

//fin de todo
});
