'use strict'

module.exports = function () {

  if(document.getElementById('slider')) {

    const slider = document.getElementById('slider');
    const projectList = slider.querySelectorAll('.slide-desc__item');
    const sliderLength = projectList.length;
    const imageList = slider.querySelectorAll('.slides-preview__item');
    const controls = slider.querySelectorAll('.slides-nav__controls');
    const controlPrev = slider.querySelector('.slides-nav__controls_prev');
    const controlPrevList = slider.querySelectorAll('.slides-nav__item_prev');
    const controlNext = slider.querySelector('.slides-nav__controls_next');
    const controlNextList = slider.querySelectorAll('.slides-nav__item_next');
    let currentIndex = 0; //начало цикла
    const last = sliderLength - 1;  //конец цикла

    //-удаляем класс .active
    const removeActive = function (params) {
      [].forEach.call(params, (item) => {
        item.classList.remove('active');
      });
    };
    // //-начальному элементу определяем класс .active
    const makeActive = function (array, index) {
      array[index].classList.add('active');
    };

      //-const defineDirection = function(index) {
    const defineDirection = (index) => {
      let next = index + 1;
      let prev = index - 1;
      if (next > last) next = 0;
      if (prev === -1) prev = last;
      return{
        next: next,
        prev: prev,
      };
    };

    const moveItems = function (index) {
      let direction = defineDirection(index);
      removeActive(projectList);
      removeActive(imageList);
      makeActive(projectList, index);
      makeActive(imageList, index);

      removeActive(controlPrevList);
      makeActive(controlPrevList, direction.prev);
      removeActive(controlNextList);
      makeActive(controlNextList, direction.next);

      // controlPrev.querySelector('.controls__bg-list').style.transform = 'translateY('+-100*(direction.prev)+'%)';
      // controlNext.querySelector('.controls__bg-list').style.transform = 'translateY('+-100*(direction.next)+'%)';
    };

      //-по событию window.onload вызваем function
    [].forEach.call(controls, function(item) {
      moveItems(currentIndex);

      item.addEventListener('click', (e) => {
        e.preventDefault();
        const button = e.currentTarget;

        let currentActive;
        projectList.forEach((item, index) => {
          if(item.classList.contains('active')) {currentActive = index;}
        });
        let direction = defineDirection(currentActive);
        if(button.classList.contains('slides-nav__controls_prev')){
          moveItems(direction.prev);
        } else {
          moveItems(direction.next);
        }
      });
    });

  }
};
