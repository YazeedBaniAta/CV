/*##############################################################
                 AOS Animation on scroll
 ##############################################################*/

AOS.init();

AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});


$(document).ready(function() {

    /*##############################################################
                 To disappear loader when site completely loaded
    ##############################################################*/
    window.addEventListener('load',function(){
        document.querySelector('body').classList.add("loaded")
    });

    /*##############################################################
                 scroll go to top button
    ##############################################################*/
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#BackToTop').fadeIn();
        } else {
            $('#BackToTop').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#BackToTop').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 100);
        return false;
    });

    /*##############################################################
                 To make smooth scroll
    ##############################################################*/
    var scroll = new SmoothScroll('a[href*="#"]');


    /*##############################################################
                To chang text in header
   ##############################################################*/
    // to change welcome statment
    consoleText(['Welcome To', 'My Portfolio.', 'Iam Yazeed Bani-Ata.'], 'text', ['white', 'white', 'white']);

    function consoleText(words, id, colors) {
        if (colors === undefined) colors = ['#fff'];
        var visible = true;
        var con = document.getElementById('console');
        var letterCount = 1;
        var x = 1;
        var waiting = false;
        var target = document.getElementById(id)
        target.setAttribute('style', 'color:' + colors[0])
        window.setInterval(function () {

            if (letterCount === 0 && waiting === false) {
                waiting = true;
                target.innerHTML = words[0].substring(0, letterCount)
                window.setTimeout(function () {
                    var usedColor = colors.shift();
                    colors.push(usedColor);
                    var usedWord = words.shift();
                    words.push(usedWord);
                    x = 1;
                    target.setAttribute('style', 'color:' + colors[0])
                    letterCount += x;
                    waiting = false;
                }, 1000)
            } else if (letterCount === words[0].length + 1 && waiting === false) {
                waiting = true;
                window.setTimeout(function () {
                    x = -1;
                    letterCount += x;
                    waiting = false;
                }, 1000)
            } else if (waiting === false) {
                target.innerHTML = words[0].substring(0, letterCount)
                letterCount += x;
            }
        }, 120)
        window.setInterval(function () {
            if (visible === true) {
                con.className = 'console-underscore hidden'
                visible = false;

            } else {
                con.className = 'console-underscore'

                visible = true;
            }
        }, 400)
    }


    //to Chang iam Full stake statment
    var words = document.getElementsByClassName('word');
    var wordArray = [];
    var currentWord = 0;

    words[currentWord].style.opacity = 1;
    for (let i = 0; i < words.length; i++) {
        splitLetters(words[i]);
    }

    function changeWord() {
        var cw = wordArray[currentWord];
        var nw = currentWord === words.length-1 ? wordArray[0] : wordArray[currentWord+1];
        for (let i = 0; i < cw.length; i++) {
            animateLetterOut(cw, i);
        }
        for (let i = 0; i < nw.length; i++) {
            nw[i].className = 'letter behind';
            nw[0].parentElement.style.opacity = 1;
            animateLetterIn(nw, i);
        }

        currentWord = (currentWord === wordArray.length-1) ? 0 : currentWord+1;
    }
    function animateLetterOut(cw, i) {
        setTimeout(function() {
            cw[i].className = 'letter out';
        }, i*80);
    }
    function animateLetterIn(nw, i) {
        setTimeout(function() {
            nw[i].className = 'letter in';
        }, 340+(i*80));
    }
    function splitLetters(word) {
        var content = word.innerHTML;
        word.innerHTML = '';
        var letters = [];
        for (var i = 0; i < content.length; i++) {
            var letter = document.createElement('span');
            letter.className = 'letter';
            letter.innerHTML = content.charAt(i);
            word.appendChild(letter);
            letters.push(letter);
        }
        wordArray.push(letters);
    }
    changeWord();
    setInterval(changeWord, 4000);


    /*##############################################################
                To download the Resume
   ##############################################################*/

    $('#download').click(async function (){
        let url = "assets/YazeedBani-AtaCV.pdf";
        let fileName = "Yazeed CV";
        const res = await fetch(url);
        const blob = await res.blob();
        saveAs(blob, fileName);

    });

    /*##############################################################
                scroll-progress in head of site
  ##############################################################*/

    const scrollProgress = document.getElementById('scroll-progress');
    const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

    window.addEventListener('scroll', () => {
        const scrollTop =
            document.body.scrollTop || document.documentElement.scrollTop;
        scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
    });



    /*##############################################################
                make animation for progress-bar
  ##############################################################*/

    $(function() {
        var $progress = $(".progress-bar");
        var $div = $(".progress");
        var $queue = $({});

        function loadDaBars() {
            $progress.each(function() {
                var $el = $(this);
                var origWidth = $el.width();
                $el.width(0);
                $queue.queue(function(next) {
                    $el.animate({
                        width: origWidth
                    }, 600, next);
                });
            });
        }
        $(document).bind('scroll', function() {
            var scrollOffset = $(document).scrollTop();
            var containerOffset = $div.offset().top - window.innerHeight;
            if (scrollOffset > containerOffset) {
                loadDaBars();
                // unbind event not to load scrolsl again
                $(document).unbind('scroll');
            }
        });

    });


});
