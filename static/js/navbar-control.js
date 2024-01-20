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