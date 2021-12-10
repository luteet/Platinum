

const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('._burger, .header__nav, body'),
    burger = document.querySelector('.burger'),
    header = document.querySelector('.header');

  
/* body.addEventListener("mouseover", function(e) {
    
    console.log('mouseover');
    if(e.target.closest('._header-drop-down')) {
        e.target.closest('._header-drop-down').querySelector('._header-drop-down-btn').classList.add('_active');
    }
    
}, false);
    
body.addEventListener("mouseout", function(e) {
    
    console.log('mouseout');
    if(e.target.closest('._header-drop-down')) {
        e.target.closest('._header-drop-down').querySelector('._header-drop-down-btn').classList.remove('_active');
    }
    
}, false); */

body.addEventListener('click', function (e) {

    // Меню в шапке
    if (e.target.closest('._burger')) {
        
        menu.forEach(elem => {
            elem.classList.toggle('_active')
        })
    }

    if(e.target.closest('._btn-to-scroll')) {
    
        e.preventDefault();
        menu.forEach(elem => {
            elem.classList.remove('_active')
        })
        window.scroll({
            left: 0, 
            top: 0, 
            behavior: 'smooth'
        })
    
    }

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

})

function is_touch_device() {
  return !!('ontouchstart' in window);
}


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
    /* navigation: {
      nextEl: '.recommend-block__arrow._next',
      prevEl: '.recommend-block__arrow._prev',
    }, */
    breakpoints: {
      992: {
        slidesPerView: 3,
        centeredSlides: true,
    
      },
      600: {
        slidesPerView: 2,
        centeredSlides: false,
      },
      /* 768: {
        centeredSlides: true,
        spaceBetween: 15,
        slidesPerView: 3,
    
      } */
    }
});

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
            'min': Number(filterPriceMin.getAttribute('min')),
            'max': Number(filterPriceMax.getAttribute('max')),
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
                return Math.round(value);
            }
        }
    
    });

    filterRange.classList.add('_custome-slider-active');
    
} catch {}

// }



  // Media запросы {

    function debounce(func, time){
        var time = time || 100;
        var timer;
        return function(event){
            if(timer) clearTimeout(timer);
            timer = setTimeout(func, time, event);
        };
      }
      
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

      function resize() {
        
      windowSize = window.innerWidth;
    
      resizeCheckFunc(992, 
        function () {
    
            if(pageAddress) {
                pageAddressInit.append(pageAddress);
            }
            
        },
        function () {
          
            if(pageAddress) {
                pageAddressPlace.append(pageAddress);
            }
          
        });

      resizeCheckFunc(768, 
        function () {
    
            if(appendToMobMenuItems) {
                appendToMobMenuItemsArray.forEach(element => {
                    element[1].append(element[0]);
                });
            }
            
        },
        function () {
          
            if(appendToMobMenuItems) {
                appendToMobMenuItemsArray.forEach(element => {
                    mobMenu.append(element[0]);
                });
            }
          
        });
      
      }
      
      resize();
      
      window.onresize = resize;
      
      // Media запросы }


/* // Анимация {

wow = new WOW({
mobile:       false,
})
wow.init();

// } */

