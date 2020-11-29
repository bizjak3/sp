# Spletno programiranje 2020/2021

Dokumentacija lastnega projekta pri predmetu **Spletno programiranje** v študijskem letu **2020/2021**.

#Tap & Play

# 1.LP

Spletna aplikacija omogoča navdušencem nogometa hiter in varen zmenek za tekmo. Vsak igralec lahko ustvari novo igro ali se lahko pridruži že obstoječim. Že obstoječe tekme so vidne na zemljevidu. Najdemo pa jih tudi na seznamu. Po končani tekmi lahko vsak uporabnik oceni svoje soigrali in nasprotnike. Popvrečna ocena bo vidna v profilu.  


## Prijava in registracija uporabnika
### [Prijava.html](Prijava.html)

Stran omogoča prijavo posameznega igralca v spletno aplikacijo. Tu dobimo navaden form za prijavo, kjer mora uporabnik vnesti elektronski naslov in geslo.   
Če uporabnik ni še prijavljen v spletno aplikacijo se lahko registrira. Pojavi se "Pop-up" v katerem uporabnik vnese lastne podatke.


Na dnu strani dobimo tudi "footer", v katerem se nahaja kratek opis spletne aplikacije, vir zemljevida ter vir vremena.    
Na koncu pa še kontaktne informacije.

#### Prilagajanje strani

Stran se prilagodi glede na velikost ekrana. Na računalnikih in večjih tablicah bo v ospredju "Tap&Play" logo ter napis, ob strani pa obrazec za prijavo.   
Če uporabljamo manjši zaslon, kot je lahko pametni telefon, bo na ekranu viden samo obrazec za prijavo ali registracijo. Logo in ime spletne aplikacije dobimo pa v "Headerju".

# 2.LP

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


##Link do heroku aplikacije
https://tap-play.herokuapp.com/

##Navodila za namestitev in zagon aplikacije
Sprva pridobite našo aplikacijo preko GIT-a. To lahko storite kar znotraj "Webstorma", s tem da kopirate naš repozitorij ali kar shranite zip datoteko.   
Znotraj datoteke se v terminalu premaknete v docs (cd docs). Aplikacijo boste zagnali v Docker-ju. V terminal napišete " docker-compose up ". Nato počakate,
da se shranijo vsi moduli. Ko bo tega konec bo naša aplikacija dostopna na " localhost ".   
Nato morate dostopat do localhost/db. Tu lahko vnesete testne podatke. Nato pa se lahko kot uporabnik registrirate in prijavite
