
// Выпадающий список
function slide(target, type) {
    
    let slideUp = (target, duration=500) => {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.boxSizing = 'border-box';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout( () => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        }, duration);
    }

    let slideDown = (target, duration=500) => {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;

        if (display === 'none')
        display = 'block';

        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.boxSizing = 'border-box';
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout( () => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        }, duration);
    }

    let checkSlideItem = false;
    let slideToggle = (target, duration = 500) => {
        if (window.getComputedStyle(target).display === 'none' && checkSlideItem == false) {
            checkSlideItem = true;
            setTimeout(function() {
                checkSlideItem = false;
            },500)
        return slideDown(target, duration);
        
        } else {
            checkSlideItem = true;
            setTimeout(function() {
                checkSlideItem = false;
            },500)
        return slideUp(target, duration);
        }
    }

    if(type == 'up') {


        slideUp(target);


    } else if(type == 'down') {


        slideDown(target);



    } else if(type == 'toggle') {


        slideToggle(target);


    }

}

let widthScrollBar;


// Fade In и Fade out
function fade(element, type, duration) {

    if(type == 'show') {
        let opacity = 0,
            intervalID = setInterval(function() {
            if(element.style.visibility != 'visible') {
                element.style.visibility = 'visible';
            }
            if (opacity < 1) {
                opacity = opacity + 0.02
                element.style.opacity = opacity;
            } else {
                element.style.opacity = 1;
                clearInterval(intervalID);
            }
        }, (duration) ? duration : 1);

    } else if(type == 'hide') {
        let opacity = 1,
            intervalID = setInterval(function() {

            if (opacity > 0.01) {
                opacity = opacity - 0.02
                element.style.opacity = opacity;
            } else {
                clearInterval(intervalID);
                element.style.opacity = 0;
                element.style.visibility = 'hidden';
            }
        }, (duration) ? duration : 1);
    }


}



// Попап
let popupCheck = true, popupCheckClose = true;
function popup(arg) {

    if(popupCheck) {
        popupCheck = false;
    
    let popup, popupBg, popupCloseBtn,
    
        body    = arg.body,
        html    = arg.html,
        header  = arg.header,
        id      = arg.id;

    try {
        
        popup = document.querySelector(id);
        popupBg = popup.querySelector('._popup-bg');
        popupCloseBtn = popup.querySelector('._popup-close-btn');

    } catch {
        return false;
    }

        function removeFunc(popup, removeClass) {

            if(popupCheckClose) {
                popupCheckClose = false;

                fade(popup, 'hide');
                popup.classList.remove('_active');

                setTimeout(() => {
                    popupCheckClose = true;
                },400)
    
                if(removeClass) {
                    header.classList.remove('_popup-active');
    
                    setTimeout(function() {
                        
                        body.classList.remove('_popup-active');
                        html.style.setProperty('--popup-padding', '0px');

                    },400)
                }
            }

            
            
            
            
        }

        body.classList.remove('_popup-active');
        html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
        body.classList.add('_popup-active');
        
        //window.location.hash = id;

        popup.classList.add('_active');
        header.classList.add('_popup-active');

        setTimeout(function () {
            fade(popup, 'show');
        },100);
    

    

        popupBg.addEventListener('click', function() {
            if(document.querySelectorAll('._popup._active').length <= 1) {
                removeFunc(popup, true);
            } else {
                removeFunc(popup, false);
            }
            setTimeout(function() {
                return false;
            },400)
        });

        popupCloseBtn.addEventListener('click', function() {
            if(document.querySelectorAll('._popup._active').length <= 1) {
                removeFunc(popup, true);
            } else {
                removeFunc(popup, false);
            }
            setTimeout(function() {
                return false;
            },400)
        });

        setTimeout(() => {
            popupCheck = true;
        },400);

    }
    
}

