const mobileRegex = /^([0-9]{10})+$/
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

$(function() {
  $('#openButton').click(function() {
    $('#navigation').addClass('open')
  })

  $('#closeButton').click(function() {
    $('#navigation').removeClass('open')
  })

  const sendEmail = function(requestBody, successCallback) {
    $.ajax({
        method: 'POST',
        url: 'https://formsubmit.co/ajax/d9225af3a93f7abb764d772df9d6e604',
        dataType: 'json',
        accepts: 'application/json',
        data: requestBody,
        success: (data) => {
          console.log(data)
          successCallback()
        },
        error: (err) => {
          console.log(err)
        }
    });
  }

  $('#sendEnquiry').click(function() {
    const value = $('#enquiryBox input').val()
    const validation = mobileRegex.test(value) || emailRegex.test(value)
    if (!value || !validation) {
      $('#enquiryBox').addClass('error')
      $('#enquiryBoxError').addClass('visible')
      return
    }
    const requestBody = {
      contact: value
    }
    sendEmail(requestBody, function() {
      $('#sendEnquiry').hide()
      $('#enquirySuccess').show()
      $('#enquiryBox input').val('')
    })
  })

  $('#enquiryBox input').on('input', function() {
    const value = $('#enquiryBox input').val()
    if (!value) {
      $('#enquiryBox').addClass('error')
      $('#enquiryBoxError').addClass('visible')
    } else {
      $('#enquiryBox').removeClass('error')
      $('#enquiryBoxError').removeClass('visible')
    }
  })

  $('#whatsAppSubmit').click(function() {
    const value = $('#whatsAppInput').val()
    const validation = mobileRegex.test(value)
    if (!value || !validation) {
      $('#whatsAppInput').addClass('error')
      return
    }
    $('#whatsAppInput').removeClass('error')
    $(this).addClass('loading')
    const requestBody = {
      whatsAppNumber: value
    }
    sendEmail(requestBody, function () {
      $('#successMessage').show()
      $('#whatsAppSubmit').hide()
      $(this).removeClass('loading')
    })
  })

  $('#bookRideSubmit').click(function() {
    const nameInput = $('#nameInput')
    const modelInput = $('#modelInput')
    const colorInput = $('#colorInput')
    const mobileInput = $('#mobileInput')
    const emailInput = $('#emailInput')
  
    const validation = mobileRegex.test(mobileInput.val()) && emailRegex.test(emailInput.val())
  
    if (!nameInput.val()) {
      nameInput.addClass('error')
    } else {
      nameInput.removeClass('error')
    }
    if (!modelInput.val()) {
      modelInput.addClass('error')
    } else {
      modelInput.removeClass('error')
    }
  
    if (!colorInput.val()) {
      colorInput.addClass('error')
    } else {
      colorInput.removeClass('error')
    }
  
    if (!mobileInput.val() || !mobileRegex.test(mobileInput.val())) {
      mobileInput.addClass('error')
    } else {
      mobileInput.removeClass('error')
    }
  
    if (!emailInput.val() || !emailRegex.test(emailInput.val())) {
      emailInput.addClass('error')
    } else {
      emailInput.removeClass('error')
    }
  
    if(!nameInput.val() || !modelInput.val() || !colorInput.val() || !mobileInput.val() || !emailInput.val() || !validation) {
      return
    }
    $(this).addClass('loading')
    const requestBody = {
      name: nameInput.val(),
      model: modelInput.val(),
      color: colorInput.val(),
      mobile: mobileInput.val(),
      email: emailInput.val(),
    }
    sendEmail(requestBody, function () {
      $('#bookRideSuccess').show()
      $('#bookRideSubmit').hide()
      $(this).removeClass('loading')
    })
  })

})



/*
https://formsubmit.co/
link your mail: https://formsubmit.co/email-link
After first email we will get the activate link in the email along with hash key for email address
once its activated we will start getting the emails for the users
*/
