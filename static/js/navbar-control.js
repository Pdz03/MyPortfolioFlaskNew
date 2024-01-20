const navAbout = $('#navbar1');
const navSkill = $('#navbar2');
const navProject = $('#navbar3');
const navContact = $('#navbar4');

aboutactive = () => {
    navAbout.addClass('active');
    navSkill.removeClass('active');
    navProject.removeClass('active');
    navContact.removeClass('active');
}

skillactive = () => {
    navAbout.removeClass('active');
    navSkill.addClass('active');
    navProject.removeClass('active');
    navContact.removeClass('active');
}

contactactive = () => {
    navAbout.removeClass('active');
    navSkill.removeClass('active');
    navProject.removeClass('active');
    navContact.addClass('active');
}


// function removeClass() {
//     for(let i = 0 ; i < 4 ; i++)
//       $(`#navbar${i + 1}`).removeClass("active");
//   }
  
//   $(window).scroll(function(){      
//       removeClass();
//       let visibleElement = Math.floor(this.scrollY / 600);
//       $(`#navbar${visibleElement + 1}`).addClass("active");
//   });


window.addEventListener('scroll', function() {
    var windowHeight = window.innerHeight;
    var aboutTarget = document.getElementById('main');
    var aboutPosition = aboutTarget.getBoundingClientRect();
    if (aboutPosition.top <= windowHeight) {
        navAbout.addClass('active');
        navSkill.removeClass('active');
        navProject.removeClass('active');
        navContact.removeClass('active');
    } else {
        navAbout.removeClass('active');
    }

    var windowHeight = window.innerHeight;
    var skillTarget = document.getElementById('skill');
    var skillPosition = skillTarget.getBoundingClientRect();
    if (skillPosition.top <= windowHeight) {
        navAbout.removeClass('active');
        navSkill.addClass('active');
        navProject.removeClass('active');
        navContact.removeClass('active');
    } else {
        navSkill.removeClass('active');
    }

    var windowHeight = window.innerHeight;
    var projectTarget = document.getElementById('project');
    var projectPosition = projectTarget.getBoundingClientRect();
    if (projectPosition.top <= windowHeight) {
        navAbout.removeClass('active');
        navSkill.removeClass('active');
        navProject.addClass('active');
        navContact.removeClass('active');
    } else {
        navProject.removeClass('active');
    }

    var windowHeight = window.innerHeight;
    var contactTarget = document.getElementById('contact');
    var contactPosition = contactTarget.getBoundingClientRect();
    if (contactPosition.top <= windowHeight) {
        navAbout.removeClass('active');
        navSkill.removeClass('active');
        navProject.removeClass('active');
        navContact.addClass('active');
    } else {
        navContact.removeClass('active');
    }
});