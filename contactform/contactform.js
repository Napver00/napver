jQuery(document).ready(function ($) {
  "use strict";

  //Contact
  $('form.contactForm').submit(function () {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function () { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (!i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function () { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();
    var action = "https://script.google.com/macros/s/AKfycbyCFImu3bRAf3r6_rbr08T-1ngSO9x_MGkXKd9jNzIIxcAQF6u-azOPpboLv8tw1M3w-A/exec"; // <--- REPLACE THIS WITH YOUR GOOGLE APPS SCRIPT URL

    // We use a simple fetch here for better compatibility with Google Apps Script's CORS behavior
    // or we can stick to jquery ajax but need to handle dataType carefully.
    // Google Apps Script usually requires 'no-cors' mode if simply firing and forgetting, 
    // or standard POST if you want a response (but CORS can be tricky).
    // The most reliable way for simple forms is often standard POST with redirect, or fetch.

    // Let's use a robust AJAX approach compatible with the plan's Apps Script
    $.ajax({
      type: "POST",
      url: action,
      data: str,
      dataType: "json", // Expected response
      crossDomain: true,
      success: function (msg) {
        if (msg.result == 'success') {
          $("#sendmessage").addClass("show");
          $("#errormessage").removeClass("show");
          $('.contactForm').find("input, textarea").val("");
        } else {
          $("#sendmessage").removeClass("show");
          $("#errormessage").addClass("show");
          $('#errormessage').html("Error sending message.");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // Google Apps Script sometimes returns a 302 or opaque response that triggers error callback despite working
        // If using 'no-cors', we can't read response. 
        // For this specific setup, we'll assume success if status is 200, 
        // but often with GAS it is best to just show success if the request was sent.

        // However, if the user follows the plan exacty, it returns JSON.
        // If CORS issues occur, we might fall here.
        console.log("Status: " + textStatus);
        console.log("Error: " + errorThrown);

        // Fallback UI update just in case it actually worked but browser blocked response reading
        // For a pro implementation we might assume success to not frustrate user if it's just a CORS warning
        $("#sendmessage").removeClass("show");
        $("#errormessage").addClass("show");
        $('#errormessage').html("Failed to send message: " + textStatus);
      }
    });
    return false;
  });

});
