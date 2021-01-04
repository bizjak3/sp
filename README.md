# Spletno programiranje 2020/2021

Lastni projekt pri predmetu **Spletno programiranje** v študijskem letu **2020/2021**.


## 1. LP

### Tap & Play

Spletna aplikacija omogoča navdušencem nogometa hitro in varno organizacijo tekem. Vsak igralec lahko ustvari novo igro ali pa se pridruži že obstoječim. Že obstoječe tekme so vidne na zemljevidu, najdemo pa jih tudi na seznamu. Po končani tekmi lahko vsak uporabnik oceni svoje soigralce in nasprotnike glede zanesljivosti in točnosti. Povprečna ocena skupaj z ostalimi informacijami uporabnika je vidna v profilu. 


### Prijava in registracija uporabnika
#### [Prijava.html](docs/Prijava.html)

Stran omogoča prijavo posameznega igralca v spletno aplikacijo. Tu dobimo navaden form za prijavo, kjer mora uporabnik vnesti elektronski naslov in geslo.   
Če uporabnik ni še prijavljen v spletno aplikacijo se lahko registrira. Pojavi se "Pop-up" v katerem uporabnik vnese lastne podatke.


Na dnu strani dobimo tudi "footer", v katerem se nahaja kratek opis spletne aplikacije, vir zemljevida ter vir vremena.    
Na koncu pa še kontaktne informacije.

##### Prilagajanje strani

Stran se prilagodi glede na velikost ekrana. Na računalnikih in večjih tablicah bo v ospredju "Tap&Play" logo ter napis, ob strani pa obrazec za prijavo.   
Če uporabljamo manjši zaslon, kot je lahko pametni telefon, bo na ekranu viden samo obrazec za prijavo ali registracijo. Logo in ime spletne aplikacije dobimo pa v "Headerju".

## Uporabniški profil
V sistemu obstajata dve vrsti uporabnikov: običajen uporabnik in moderator. Moderator ima opcijo onemogočiti uporabnika za do 30dni ter lahko izbriše/prekliče tudi tekme ki jih ni sam ustvaril.

### Pregled uporabniškega profila 
Stran do katere lahko vsak prijavljen uporabnik dostopa prek navigacijske vrstice..
Stran je razdeljena na levo kartico, kjer je navigacijski stolpec ter slika, kratek opis igralca ter njegova ocena, ter desno stran kjer se glede na izbran pogled vsebina spreminja.

#### [profil](docs/oldHTML/profil.html)
Tukaj so splošne informacije igralca kot so ime ter priimek, email in telefon. Do tega pogleda(v okrnjeni obliki) lahko dostopajo tudi ostali igralci, vidijo pa le kar jim uporabnik omogoči pod nastavitvami.

#### [zgodovina](docs/oldHTML/zgodovina.html)
Tukaj si lahko uporabnik ogleda pretekle tekme. Ko se tekma zaključi lahko preko "pop upa" (klik na tekmo) oceni soigralce ki so sodelovali v tekmi.

#### [nastavitve](docs/oldHTML/nastavitve.html)
Tukaj lahko uporabnik spreminja osebene podatke ter lahko nastavlja katere informacije bodo dostopne drugim uporabnikom, ter kako ga lahko aplikacija obvešča o dogodkih.


### Dodajanje tekme
#### [ustvari_tekmo.html](docs/oldHTML/ustvari_tekmo.html)

Stran je namenjena kreiranju novega vnosa tekme. Obvezno je treba izpolniti parametre lokacija, datum, ura in število igralcev. Pod število igralcev je obvezno vnesti samo minimalno število. Maksimalno število lahko opcijsko spremenimo, sicer se privzeto izbere. Število že prijavljenih je namenjeno, da lahko "dodamo" igralce ki nimajo računa. Kot dodatno polje je polje za opombe, ki ni obvezno. Lahko pa dodamo različne opombe o zahtevah, priporočilih ali obvestilih.

### Podroben opis tekme
#### [pop_up_tekma.html](docs/oldHTML/pop_up_tekma.html)

Pop-up je namenjen podrobnejšemu prikazu tekme (master/detail vzorec) in možnosti prijave/odjave igralcev. Kreator in moderator pa imasta možnost urejanja in brisanja tekme. Pop-up prikazuje lokacijo v vtičniku Google maps in vreme v vtičniku ARSO.

Ko se tekma zaključi, lahko igralci na tem pogledu ocenijo njihove soigralce.

### Domača stran
#### [homepage.html](docs/homepage.html)

Domača stran je namenjena prikazu vseh prihajajočih tekem. Vse tekme so označene na zemljevidu (vstavljen preko Google maps), prav tako je desno od zemljevida seznam vseh tekem, na katerem so naštete tekme s splošnimi informacijami (število prostih mest, kraj, datum, ura). Spodaj desno je še gumb "ustvari novo tekmo", ki uporabnika popelje do strani na kateri lahko doda tekmo. S klikom na kazalec tekme na zemljevidu, ali pa s klikom tekme v seznamu se pojavi pojavno okno z več podrobnostmi glede tekme. V naglavni vrstici strani je tudi polje za iskanje po tekmah in uporabnikih ter ikona, po kateri lahko uporabnik dostopa do svojega profila, zgodovine, nastavitev, ali pa se odjavi.

