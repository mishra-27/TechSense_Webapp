import $ from 'jquery'; 

$('.logo-image').on('click', function () {
    $(this).children().css({
      'z-index' : 1,
      'opacity': 1
    });
  $(this).children().trigger('play');
     
});

$('video').on('click', function () {
  console.log('a');
});