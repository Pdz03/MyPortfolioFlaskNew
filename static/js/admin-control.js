(function() {
    emailjs.init('iDvG4VzG8lXP8ihzH');
})();

window.onload = function() {
    const otp = 853012
    // emailjs.send('service_ccg2gi7', 'template_so0v6it',{
    //     otp: otp})
    // .then(function() {
    //     console.log('SUCCESS!');
    // }, function(error) {
    //     console.log('FAILED...', error);
    // });

    let passcode = prompt("Please enter passcode!");
    if (parseInt(passcode) !== otp) {
      alert('Wrong passcode!')
      window.location.href = '/'
    } else {
     alert('Nice!')
      }
}