(Master/detail vzorec => seznam vseh tekem)

### Razlike med brskalniki

* Firefox se razlikuje od brskalnika Chrome in Opera v tem, da kot privzeto temo uporablja temo operacijskega sistema in ne lastne
    * Drsna vrstica je drugačna
    * Barve vnosnih polj so drugačne
    * Označen tekst se drugače obarva
* Opera in Chrome pri vnosnih poljih tipa **ura** in **datum** samodejno vključita tudi ustrezni ikoni, medtem ko Firefox tega ne stori
* Firefox ima v vnosnem polju **ura** 12-urni način, Chrome in Opera pa imata 24-urni način


# 2.LP

Dinamična spletna aplikacija z logiko na strani strežnika

## Vnosna polja

#### Login stran
* mail - elektronski naslov. Dovoljen je le naslov tipa a@b.c
* geslo - geslo uporabnika, geslo mora biti enako geslu, s katerim se je uporabnik registriral. Dovoljeni so vsi znaki, pod pogojem da je geslo dolžine najmanj 6 znakov.

##### Pozabil sem geslo
* mail - elektronski naslov na katerega se pošlje novo zgenerirano geslo. Dovljen naslov tipa a@b.c

#### Registracija
* ime - ime uporabnika. Dovoljeni so vsi znaki.  
* priimek - priimek uporabnika. Dovoljeni so vsi znaki.
* mail - elektronski naslov uporabnika. Dovoljen je le naslov tipa a@b.c
* gesli - geslo uporabnika, gesli se morata ujemati in biti dolgi vsaj 6 znakov.

#### Homepage
* išči - poišče se uporabnika ali tekmo. Dovoljeni so vsi znaki.

#### Ustvarjanje tekme
* kraj - kraj tekme. Izbere se s klikom na zemljevid. Ob kliku na zemljevid se v polju "Kraj" samodejno zapiše naslov, ki ga uporabnik ne more spreminjati.
* datum - datum tekme. Dovoljen vnos tipa datum. 
* ura - ura tekme. Dovoljen vnos tipa ure.
* minimalno število igralcev - min. število igralcev na tekmi. Dovoljeno je sodo število večje ali enako 4.  
* maksimalno število igralcev - max. število igralcev na tekmi. Dovoljeno je pozitivno sodo število večje ali enako 4. 
* že prijavljeni - število igralcev, ki se bodo udeležili tekmi a niso prijavljeni v aplikacijo. 
* opombe - Dovoljeni so vsi znaki.

#### Urejanje osebnih podatkov
* ime - lahko spremenimo ime uporabnika. Dovoljeni so vsi znaki.
* priimek - lahko spremenimo priimek uporabnika. Dovoljeni so vsi znaki.
* mail - lahko spremenimo mail uporabnika. Dovoljen je le naslov tipa a@b.c
* telefon - dodamo/spremenimo telefon uporabnika. Dovoljenih je 9 števk.  
* geslo - zamenjava gesla, vsaj 6 znakov. Dovoljeni so vsi znaki.
* spremembra profilne slike - lahko naložimo sliko in jo nastavimo kot profilno sliko.

#### Urejanje tekme
* datum - dovoljen je tip vnosa datum.
* ura - dovoljen je tip vnosa ura.
* opombe - dovoljeni so vsi znaki.

#### Ocenjevanje uporabnikov
* ocena - vnosno polje je dropdown s števili od 1 - 5.

## Npm knjižnice
#### bcrypt
Bcrypt uporabljamo za kodiranje gesla. V bazo ne shranimo geslo kot je bilo napisano. Shranimo hash, ki ga s pomočjo funkcij v bcryptu ustvarimo.  
Uporabljamo tudi funkcijo bcryt compare, ki vnešeno geslo v form preveri če je enako šifriranemu geslu v podatkovni bazi.

#### express-flash
Express-flash uporabimo za prikaz sporočil. Če se pojavi napaka se pojavi "flash-message", v katerem je zapisano besedilo, ki je povezano s tipom napake.

#### passport, passport-local
Passport se uporabi za validacijo uporabnika. S passport knjižnico se preveri če je geslo uporabnika pravilno. S passportom naredimo, da če uporabnik ni prijavljen ne mora na homepage. 
Pošlje ga na login stran.

#### @sendgrid/mail
Uporabljamo za pošiljanje emailov preko sendgrid api-ja.

#### gridfs-stream
Za "stream" datoteke na bazo (uporabljeno pri zamenjavi slike profila).

#### multer & multer-gridfs-storage
Za razkosavanje datoteke na manjše kose (uporabljeno pri zamenjavi slike profila).

