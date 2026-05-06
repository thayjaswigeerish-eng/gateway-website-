/* =====================================================
   GATEWAY 2026 – main.js
   Shared JavaScript used across all pages
   =====================================================
   HOW THIS FILE WORKS:
   jQuery is used for 3 main things:
   1. Smooth scrolling (index page)
   2. Day tab switching (schedule page)
   3. Fee display + form validation (register page)
   ===================================================== */

/* =====================================================
   Run everything only after the page has fully loaded
===================================================== */
$(document).ready(function () {

  /* ---------------------------------------------------
     FEATURE 1 – SMOOTH SCROLL
     When a nav link (href="#something") is clicked,
     the page scrolls smoothly instead of jumping.
     Only works on pages that have those anchor IDs.
  --------------------------------------------------- */
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this).attr('href');
    if ($(target).length) {          // only if that ID exists on this page
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $(target).offset().top - 70    // 70px gap for the navbar
      }, 600);
    }
  });

  /* ---------------------------------------------------
     FEATURE 2 – DAY SCHEDULE TABS (schedule.html)
     Clicking Day 1 / Day 2 / Day 3 buttons shows
     the matching content panel and hides the others.
  --------------------------------------------------- */
  $('.day-btn').on('click', function () {
    var day = $(this).data('day');        // read the data-day="1" attribute

    // Remove active style from all buttons, add to clicked one
    $('.day-btn').removeClass('active');
    $(this).addClass('active');

    // Hide all panels, show the matching one
    $('.day-panel').removeClass('show');
    $('#day' + day).addClass('show');
  });

  /* ---------------------------------------------------
     FEATURE 3A – FEE DISPLAY (register.html)
     When the user picks a category from the dropdown,
     show the corresponding registration fee.
  --------------------------------------------------- */
  var fees = {
    'media':        '₹50',
    'ceg':          '₹100',
    'student':      '₹150',
    'professional': '₹200'
  };

  $('#category').on('change', function () {
    var val = $(this).val();
    if (val) {
      $('#feeAmount').text(fees[val]);    // put the fee into the box
      $('#feeBox').slideDown(300);       // show the fee box with animation
    } else {
      $('#feeBox').slideUp(300);         // hide it if nothing is selected
    }
  });

  /* ---------------------------------------------------
     FEATURE 3B – FORM VALIDATION (register.html)
     When the submit button is clicked, check that
     every field has been filled before proceeding.
  --------------------------------------------------- */
  $('#submitBtn').on('click', function () {
    // Grab each field's value (trim removes extra spaces)
    var name      = $('#name').val().trim();
    var email     = $('#email').val().trim();
    var phone     = $('#phone').val().trim();
    var category  = $('#category').val();
    var filmType  = $('#filmType').val();
    var filmTitle = $('#filmTitle').val().trim();
    var college   = $('#college').val().trim();

    // If any field is empty, show error and stop
    if (!name || !email || !phone || !category || !filmType || !filmTitle || !college) {
      $('#formError').text('Please fill in all fields before submitting.').show();
      return;
    }

    // All good – hide form, show success message
    $('#formError').hide();
    $('#regForm').fadeOut(400, function () {
      $('#successMsg').fadeIn(400);
    });
  });

  /* ---------------------------------------------------
     FEATURE 4 – SCROLL FADE-UP ANIMATION
     Any element with class="fade-up" will animate
     into view when the user scrolls down to it.
  --------------------------------------------------- */
  function checkFadeUp() {
    var windowBottom = $(window).scrollTop() + $(window).height();
    $('.fade-up').each(function () {
      if ($(this).offset().top < windowBottom - 60) {
        $(this).addClass('visible');     // CSS handles the actual animation
      }
    });
  }

  $(window).on('scroll', checkFadeUp);  // re-check every time user scrolls
  checkFadeUp();                        // also check immediately on page load

});
