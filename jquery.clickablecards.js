/**
 * Clickable cards jQuery plugin
 *
 * Adds clickable area to selected elements. Wherever user clicks within area he will be redirected to predifinded url.
 * Some elements in clickable area can be excluded from this rule (links are excluded by default). 
 * In case that we don't define default url first link from clickable area will be used.
 * All onclick methods for default url will be triggered before redirection.
 *
 * @autor Branko Sekulic
 *
 * @param {string} hoverClass - class which will be added on hover
 * @param {string} defaultLink - url where user will be redirected on click, first link from clickable area by default.
 * @param {array} exclude - array of elements within clickable area which clickableCards won't be applied on.
 * @example:
 * $('.v_resultItem').clickableCard({
 *      'defaultLink' : '.v_resultItemTitle a',
 *      'exclude' : ['.v_freeCarfax', '.v_Carfax', '.v_ab_interested', '.v_DefaultOverlayOpen'],
 *      'hoverClass' : 'hoverClassName'
 *  });
 * @copyright vast.com
 */

$.fn.clickableCards = $.fn.clickablecards = function(options) {

    var i,
        that = this,
        defaults = {
            'hoverClass': 'v_clickable_cards_hover',
            'exclude': []
        };

    options = $.extend(defaults, options);

    $(this).css('cursor', 'pointer');

    for (i in options.exclude) {
        $(this).find(options.exclude[i]).on('click', function(e) {
            $(that).data('clickable-exclude', 'click');
        });
    }

    $(this).on('click', function(e) {

        /** Calculating targeted link */
        var target = e.target,
            href,
            selector,
            tagName = target.tagName.toUpperCase();
        
        if($(this).data('clickable-exclude') == 'click'){
            /** Handling excluded elements */
            $(that).data('clickable-exclude', '');
        }else if (!((tagName == 'A' || $(target).parents('a').length) && $(this).data('clickable-trigger') != 'click')) {
            /** Don't apply clckable cards by clicking on some link inside clickable area */
            e.preventDefault();
            if (tagName == 'A' && $(this).data('clickable-trigger') == 'click') {

                /** Click is triggered */
                href = $(target).attr('href');
                $(this).data('clickable-trigger', '');

                if ($(target).attr('target') == '_blank') {
                    window.open(href);
                } else if ($(target).attr('target') == '_parent') {
                    window.parent.location = href;
                } else {
                    window.location = href;
                }
            } else {

                /** User clicked somewhere on clickable area */
                selector = options.defaultLink ? options.defaultLink : 'a:first';
                relatedLink = $(this).find(selector);

                $(this).data('clickable-trigger', 'click');
                /** Trigger click on default link in order to execute attached events */
                relatedLink.trigger('click');
            }
        }
    });

    $(this).on('mouseover', function() {
        $(this).addClass(options.hoverClass);
    });

    $(this).on('mouseout', function() {
        $(this).removeClass(options.hoverClass);
    });
};