#### http
Knjižnica je uporabljena za dostopanje do podatkov za različna opozorila.

#### openweather-apis
Uporabljena za pridobitev podatkov glede trenutnega vremena.

## Delovanje na različnih napravah
Aplikacija deluje na telefonu, tablici in računalniku. Testirali smo na več napravah različnih velikosti.


## 3. LP

Dinamična spletna aplikacija s podatkovno bazo

## Link do heroku aplikacije
https://tap-n-play.herokuapp.com

## Navodila za namestitev in zagon aplikacije
* Sprva pridobite našo aplikacijo z GIT-a. To lahko storite kar znotraj "Webstorma", s tem da klonirate naš repozitorij (Get from version control), ali pa kar shranite zip datoteko.   
* Znotraj datoteke se v terminalu premaknete v mapo docs ("cd docs"). Aplikacijo boste zagnali v Docker-ju. V terminal napišete "docker-compose up". Nato počakate, da se naložijo vse potrebne datoteke in vzpostavi okolje.
* Po koncu zgornjega procesa je aplikacija dostopna na localhost naslovu.   
* Sedaj lahko aplikacijo normalno uporabljate. Če hočete vnesti nekaj testnih vnosov lahko dostopate do localhost/db. Tam lahko vnesete testne podatke.


## 4. LP

Ukazi za zagon aplikacije:
* Sprva pridobite našo aplikacijo z GIT-a. To lahko storite kar znotraj "Webstorma", s tem da klonirate naš repozitorij (Get from version control), ali pa kar shranite zip datoteko.   
* Znotraj datoteke se v terminalu premaknete v mapo Angular ("cd Angular"). Aplikacijo boste zagnali v Docker-ju ali lokalno. V terminal napišete "npm install". Nato počakate, da se naložijo vse potrebne datoteke in vzpostavi okolje. 
* V terminal se nato vpiše "npm start" za zagon strežnika.
* Odpremo novo instanco terminala, brez zapiranja prejšnjega, ter se postavimo v mapo "app_public", in nato za lokalno vzpostavitev vpišemo "ng serve", za Docker pa "npm run build-docker".
* Če smo aplikacijo zagnali v Dockerju je ta dostopna na localhost:3000, če pa lokalno je dostopna na localhost:4200

Povezava do heroku aplikacije:
https://ang-tap-play.herokuapp.com/

## 5. LP

Varnostno zaščitena progresivna aplikacija

### Razlike med uporabniki

Na voljo so 3 različni tipi uporabnikov:
* Gost - Kot gost lahko brskamo po tekmah in uporabnikih, ne moremo pa uporabljati vseh funkcionalnosti navadnega uporabnika.
* Navaden uporabnik - Navaden uporabnik lahko uporablja iste funkcionalnosti kot gost in dodatne funkcionalnosti kot so ustvarjanje tekme, urejanje in brisanje lastnih tekem ter prijava in odjava na ustvarjene tekme. Lahko tudi oceni igralce na igranih tekmah.
* Administrator - Administrator ima iste možnosti kot uporabnik s tem, da lahko ureja in briše tudi tekme, ki jih ni ustvaril. 
  

### OWASP ZAP report
Po prvem generiranju poročila smo odstranili nekaj napak, in sicer:
* X-Frame-Options Header Not Set
* Cross Site Scripting Weakness (Reflected in JSON Response)
* Server Leaks Information via "X-Powered-By" HTTP Response Header Field(s)

Ostali pa so nam še dve "napaki" srednje nevarnosti, ki se jih zaradi uporabe APIja ne moremo izogniti.
#### Cross-Domain Misconfiguration
Ta napaka je zato ker imamo "res.header('Access-Control-Allow-Origin', '*');" Lahko bi spremenili * v link na heroku, vendar zaradi omejitev testa ne moremo pognati na heroku, torej napaka ostaja v poročilu.

#### CSP: Wildccard Directive
Napaka je zaradi vračanja statičnih podatkov iz strežnika in se ji ne moremo izogniti. 

### Lighthouse
* enable text compression
nismo omogočili samo na heroku, ker na heroku text compression ni delalo
* buttons do not have accessible name
zato ker nekaterim gumbom zaradi estetske vrednosti, nismo hoteli dodati tekstovnega imena v gumb
* The page does not contain a heading, skip link, or landmark region
nismo popravili ker heading imamo v index.html, skip link in landmark region, nismo hoteli onemogočati dostopnosti ponovljivih elementov s tipkovnico, ker hočemo da so vsi elementi dostopni s tipkovnico
* Background and foreground colors do not have a sufficient contrast ratio.
ni napaka, je namensko tako, zaradi izgleda, ki smo ga hoteli
* List items (<li>) are not contained within <ul> or <ol> parent elements.
napako da, zaradi načina uporabe "pagination"
* Missing source maps for large first-party JavaScript
nismo dali obeh datotek, zaradi izgube na hitrosti
