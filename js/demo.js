
var $body       = $('body'),
    $characters = $('.characters'),
    $posters    = $('.characters-poster'),
    $names      = $('.characters-list a'),
    $label      = $('.characters-label');

var backgrounds = [
    { src: 'img/background-1.jpg', valign: 'top' },
    { src: 'img/background-2.png', valign: 'top' },
    { src: 'img/background-3.jpg', valign: 'top' },
];

var posters = [
    { src: 'img/poster-1.jpg' },
    { src: 'img/poster-8.jpg' },
    { src: 'img/poster-3.jpg' },
    { src: 'img/poster-4.jpg' },
    { src: 'img/poster-5.jpg' },
    { src: 'img/poster-6.jpg' },
    { src: 'img/poster-7.jpg' },
    { src: 'img/poster-11.jpg' },
    { src: 'img/poster-9.jpg' },
    { src: 'img/poster-10.jpg' }
];

var backdrops = [
    { src: 'img/backdrop-1.jpg' },
    { src: 'img/backdrop-3.png' },
    { src: 'img/backdrop-2.jpg' },
    { src: 'img/backdrop-4.jpg' },
    { src: 'img/backdrop-5.jpg' },
    { src: 'img/backdrop-6.png' },
    { src: 'img/backdrop-7.jpg' },
    { src: 'img/backdrop-8.jpg' },
    { src: 'img/backdrop-9.png' },
    { src: 'img/backdrop-10.jpg' }
];

$('html').addClass('animated');

var displayBackdrops = false;

$body.vegas({
    preload: true,
    //overlay: '/js/vegas/dist/overlays/01.png',
    transitionDuration: 1500,
    delay: 5000,
    slides: backgrounds,
    walk: function (nb, settings) {
        if (settings.video) {
            $('.logo').addClass('collapsed');
        } else {
            $('.logo').removeClass('collapsed');
        }
    }
});

$posters.vegas({
    preload: true,
    transition: 'swirlLeft2',
    transitionDuration: 1000,
    timer: false,
    delay: 4000,
    slides: posters,
    walk: function (nb) {
        $characters
            .find('li')
                .removeClass('active')
                .eq(nb)
                    .addClass('active');

        $label.removeClass('animated');

        setTimeout(function () {
            var name = $names.eq(nb).data('character');

            $label
                .text(name)
                .addClass('animated');
        }, 250);

        if (displayBackdrops === true) {
            var backdrop;

            backdrop = backdrops[nb];
            // backdrop.animation = 'kenburns';
            // backdrop.animationDuration = 20000;
            // backdrop.transition = 'fade';
            // backdrop.transitionDuration = 1000;

            $body
                .vegas('options', 'slides', [ backdrop ])
                .vegas('next');
        }
    }
});

$posters
    .on('mouseenter', function () {
        displayBackdrops = true;

        $posters
            .vegas('trigger', 'walk')
            .vegas('pause');
    })
    .on('click', debounce(function (e) {
        $posters.vegas('next');

        e.preventDefault();
    }, 250, true));

$characters
    .on('mouseenter', function () {
        displayBackdrops = true;
    })
    .on('mouseleave', function () {
        displayBackdrops = false;

        $body
            .vegas('options', 'slides', backgrounds)
            .vegas('next');

        $posters.vegas('play');
    });

$names
    .on('click', function (e) {
        e.preventDefault();
    })
    .on('mouseenter', debounce(function (e) {
        e.preventDefault();

        var index = $(this).index('.characters-list a');

        $posters
            .vegas('jump', index)
            .vegas('pause');
    }, 250));

function debounce (func, wait, immediate) {
    var timeout;
    
    return function () {
        var context = this, 
            args = arguments,
            later = function() {
                timeout = null;

                if (!immediate) {
                    func.apply(context, args);
                }
            },
            callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 500);

        if (callNow) {
            func.apply(context, args);
        }
    };
}
