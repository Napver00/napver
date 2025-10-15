(function ($) {
  "use strict";

  /*--------------------------
    Preloader
  ---------------------------*/
  $(window).on('load', function () {
    var pre_loader = $('#preloader');
    pre_loader.fadeOut('slow', function () { $(this).remove(); });

    // Start Nivo after images load to avoid flashes
    $('#ensign-nivoslider').nivoSlider({
      effect: 'random',
      slices: 15,
      boxCols: 12,
      boxRows: 8,
      animSpeed: 500,
      pauseTime: 5000,
      startSlide: 0,
      directionNav: true,
      controlNavThumbs: false,
      pauseOnHover: true,
      manualAdvance: false
    });
  });

  /*---------------------
    Sticky Header (bug fixed)
  ----------------------*/
  var s = $("#sticker");
  var lastKnownScroll = 0;
  $(window).on('scroll', function () {
    var st = $(this).scrollTop();
    lastKnownScroll = st;
    if (st > 300) { s.addClass("stick"); }
    else { s.removeClass("stick"); }
  });

  /*----------------------------
    Nav active state + collapse on click
  -----------------------------*/
  var main_menu = $(".main-menu ul.navbar-nav li");
  main_menu.on('click', function () {
    main_menu.removeClass("active");
    $(this).addClass("active");
  });

  $(".navbar-collapse a:not(.dropdown-toggle)").on('click', function () {
    $(".navbar-collapse.collapse").removeClass('in');
  });

  /*----------------------------
    WOW.js (reduced-motion aware)
  -----------------------------*/
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && typeof WOW === 'function') {
    new WOW().init();
  }

  /*----------------------------
    Scrollspy
  -----------------------------*/
  $('body').scrollspy({ target: '.navbar-collapse', offset: 80 });

  /*----------------------------
    Venobox
  -----------------------------*/
  $('.venobox').venobox();

  /*----------------------------
    Smooth page scroll
  -----------------------------*/
  $('a.page-scroll').on('click', function (event) {
    var $anchor = $(this);
    var target = $($anchor.attr('href'));
    if (target.length) {
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 55
      }, prefersReduced ? 0 : 800, 'easeInOutExpo');
      event.preventDefault();
    }
  });

  /*--------------------------
    Back to top
  ---------------------------*/
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, prefersReduced ? 0 : 800, 'easeInOutExpo');
  });

  /*----------------------------
    Parallax (skip if reduced)
  -----------------------------*/
  if (!prefersReduced) {
    $('.wellcome-area').parallax("50%", 0.4);
    $('.wellcome-text').parallax("50%", 0.6);
  }

  /*--------------------------
    Accordion active
  ---------------------------*/
  var panel_test = $('.panel-heading a');
  panel_test.on('click', function () {
    panel_test.removeClass('active');
    $(this).addClass('active');
  });

  /*---------------------
    Testimonial carousel
  ----------------------*/
  $('.testimonial-carousel').owlCarousel({
    loop: true, nav: false, dots: true, autoplay: true,
    responsive: { 0:{items:1}, 768:{items:1}, 1000:{items:1} }
  });

  /*----------------------------
    Isotope (portfolio)
  -----------------------------*/
  $(window).on("load", function () {
    var $container = $('.awesome-project-content');
    if ($container.length) {
      $container.isotope({
        filter: '*',
        animationOptions: { duration: 750, easing: 'linear', queue: false }
      });
      $('.project-menu li a').on("click", function () {
        $('.project-menu li a.active').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        $container.isotope({
          filter: selector,
          animationOptions: { duration: 750, easing: 'linear', queue: false }
        });
        return false;
      });
    }
  });

  /*---------------------
    Skill bars (animate once)
  ----------------------*/
  (function () {
    var animated = false;
    function animateSkills() {
      if (animated) return;
      document.querySelectorAll('.skill-fill').forEach(function (el) {
        var pct = el.getAttribute('data-percent') || 0;
        el.style.width = pct + '%';
      });
      animated = true;
      window.removeEventListener('scroll', onScroll, { passive: true });
    }
    function isInView() {
      var section = document.querySelector('.bw-skills');
      if (!section) return false;
      var rect = section.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.9;
    }
    function onScroll() { if (isInView()) animateSkills(); }
    if (isInView()) { animateSkills(); }
    else { window.addEventListener('scroll', onScroll, { passive: true }); }
  })();

})(jQuery);
