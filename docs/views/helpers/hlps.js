
module.exports = {
    zvezdica: function (ocena){
        let rezultat = "";
        for(var i = 0; i < 5; i++){
            if(ocena > 0) {
                rezultat += "<span class=\"fa fa-star checked\"></span>";
                ocena --;

            }
            else
                rezultat += "<span class=\"fa fa-star\"></span>";
        }
        return rezultat;
    },
    ocenaIgralca: function (ocena) {
        if(ocena < 2)
            return "<span class=\"badge badge-danger\">SLABA OCENA!</span>";
        if(ocena === 5)
            return "<span class=\"badge btn btn-success\">SUPER OCENA!</span>";

        return "<span class=\"badge btn btn-primary\">POVPREČNA OCENA</span>";
    },
    pridobiMesto: function (kraj) {
        let k = kraj + "";
        let n = k.split(',');
        return n[n.length - 1].slice(1, n[n.length - 1].length);
    },
    upper: function (kraj){
        let k = kraj + "";
        let n = k.split(',');
        return n[n.length - 1].slice(1, n[n.length - 1].length).toUpperCase();
    },
    lower: function (kraj){
        let k = kraj + "";
        let n = k.split(',');
        return n[n.length - 1].slice(1, n[n.length - 1].length).toLowerCase();
    }

    //dodal rihard
    /*
    convert: function(context) {
        return JSON.stringify(context);
    }

     */
 //konec dodaje
};

//dodal rihard
/*
('json', function(context) {
    return JSON.stringify(context);
});
*/

//konec dodaje