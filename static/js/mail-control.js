mailfocus = () => {
    $('#email').focus();
}

(function() {
    emailjs.init('iDvG4VzG8lXP8ihzH');
})();

window.onload = function() {
    document.getElementById('mail-form').addEventListener('submit', function(event) {
        event.preventDefault();

        emailjs.sendForm('service_ccg2gi7', 'template_46zvb3c', this)
            .then(function() {
                console.log('SUCCESS!');
                Swal.fire({
                    title: "Success!",
                    text: "Your message was sent!",
                    icon: "success"
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                  });
            }, function(error) {
                console.log('FAILED...', error);
                Swal.fire({
                    title: "Failed!",
                    text: "There was an error when sending a message!",
                    icon: "error"
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
            });
    });
}