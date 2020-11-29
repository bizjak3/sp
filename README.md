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

### Razlike med brskalniki

* Firefox se razlikuje od brskalnika Chrome in Opera v tem, da kot privzeto temo uporablja temo operacijskega sistema in ne lastne
    * Drsna vrstica je drugačna
    * Barve vnosnih polj so drugačne
    * Označen tekst se drugače obarva
* Opera in Chrome pri vnosnih poljih tipa **ura** in **datum** samodejno vključita tudi ustrezni ikoni, medtem ko Firefox tega ne stori
* Firefox ima v vnosnem polju **ura** 12-urni način, Chrome in Opera pa imata 24-urni način


# 2.LP

Dinamična spletna aplikacija z logiko na strani strežnika

##Vnosna polja

####Login stran
* mail - elektronski naslov. Dovoljen je le naslov tipa a@b.c
* geslo - geslo uporabnika, geslo mora biti enako geslu, s katerim se je uporabnik registriral

#####Pozabil sem geslo
* mail - elektronski naslov na katerega se pošlje novo zgenerirano geslo. Dovljen naslov tipa a@b.c

####Registracija
* ime - ime uporabnika.   
* priimek - priimek uporabnika  
* mail - elektronski naslov uporabnika. Dovoljen je le naslov tipa a@b.c
* gesli - geslo uporabnika, gesli se morata ujemati in biti dolgi vsaj 6 znakov  

####Homepage
* išči - poišče se uporabnika ali tekmo

####Ustvarjanje tekme
* kraj - kraj tekme. Izbere se na zemljevidu. Ob kliku na zemljevid se v polju "Kraj" zapiše naslov 
* datum - datum tekme. Oblika datuma  
* ura - ura tekme  
* minimalno število igralcev - min. število igralcev na tekmi  
* maksimalno število igralcev - max. število igralcev na tekmi  
* že prijavljeni - število igralcev, ki se bodo udeležili tekmi a niso prijavljeni v aplikacija  

####Urejanje osebnih podatkov
* ime - lahko spremenimo ime uporabnika
* priimek - lahko spremenimo priimek uporabnika
* mail - lahko spremenimo mail uporabnika. Dovoljen je le naslov tipa a@b.c
* telefon - dodamo/spremenimo telefon uporabnika. Dovoljenih je 9 števk.  
* geslo - zamenjava gesla, vsaj 6 znakov
* spremembra profilne slike - lahko uploadamo jpeg ali png sliko in jo nastavimo kot profilno sliko

##Npm knjižnice
####bcrypt
Bcrypt uporabljamo za kodiranje gesla. V bazo ne shranimo geslo kot je bilo napisano. Shranimo hash, ki ga s pomočjo funkcij v bcryptu ustvarimo.  
Uporabljamo tudi funkcijo bcryt compare, ki vnešeno geslo v form preveri če je enako šifriranemu geslu v podatkovni bazi.

####express-flash
Express-flash uporabimo za pokaz sporočil. Če se pojavi napaka se pojavi "flash-message", v katerem je zapisano besedilo, ki je povezano s tipom napake

####passport, passport-local
Passport se uporabi za validacijo uporabnika. S passport knjižnico se preveri če je geslo uporabnika pravilno. S passportom naredimo, da če uporabnik ni prijavljen ne mora na homepage. 
Pošlje ga na login stran.





##Link do heroku aplikacije
https://tap-play.herokuapp.com/

##Navodila za namestitev in zagon aplikacije
Sprva pridobite našo aplikacijo preko GIT-a. To lahko storite kar znotraj "Webstorma", s tem da kopirate naš repozitorij ali kar shranite zip datoteko.   
Znotraj datoteke se v terminalu premaknete v docs (cd docs). Aplikacijo boste zagnali v Docker-ju. V terminal napišete " docker-compose up ". Nato počakate,
da se shranijo vsi moduli. Ko bo tega konec bo naša aplikacija dostopna na " localhost ".   
Nato morate dostopat do localhost/db. Tu lahko vnesete testne podatke. Nato pa se lahko kot uporabnik registrirate in prijavite




## 3. LP

Dinamična spletna aplikacija s podatkovno bazo


## 4. LP

SPA aplikacija na eni strani


## 5. LP

Varnostno zaščitena progresivna aplikacija
