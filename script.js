"use strict"
// определение с какого устройства зашли на страницу

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    
    ios: function () {
        return navigator.userAgent.match(/iPhone|iPad|Ipod/i); 
    },
    
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    
    any: function () {
        return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.ios() ||
        isMobile.Opera() ||
        isMobile.Windows());
    }
};

//проверка

if (isMobile.any()){
    document.body.classList.add('_touch');
    
    //Внутри проверки, заставляем стелочку работать приклике,
    // 1) Собираем в переменную все стрелочки
    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0){ // 2) Условие в котором проверяется естьли такие эллементы в массиве
        for (let index = 0; index < menuArrows.length; index++){
            const menuArrow = menuArrows[index]; // 3) Если такие стрелочки есть создаем цикл, чтобы по ним пробежаться
            menuArrow.addEventListener('click',function(e) { //4) На каждую из них, вешаем событие - клик
                menuArrow.parentElement.classList.toggle('_active');
            });  //5) При клике на стрелочку, вешаем класс родителю нажатой стрелочки, не просто добавляем, а если нету - добавляем, а если есть - убераем. Поэтому - toggle. 
        }
    }
//здесь продолжается проверка    
} else{
    document.body.classList.add('_pc')
}


// Открываем бургер

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu){
    iconMenu.addEventListener("click", function(e){
        document.body.classList.toggle('_lock'); //убираем скрол сайта, при открытом меню
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}



// Делаем плавный скрол, сначала собираем массив объектов, которые будут участвовать в навигации, то есть собрать массив из сылок, у кторых есть атрибут data-goto=

const menuLinks = document.querySelectorAll('.menu__link[data-goto]'); // то есть ищем не все .menu__link, а только те у которых есть data-goto
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if(menuLink.dataset.goto && document.querySelectorAll(menuLink.dataset.goto)){
           const gotoBlock = document.querySelector(menuLink.dataset.goto);
           const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            
           //при клике на раздел в бургере, меню будет закрываться
           if(iconMenu.classList.contains('_active')) {
               document.body.classList.remove('_lock'); 
               iconMenu.classList.remove('_active');
               menuBody.classList.remove('_active');
           }   
            
           window.scrollTo({
               top: gotoBlockValue,
               behavior: "smooth"
           });
           e.preventDefault();    
        }
    }
}







