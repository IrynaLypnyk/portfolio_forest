export let skillAnimate = (function (options){
  const skillList = document.querySelectorAll(options.skillList),
    section = document.querySelector(options.section);

  let fillSkill = function () {
    let scrollY = window.scrollY;
    let sectionTop = section.offsetTop;
    let sectionHeight = section.offsetHeight;
    if (scrollY > (sectionTop + sectionHeight / 2)) {
      for (let i = 0; i < skillList.length; i++) {
        const skillItem = skillList[i].children;
        for (let j = 0; j < skillItem.length; j++) {
          const circle = skillItem[j].querySelector(options.circle);
          circle.style.transitionDelay = 0.3*j + 's';
          skillItem[j].classList.add(options.activeClass);
        }
      }
    } else if (scrollY < sectionTop) {
      for (let i = 0; i < skillList.length; i++) {
        const skillItem = skillList[i].children;
        for (let j = 0; j < skillItem.length; j++) {
          skillItem[j].classList.remove(options.activeClass);
        }
      }
    }
  };

  if (section){
    return{

      init: window.addEventListener('scroll', fillSkill),
    };
  }

})({
  skillList: '.skills-row__list',
  circle: '.circle_second',
  activeClass: 'skill-circle__svg-img_active',
  section: '#skills',
});