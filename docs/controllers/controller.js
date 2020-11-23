var zgodovina = (req, res) => {
    res.render('zgodovina',{
        zgodovina: true,
        ime: 'Janez',
        priimek: 'Novak',
        email: "janezek@gmail.com",
        ocena: 3
    });
};

var profil = (req, res) => {
    res.render('profil',{
        profil: true,
        ime: 'Janez',
        priimek: 'Novak',
        email: "janezek@gmail.com",
        ocena: 1
    });
};

var nastavitve = (req, res) => {
    res.render('nastavitve',{
        nastavitve: true,
        ime: 'Janez',
        priimek: 'Novak',
        email: "janezek@gmail.com",
        ocena: 3,
        telefon: '010569412',
        geslo: 'Security? NO'
    });
};

var pop_up_tekma = (req, res) => {
    res.render('pop_up_tekma', {
        ustvari_tekmo: true,
        urejamo: false,
        tekma : {
            kreator : "Janez Novak",
            lokacija : "Ljubljana, Rožna cesta 13",
            datum : "6. 9. 2020",
            ura : "4:20",
            steviloIgralcev: "7",
            maksimalnoSteviloIgralcev: "16",
            opis : "idk nigga",
            igralci : [
                {
                    ime : "janez",
                    rating : "5"
                },
                {
                    ime : "Robi",
                    rating : "4.7"
                }
            ]
        }
    });
};

var ustvari_tekmo = (req, res) => {
    res.render('ustvari_tekmo', {
        ustvari_tekmo: true
    });
};

var homepage = (req, res) => {
    res.render('homepage',{
        layout: false,
        homepage: true,
        ime: 'Janezz',
        priimek: 'Novakk',

        tekma : [
            {
                kraj : "Ljubljana",
                ulica : "Rožna cesta",
                ul_stevilka : "32",
                datum : "20.20.2020",
                ura : "18:00",
                st_igralcev : "4/10",


            },
            {
                kraj : "Novo Mesto",
                ulica : "Kurentska ulica",
                ul_stevilka : "10a",
                datum : "20.11.2011",
                ura : "15:00",
                st_igralcev : "6/16",


            },
            {
                kraj : "Ljubljana",
                ulica : "Celovška",
                ul_stevilka : "1",
                datum : "20.20.2056",
                ura : "12:00",
                st_igralcev : "1/18",


            },

        ]
    });
};

module.exports = {
    pop_up_tekma,
    ustvari_tekmo,
    nastavitve,
    profil,
    zgodovina,
    homepage
};