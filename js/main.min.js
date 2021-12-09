

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



let image = document.querySelector('.about-us__bg--elem-img'),
    point = document.querySelector('.about-us__map-point');

//console.log(image.clientHeight);

image.addEventListener('load', function() {
    //console.log('loaded');

   /*  let coords = [image.clientWidth / 2.12, image.clientHeight / 2.8];

    point.style.left = coords[0] + 'px';
    point.style.top = coords[1] + 'px'; */
    //console.log(coords);
})



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

      function resize() {
        
      windowSize = window.innerWidth;
    
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

