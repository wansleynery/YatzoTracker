

let countryFeedKey = 'us';
let countryName = 'USA';
let countryData = '';


(function () {

    $(document).ready(() => {

        (function blink () {
            $('.blink').fadeOut(750).fadeIn(750, blink);
        })()

    });

})()


function formatNumber(number, precision, separate, separator, comma) {

    if (!number) { return ''; }

    var re = '\\\d(?=(\\d{' + (separate || 3) + '})+' + (precision > 0 ? '\\D' : '$') + ')',
        num = number.toFixed(Math.max(0, ~~precision));

    return (coma ? num.replace('.', comma) : num).replace(new RegExp(re, 'g'), '$&' + (separator || ','));
};


if ($('#svgMap').length === 1) {
    // https://github.com/StephanWagner/svgMap
    new svgMap({
        targetElementID: 'svgMap',
        data: {
            data: {
                infectionPercent: {
                    name: 'Percent of infection',
                    format: '{0} %',
                    thresholdMax: 100,
                    thresholdMin: 0
                },
                change: {
                    name: 'Change to year before',
                    format: '{0} %'
                },
                confirmed: {
                    name: 'Confirmed',
                    format: '{0} %'
                }
            },
            applyData: 'infectionPercent',
            values: {
                'US': { infectionPercent: 2, change: 4.73 },
                //AL: { gdp: 4583, change: 11.09 },
                //DZ: { gdp: 4293, change: 10.01 }
                // ...
            }
        },
        maxZoom: 1,
        noDataText: '',
        colorMax: '#ABC',
        colorMin: '#FFF',
        colorNoData:'#E2E2E2'
    });
}