// Галерея
function galleryPopup(arg) {

    let galleryPopupBlock = 
      `
      <div class="_gallery-popup _hidden">
          <div class="_gallery-popup-bg"></div>
          <div class="_gallery-popup-body _gallery-popup-max">
              <button type="button" class="_gallery-popup-close-btn">
                ✕
              </button>
              <img src="${arg.link.href}" class="_gallery-popup-img">
          </div>
      </div>
      `;

      let html = arg.html, body = arg.body;
  
      body.insertAdjacentHTML('beforeend', galleryPopupBlock);
      html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
      body.classList.add('_popup-active');
      
      let galleryPopup = document.querySelector('._gallery-popup');
  
      setTimeout(function() {
        galleryPopup.classList.remove('_hidden');
      },200);
  
      function removeGalleryPopup() {
        galleryPopup.classList.add('_hidden');
        setTimeout(function() {
          body.removeChild(galleryPopup);
          body.classList.remove('_popup-active');
          html.style.setProperty('--popup-padding', '0px');
        },200);
      }
  
      galleryPopup.querySelector('._gallery-popup-close-btn').addEventListener('click', function() {
        removeGalleryPopup();
      });
      galleryPopup.querySelector('._gallery-popup-bg').addEventListener('click', function() {
        removeGalleryPopup();
      });
      body.addEventListener('keydown', function(e) {
          if(e.keyCode == '27') {
            removeGalleryPopup();   
          }
      });
}






const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('._burger, .header__nav, body'),
    burger = document.querySelector('.burger'),
    header = document.querySelector('.header');



const   filter          = document.querySelector('.filter'),
        filterBg        = document.querySelector('.filter__bg'),
        filterOpenBtn   = document.querySelector('._filter-open-btn');




