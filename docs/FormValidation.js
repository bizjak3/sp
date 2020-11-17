const mail = document.getElementById('email')
const password = document.getElementById('geslo')
const form = document.getElementById('form1')

a = {"users":[
        {"mail":"t.leghissa@gmail.com", "password":"password123"},
        {"mail":"anton@gmail.com", "password":"anton1A"},
        {"mail":"primer@libero.it", "password":"mama123"}
    ]};



form.addEventListener('submit', (e) => {
    let messages = [];

    let anton = true;

    mailInput = mail.value;
    passwordInput = password.value;

    for (i in a.users) {
        m = a.users[i].mail;
        p = a.users[i].password;
        if (mailInput === m && passwordInput === p) {
            anton = false;
        }
        if (mailInput === m && passwordInput != p) {
            e.preventDefault()
            anton = false;
            document.getElementById("email").style.border = "2px solid green"
            document.getElementById("geslo").style.border = "2px solid red"
            $("#napacnoGeslo").show();
            $("#napacenUporabnik").hide();

        }
    }
    if (anton) {
        $("#napacenUporabnik").show();
        document.getElementById("email").style.border = "2px solid red"
        e.preventDefault()
    }
})


var ime = document.getElementById('name')
var priimek = document.getElementById('surname')
var mailReg = document.getElementById('emailReg')
var gesloReg = document.getElementById('gesloReg')
var datumRojstva = document.getElementById('datumRojstva')
var spol = document.getElementById('inlineFormCustomSelectPref')
const formReg = document.getElementById('formRegistracija')


formReg.addEventListener('submit', (e) => {

    let dodam = true
    var spol1 = ""

    for (i in a.users) {
        if (mailReg.value === a.users[i].mail){
            document.getElementById("emailReg").style.border = "2px solid red"
            $("#zeObstaja").show();
            dodam = false
            e.preventDefault()
        }
        else {
            $("#zeObstaja").hide();
        }
    }

    var bool = validatePassword()

    if (dodam === true && bool === true) {
        document.getElementById("emailReg").style.border = "2px solid green"
        $("#zeObstaja").hide();
        a.users.push({"ime": ime.value, "priimek": priimek.value, "datum rojstva": datumRojstva.value, "spol": spol.value, "mail": mailReg.value, "password": gesloReg.value})
    }
    else {
        e.preventDefault()
    }
})

function validatePassword() {
    var p = document.getElementById('gesloReg').value;

    let err = false;
    if (p.length < 6) {
        $("#gesloDolzina").show();
        err = true;
    }
    if (p.length >= 6) {
        $("#gesloDolzina").hide();
        err = false;
    }
    if (p.search(/[a-z]/i) < 0) {
        $("#gesloCrka").show();
        err = true;
    }
    if (p.search(/[a-z]/i) > 0) {
        $("#gesloCrka").hide();
        err = false;
    }
    if (p.search(/[0-9]/) < 0) {
        $("#gesloStevilo").show();
        err = true;
    }
    if (p.search(/[0-9]/) > 0) {
        $("#gesloStevilo").hide();
        err = false;
    }

    if (err) {
        return false;
    }

    return true;
}
