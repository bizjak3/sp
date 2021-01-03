function validacijaOsebnih() {

    let ime= document.forms["urediOsebne"]["ime"].value;
    if(!ime)
        return false;

    let priimek= document.forms["urediOsebne"]["priimek"].value;
    if(!priimek)
        return false;


    let email= document.forms["urediOsebne"]["email"];
    if(!email.checkValidity())
    {
        document.getElementById("email_error").innerHTML = "Prosimo preverite email naslov";
        return false;
    }
    else {
        if (email) {
            document.getElementById("email_error").innerHTML = "";
        }
    }

    let telefon= document.forms["urediOsebne"]["telefon"].value;
    if (telefon) {
        let phoneno = /^\d{9}$/;
        if(telefon.match(phoneno)){
            document.getElementById("tel_error").innerHTML = "";
        }
        else{
            document.getElementById("tel_error").innerHTML = "Prosimo preverite telefonsko številko";
            return false;
        }

    }

    let geslo= document.forms["urediOsebne"]["geslo"].value;
    let geslo1= document.forms["urediOsebne"]["geslo1"].value;
    if (geslo) {
        if (geslo) {
            if(geslo !== geslo1) {
                document.getElementById("geslo_error").innerHTML = "Gesli se ne ujemata!";
                return false;
            }
            else {
                document.getElementById("geslo_error").innerHTML = "";
            }
        }
    }
    if (geslo.length < 6) {
        document.getElementById("geslo_error").innerHTML = "Gesli mora biti dolo vsaj 6 znakov!";
    }

    return true;


}

function validacijaTekmaUra(){
    var datum = document.forms["ustvari"]["datum"].value;
    var ura = document.forms["ustvari"]["ura"].value;

    let d = new Date(datum); //dd-mm-YYYY
    let t = new Date();
    t.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    console.log(d, t);

    if(d < t) {
        document.getElementById('obvestilo').innerHTML = "Preveri vneseni datum!";
        document.getElementById('obvestilo').style.visibility = "visible";
        return false;
    }else if(d + "" == t + ""){
        var now = new Date();

        console.log((now.getHours() + ":" + now.getMinutes()), ura);
        if (now.getHours() + ":" + now.getMinutes() > ura + "") {
            document.getElementById('obvestilo').innerHTML = "Preveri vneseno uro!";
            document.getElementById('obvestilo').style.visibility = "visible";
            return false;
        }
    }

    return true;
}