body.addEventListener('click', function (e) {

    // Добавить или удалить количество товаров
    if(e.target.closest('._btn-plus')) {
        const inputNumber = e.target.closest('._btn-plus').parentNode.querySelector('._input-number');

        inputNumber.value = Number(inputNumber.value) + 1;
    }

    if(e.target.closest('._btn-minus')) {
        const inputNumber = e.target.closest('._btn-minus').parentNode.querySelector('._input-number');

        if(Number(inputNumber.value) != 1) inputNumber.value = Number(inputNumber.value) - 1;
        
    }







    if(e.target.closest('._prompt-block-front')) {
        const thisBtn   = e.target.closest('._prompt-block-front')
              parent    = thisBtn.closest('._prompt-block');

        parent.classList.add('_active');

    } else if(!e.target.closest('._prompt-block')) {
        document.querySelectorAll('._prompt-block').forEach(element => {
            element.classList.remove('_active');
        })
    }







    if(e.target.closest('._review-item-more-link')) {
        e.preventDefault();

        const thisElem = e.target.closest('._review-item-more-link'),
              reviewParent = thisElem.closest('._review-item');
        
        if(!reviewParent.classList.contains('_active')) {
            thisElem.classList.add('_active');
            reviewParent.classList.add('_active');
        }

    }

    







    // Попап
    if(e.target.closest('._popup-btn')) {
        e.preventDefault();
        popup({
            id: e.target.closest('._popup-btn').getAttribute('href'),
            html: html,
            body: body,
            header: header,
        });
    }








    if(e.target.closest('.filter__form--item-link._has-filter-drop-down-list')) {
        e.preventDefault();

        const thisBtn = e.target.closest('.filter__form--item-link._has-filter-drop-down-list'),
              dropDownList = thisBtn.parentNode.querySelector('._filter-drop-dowm-list');

        if(!dropDownList.classList.contains('_active')) {
            dropDownList.classList.add('_active');
            
            slide(dropDownList, 'down');    
        }
        

    }

    if(e.target.closest('._filter-open-btn')) {
        e.preventDefault();
        if(!filter.classList.contains('_active')) {
            filter.classList.add('_active');
            header.classList.add('_popup-active');

            menu.forEach(elem => {
                elem.classList.remove('_active')
            })
            body.classList.add('_filter-active');
        }
    }

    if(e.target.closest('.filter__bg') || e.target.closest('.filter__header--close-btn')) {

        if(filter.classList.contains('_active')) {
            filter.classList.remove('_active')
            body.classList.remove('_filter-active');
            setTimeout(() => {
                header.classList.remove('_popup-active');
            },200)
            
        }
    }









    // Меню в шапке
    if (e.target.closest('._burger')) {
        
        menu.forEach(elem => {
            elem.classList.toggle('_active')
        })
    }









    // Скролл при нажатии на кнопку
    if(e.target.closest('._btn-to-scroll')) {
    
        e.preventDefault();

        let thisBtn = e.target.closest('._btn-to-scroll'),
            section;

        try {
            section = document.querySelector(thisBtn.getAttribute('href'));
            history.replaceState("", "", thisBtn.getAttribute('href'));
        } catch {
            section = body;
        }

        menu.forEach(elem => {
            elem.classList.remove('_active')
        })
        window.scroll({
            left: 0, 
            top: section.offsetTop, 
            behavior: 'smooth'
        })
    
    }









    // Выпадающий список товаров в шапке
    if(e.target.closest('._header-drop-down-btn') && !e.target.closest('._header-drop-down-btn._active')) {
        e.preventDefault();

        document.querySelectorAll('._header-drop-down-btn._active').forEach(element => {
            element.classList.remove('_active');
        })

        let dropDownBtn = e.target.closest('._header-drop-down-btn');
        if(!dropDownBtn.classList.contains('_active')) {
            dropDownBtn.classList.add('_active');
        }

        
    } else if(!e.target.closest('._header-drop-down')) {
        document.querySelectorAll('._header-drop-down-btn._active').forEach(element => {
            element.classList.remove('_active')
        });
    }








    // Кнопка "ПОКАЗАТЬ ЕЩЕ"
    if(e.target.closest('._hiddenToggle-btn')) {
        let thisBtn     = e.target.closest('._hiddenToggle-btn'),
            block       = document.querySelector(thisBtn.getAttribute('href'));
        e.preventDefault();


        if(!thisBtn.classList.contains('_active')) {
            thisBtn.classList.add('_active');
            hiddenToggle(thisBtn.getAttribute('href')).show();
            block.classList.add('_active');
        }
    }









    // Удаление товаров с корзины
    if(e.target.closest('._remove-btn')) {
        let thisItem = e.target.closest('._remove-btn'),
            removeItem = thisItem.closest('._remove-item');


        fade(removeItem, 'hide');

        setTimeout(function () {
            thisItem.closest('._remove-item').remove();
        },400)
        
        
    }









    // Кнопка "Читать полностью"
    if(e.target.closest('._read-more-btn')) {
        e.preventDefault();

        let thisBtn = e.target.closest('._read-more-btn'),
            readMoreItem = thisBtn.parentNode.querySelector('._read-more-item');

        thisBtn.classList.add('_active');
        readMoreItem.classList.add('_active');

    }










    // Картинка с текстом и кнопкой "PLAY", при нажатии которой запускаеться видео
    if(e.target.closest('._video-poster')) {

        let thisPoster = e.target.closest('._video-poster'),
            videoElem = thisPoster.parentNode.querySelector('._video-elem');

        thisPoster.classList.add('_active');

        setTimeout(() => {
            videoElem.classList.add('_active');
            videoElem.parentNode.classList.add('_active');
        },400)
        setTimeout(() => {
            videoElem.play();
        },800)

        

    }







    // Галерея. При нажатии на картинку, открываеться попап с картинкой
    if (e.target.closest('._gallery-popup-link')) {
        let link = e.target.closest('._gallery-popup-link');
        
        e.preventDefault()
        galleryPopup({
            link: link,
            html: html,
            body: body,
        });
        
    }










})






function is_touch_device() {
  return !!('ontouchstart' in window);
}

// Слайдеры {

new Swiper('.recommend-block__slider', {
  
    spaceBetween: 30,
    slidesPerView: 1,
    centeredSlides: false,
    /* grabCursor: true, */
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
        centeredSlides: true,
    
      },
      600: {
        slidesPerView: 2,
        centeredSlides: false,
      },
    }
});

new Swiper('.product-page__image-slider', {
  
    spaceBetween: 30,
    slidesPerView: 3,
    centeredSlides: false,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    /* breakpoints: {
      992: {
        slidesPerView: 3,
        centeredSlides: true,
    
      },
      600: {
        slidesPerView: 2,
        centeredSlides: false,
      },
    } */
});

