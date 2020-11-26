function urediZasebnost(id) {
    if (document.getElementById('emailPokazi').checked){
        //axios.delete("/users/"+id).then(function(response) {
        console.log("Drugi vidijo moj email");
    }
    if (document.getElementById('telPokazi').checked){
        //axios.delete("/users/"+id).then(function(response) {
        console.log("drugi vidijo mojo tel");
    }
}

function urediObvescanje(id) {
    if (document.getElementById('emailPrihajujoča').checked){
        //axios.delete("/users/"+id).then(function(response) {
        console.log("Obvesti me o prihajajoči tekmi na email");
    }
    if (document.getElementById('smsPrihajujoča').checked){
        //axios.delete("/users/"+id).then(function(response) {
        console.log("Obvesti me o prihajajoči tekmi na sms");
    }
    if (document.getElementById('emailodpoved').checked){
        //axios.delete("/users/"+id).then(function(response) {
        console.log("Obvesti me o odpadli tekmi na email");
    }
    if (document.getElementById('smsOdpoved').checked){
        //axios.delete("/users/"+id).then(function(response) {
        console.log("Obvesti me o odpadli tekmi na sms");
    }
}

function urediOsebne() {

    let ime=document.getElementById("ime");
    if (ime && ime.value) {
        console.log(ime.value);
    }

    let priimek=document.getElementById("priimek");
    if (priimek && priimek.value) {
        console.log(priimek.value);
    }

    let email=document.getElementById("email");
    if(!email.checkValidity())
    {
        document.getElementById("email_error").innerHTML = "Prosimo preverite email naslov";
    }
    else {
        if (email && email.value) {
            document.getElementById("email_error").innerHTML = "";
            console.log(email.value);
        }
    }

    let telefon=document.getElementById("telefon");
    if (telefon && telefon.value) {
        var phoneno = /^\d{9}$/;
        if(telefon.value.match(phoneno)){
            console.log(telefon.value);
            document.getElementById("tel_error").innerHTML = "";
        }
        else{
            document.getElementById("tel_error").innerHTML = "Prosimo preverite telefonsko številko";
        }

    }

    let geslo=document.getElementById("geslo");
    let geslo1=document.getElementById("geslo1");
    if (geslo && geslo.value) {
        if (geslo && geslo.value) {
            if(geslo.value !== geslo1.value)
                document.getElementById("geslo_error").innerHTML = "Gesli se ne ujemata";
            else {
                document.getElementById("geslo_error").innerHTML = "";
                console.log(geslo.value);
            }
        }

    }


}
