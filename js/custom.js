$(document).ready(function () {
    $(".navbar-toggler").click(function () {
        $("header").toggleClass("header-burger");
    });

    var selectedCountry = $("#selectedCountry").val();
    $("#countryList option[value=" + selectedCountry + "]").attr("selected", true);

    $('.collapse').collapse()

    let pathHistory = []

    // Change section content for large screens
    $('.icon-block a').click(function (e) {
        e.preventDefault()
        
        // Activate current icon
        const iconBlock = this.closest('.icon-block')
        $('.icon-block').removeClass('active')
        $(iconBlock).addClass('active')

        // Change section title
        const title = $(iconBlock).find('span').text().replace(/\s+/g, ' ').trim()
        $('.recru-text').text(title)

        // Change section content
        const targetSection = this.href.slice(this.href.indexOf('#')) + '-section'
        if (parseInt($(window).width()) > 991) {
            $('.bottom-section').addClass('d-none')
            $(`${targetSection}`).removeClass('d-none')
        }
    })

    // Show target tap-pane
    function showTabPane (targetTab) {
        // Hide all
        $('.tab-pane').removeClass('show').removeClass('active')

        // Show target
        $(targetTab).addClass('show').addClass('active').show()
    }

    // Go Back
    function goBack () {
        // Hide current section
        $(pathHistory[pathHistory.length - 1]).hide()

        // show last section if exist, otherwise go root
        console.log(pathHistory[pathHistory.length - 2], pathHistory)
        if (pathHistory[pathHistory.length - 2] == undefined) {
            $('.icons-container').show()
            $('.breadcrumb-container').addClass('d-none')
            $('.breadcrumb-container nav ol').children().last().remove()
            pathHistory = []
            updateBreadcrumb()
        } else {
            $(pathHistory[pathHistory.length - 2] + ' .sidebar-container').show()
            $('.tap-pane').removeClass('show')
            $('.tap-pane').removeClass('active')    
            pathHistory.pop()
            updateBreadcrumb()
        }
    }

    $('.breadcrumb').children().first().click(() => { goBack() })

    // Update breadcrumb content 
    function updateBreadcrumb () {
        const childs = $('.breadcrumb').children()
        
        if (pathHistory.length == 2) {
            $(childs[1]).css('text-decoration', 'underline')
            $(childs[1]).click(function () {
                goBack()
            })
            const title = $(`a[href="${pathHistory[1]}"]`).text()
            $('.breadcrumb').append(`<li class="breadcrumb-item" aria-current="page">${title}</li>`)
        } else if (pathHistory.length == 1 && childs.length == 2) {
            $('.breadcrumb').children().last().remove()
        } else if (childs.length > 1){
            $('.breadcrumb').children().last().remove()
        }
    }

    // Change section content for small screens
    if (parseInt($(window).width()) < 991) {
        $('.icon-block a').click(function (e) {
            const targetSection = this.href.slice(this.href.indexOf('#')) + '-section'
            const iconBlock = this.closest('.icon-block')
            const title = $(iconBlock).find('span').text().replace(/\s+/g, ' ').trim()


            $('.icons-container').hide()
            $('.breadcrumb-container').removeClass('d-none') // show breadcrumb
            
            // Show breadcrumb and add target section title
            $('.breadcrumb-container nav ol').append(`<li class="breadcrumb-item active" aria-current="page">${title}</li>`)

            // Save to history
            pathHistory.push(targetSection)
            
            // Show targeted section 
            $(targetSection).show()
            $(targetSection).removeClass('d-none')

            // Show targeted section's sidebar
            $(`${targetSection} .sidebar-container`).removeClass('d-none')
            $(`${targetSection} .sidebar-container`).show()
            $('.sidebar-container-left').css('border', 'none')
            $('.sidebar-container .nav-link').removeClass('active')
            $('.sidebar-container .nav-link').removeClass('active')            
        })

        // Sidebar Navigateion 
        $('.sidebar-container .nav-item .nav-link').click(function () {
            const targetTab = $(this).prop('href').slice(this.href.indexOf('#'))
            
            // Hide Sidebar
            $('.sidebar-container').hide()
    
            showTabPane(targetTab)

            pathHistory.push(targetTab)
    
            $('.faq-content').removeClass('d-none')

            updateBreadcrumb()
        })

        // Back Button
        $('.back-btn').click(function () { goBack() })
    }
});