let teachersSlider;

// }




// КАСТОМНЫЙ input range {

    const filterRange = document.querySelector('.filter__price--range'),
        filterRangeBody = document.querySelector('.filter__price--range-body'),
        filterPriceMin = document.querySelector('.filter__price--value._min-value'),
        filterPriceMax = document.querySelector('.filter__price--value._max-value'),
        filterRangeValue = document.querySelector('.filter__price--range-value');
try {
    
    const filterRangeSlider = noUiSlider.create(filterRangeBody, {
        tooltips: true,
        
        start: [Number(filterRange.getAttribute('data-start'))],
        connect: 'lower',
        /* format: wNumb({
            decimals: 0
        }), */
        step: Number(filterRange.getAttribute('step')),
        range: {
            'min': Number(filterRange.getAttribute('min')),
            'max': Number(filterRange.getAttribute('max')),
        },
        
        format: {
            to: function (value) {
                let valueString = Math.round(value).toString(),
                    valueResult = '';
      
                    filterRange.setAttribute('value', valueString);
                
                if(valueString.length == 4) {
                    valueResult = valueString.slice(0, 1) + " " + valueString.slice(1);
                } else if(valueString.length == 5) {
                    valueResult = valueString.slice(0, 2) + " " + valueString.slice(2);
                } else if(valueString.length == 6) {
                    valueResult = valueString.slice(0, 3) + " " + valueString.slice(3);
                }
                return (valueResult) ? valueResult : valueString;
                
            },
            from: function (value) {
                filterRangeBody.insertAdjacentHTML('beforeend', 

                `<span class="range-value range-value-min">${Number(filterRange.getAttribute('min'))}</span>
                <span class="range-value range-value-max">${Number(filterRange.getAttribute('max'))}</span>`)
                
                return Math.round(value);
            }
        }
    
    });

    filterRange.classList.add('_custome-slider-active');
    
} catch {}

// }




// Скрывание блоков и открытие блоков (Секции где есть кнопка "ПОКАЗАТЬ ЕЩЕ")

const hiddenToggleList = document.querySelectorAll('._hiddenToggle');

function hiddenToggle(id) {
    let elem    = document.querySelector(id),
        btn     = document.querySelector(`[href="${id}"]`);
    return {
        show: function () {

            if(elem && !elem.classList.contains('_active')) {
                btn.classList.remove('_visible');
                for(let i = 0; i < elem.children.length; i++) {
            
                    elem.children[i].style.display = 'block';
        
                }

            }
        },

        hide: function(length) { // length это количество елементов которые нужно спрятать
            if(elem && !elem.classList.contains('_active')) {
                
                btn.classList.add('_visible');
                for(let i = 0; i < elem.children.length; i++) {
            
                    if(i>=length) {
                        elem.children[i].style.display = 'none';
                    }
            
                }
            }
        }

    }
}


