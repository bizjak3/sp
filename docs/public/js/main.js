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