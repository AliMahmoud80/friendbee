
$(document).ready(function () {
    $(".navbar-toggler").click(function () {
        $("header").toggleClass("header-burger");
    });

    var selectedCountry = $("#selectedCountry").val();
    $("#countryList option[value=" + selectedCountry + "]").attr("selected", true);

    // $.gdprcookie.init({
    //     title: 'Cookies & Privacy',
    //     message: dictionary.cookieConsentMessage,
    //     acceptBtnLabel: 'Accept all cookies',
    //     advancedBtnLabel: 'Customise cookies',
    //     essentialBtnLabel: 'Accept essential cookies',
    //     cookieTypes: [
    //         {
    //             type: 'Essential',
    //             value: 'essential',
    //             checked: true
    //         },
    //         {
    //             type: 'Analytics',
    //             value: 'analytics',
    //             checked: false
    //         }]
    // });
    $('.collapse').collapse()
});