// Media запросы {
    
      let resizeCheck = {};



      
      


      function resizeCheckFunc(size, minWidth, maxWidth) {
        
        //let resizeActive = false;
        
        
        if(windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
            resizeCheck[String(size)] = false;
            maxWidth(); // < size
            
        }
        if(windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
            resizeCheck[String(size)] = true;
            minWidth(); // > size
            
        }
        /* if(!resizeActive) {
            console.log('not resize');
        } */
        
        /* if(windowSize == size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined)) {
            resizeCheck[String(size)] = false;
            maxWidth(); // < size
      
        } */
      }


    // Вставка елементов DOM в шапке {

    let appendToMobMenuItems = document.querySelectorAll('._append-to-mob-menu-768'),
          appendToMobMenuItemsArray = [],
          mobMenu = document.querySelector('.header__nav--mobile-body');

    if(appendToMobMenuItems) {
        appendToMobMenuItems.forEach(element => {
            appendToMobMenuItemsArray.push([element, element.parentNode]);
        });
    }

    let pageAddress = document.querySelector('.page-address'),
        pageAddressInit = document.querySelector('.page-address-init'),
        pageAddressPlace = document.querySelector('._page-address-place');

    // }

      function resize() {
        
      windowSize = window.innerWidth;
    
      

      resizeCheckFunc(768, 
        function () { // Когда экран больше 768px
    
            if(appendToMobMenuItems) {
                appendToMobMenuItemsArray.forEach(element => {
                    element[1].append(element[0]);
                });
            }

            
            if(teachersSlider) teachersSlider.destroy(true, true);


            hiddenToggle('#hiddenToggle-partners-our').show();

            hiddenToggle('#hiddenToggle-offline-study-list').show();

            hiddenToggle('#hiddenToggle-study-gallery').show();

            hiddenToggle('#hiddenToggle-offline-study-list').hide(4);

        },
        function () { // Когда экран меньше 768px
          
            if(appendToMobMenuItems) {
                appendToMobMenuItemsArray.forEach(element => {
                    mobMenu.append(element[0]);
                });
            }

            if(document.querySelector('.teachers__slider')) {
                teachersSlider = new Swiper('.teachers__slider', {
  
                    spaceBetween: 30,
                    slidesPerView: 1,
                    pagination: {
                      el: '.swiper-pagination',
                      clickable: true,
                    },
                    
                });
            }
            



            hiddenToggle('#hiddenToggle-services-gallery').hide(2);

            hiddenToggle('#hiddenToggle-partners-our').hide(2);

            hiddenToggle('#hiddenToggle-study-gallery').hide(2);

            hiddenToggle('#hiddenToggle-offline-study-list').hide(2);


          
    });
    
    resizeCheckFunc(992, 
        function () {  // Когда экран больше 992px
    
            if(pageAddress) {
                pageAddressInit.append(pageAddress);
            }

            menu.forEach(elem => {
                elem.classList.remove('_active')
            })

            hiddenToggle('#hiddenToggle-products-list').show();

            hiddenToggle('#hiddenToggle-partners-our').show();
            hiddenToggle('#hiddenToggle-partners-our').hide(4);

            hiddenToggle('#hiddenToggle-services-list').show();

            hiddenToggle('#hiddenToggle-services-gallery').show();

            hiddenToggle('#hiddenToggle-offline-study-list').show();


            
        },
        function () {  // Когда экран меньше 992px
          
            if(pageAddress) {
                pageAddressPlace.append(pageAddress);
            }

            hiddenToggle('#hiddenToggle-products-list').hide(4);
            hiddenToggle('#hiddenToggle-services-list').hide(4);
            hiddenToggle('#hiddenToggle-services-gallery').hide(2);
            hiddenToggle('#hiddenToggle-offline-study-list').hide(4);
          
    });
      }
      
      resize();
      
      window.onresize = resize;
      
      // Media запросы }

   
      function getCoords(elem) {
        var box = elem.getBoundingClientRect();
    
        return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
        };
    
    }
    
    
    function scrollPage() {
    
    const offsetCheckJs = document.querySelector('.offset-check-js');
    let top = [getCoords(offsetCheckJs).top, false];
    
    header.classList.add('_loaded');
    
    function scrollPageFunc() {
        if(windowSize < 768) {
            top[0] = getCoords(offsetCheckJs).top;
            
            if(top[0] >= 300 && top[1] == false) {
            
                top[1] = true;
                header.style.setProperty('--pos', '-100%');
            
                setTimeout(function() {
                    header.classList.add('_active');
                    header.style.setProperty('--pos', '0%');
                },200);
            
            } else if(top[0] <= 300 && top[1] == true) {
            
                top[1] = false;
                header.style.setProperty('--pos', '-100%');
            
                setTimeout(function() {
                    header.style.setProperty('--pos', '0%');
                    header.classList.remove('_active');
                    
                },200);
            
            }
            
        }
    }
    
    scrollPageFunc();
    
    window.onscroll = scrollPageFunc;
    
    }
    
    scrollPage();
    


/* // Анимация {

wow = new WOW({
mobile:       false,
})
wow.init();

// } */

