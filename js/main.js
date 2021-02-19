$(document).ready(function () {

  // loader
  $(".loader").fadeOut("slow");

  $(".menu").on('click', function(event){
    if(!!$(event.target).attr('href')){
      var scrollTo = $($(event.target).attr('href')).offset().top;
      $('html, body').animate({
        scrollTop: scrollTo
      }, 1000);
    };
  });

  $("#current-year").html(new Date().getFullYear());
  
  var fixedMenu = false;
  $(window).on('scroll', function(){
    if((window.pageYOffset > 300) && !fixedMenu){
      $('.menu--fixed').addClass('fix');
      fixedMenu = true;
    } else if((window.pageYOffset < 300) && fixedMenu)
    {
      $('.menu--fixed').removeClass('fix');
      fixedMenu = false;
    }
  })

  function getValueByName(array, name){
    return array.find((item) => {
      return item.name === name;
    }).value;
  }

  $('#form').submit(function(){
    let $form = $('#form');
    let formData = $form.serializeArray();
    Email.send({
      SecureToken: "2b0f8f16-7719-438d-a6b8-aff72d368b79",
      To: 'mishadioxin@yandex.ru',
      From: "mishadioxin@yandex.ru",
      Subject : getValueByName(formData, 'subject'),
      Body : `
      <p>Имя: <strong>${getValueByName(formData, 'name')}</strong></p>
      <p>E-mail: <strong>${getValueByName(formData, 'email')}</strong></p>
      <p>Сообщение: <strong>${getValueByName(formData, 'message')}</strong></p>
      `
    }).then(
      alert("Message success sended!")
    );
  })

  //scroll animate
  $('.js-animate').viewportChecker({
    classToAdd: 'visible',
    offset: 100,
    repeat: false
  });
  //inputs
  $(".input-row label input").on('change', function(){
    if(!!$(this).val()){
      $(this).addClass('not-empty');
    } else
    {
      $(this).removeClass('not-empty');
    }
  })
  $(".input-row label textarea").on('change', function(){
    if(!!$(this).val()){
      $(this).addClass('not-empty');
    } else
    {
      $(this).removeClass('not-empty');
    }
  })

  function valid(form){
    var data = form.serializeArray();
    var success = true;
    data.forEach(function(item, index){
      if(item.name!="message")
        success = success && item.name != undefined && item.name != "" && item.value != undefined && item.value != ""
    })
    return success;
  }

  $("#submit").submit(function(e) {
    e.preventDefault();
    var form = $(this);
    //TODO: сделать модальными окнами, а не алертами
    if(valid(form)){
      $.ajax({
        url:"example.com",
        method: "POST",
        data: form.serialize(),
        success: function(response){
          alert("Your request has been sent. We will contact you shortly");
        },
        error: function(error){
          alert("Failed to send request. Try later");
        }
      })
    } else
    {
      alert("Please fill in the fields");
    }
  })

  $(".js-filter").on("click", "button", function(){
    let menu = $(this).parents(".filter-menu");
    menu.find("li").removeClass("active");
    $(this).parent().addClass("active");

    let selectedGenre = $(this).data("genre");
    let allItems = $("[data-genre-item]");
    let activeItems = allItems.filter("[data-genre-item="+selectedGenre+"]");
    let animationCompleteForAll = allItems.length;
    
    if(selectedGenre=="all"){
      allItems.fadeOut("fast", function(){
        animationCompleteForAll--;
        if(animationCompleteForAll==0){
          allItems.fadeIn("slow");
        }
      })
    } else {
      allItems.fadeOut("fast", function(){
        animationCompleteForAll--;
        if(animationCompleteForAll==0){
          activeItems.fadeIn("slow");
        }
      });
    }
  })

})

