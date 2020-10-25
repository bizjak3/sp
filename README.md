# Spletno programiranje 2020/2021

Lastni projekt pri predmetu **Spletno programiranje** v študijskem letu **2020/2021**.


## 1. LP

###Tap & Play

Spletna aplikacija omogoča navdušencem nogometa hiter in varen zmenek za tekmo. Vsak igralec lahko ustvari novo igro ali se lahko pridruži že obstoječim. Že obstoječe tekme so vidne na zemljevidu. Najdemo pa jih tudi na seznamu. Po končani tekmi lahko vsak uporabnik oceni svoje soigralce in nasprotnike. Popvrečna ocena bo vidna v profilu.  


### Prijava in registracija uporabnika
#### [Prijava.html](docs/Prijava.html)

Stran omogoča prijavo posameznega igralca v spletno aplikacijo. Tu dobimo navaden form za prijavo, kjer mora uporabnik vnesti elektronski naslov in geslo.   
Če uporabnik ni še prijavljen v spletno aplikacijo se lahko registrira. Pojavi se "Pop-up" v katerem uporabnik vnese lastne podatke.


Na dnu strani dobimo tudi "footer", v katerem se nahaja kratek opis spletne aplikacije, vir zemljevida ter vir vremena.    
Na koncu pa še kontaktne informacije.

##### Prilagajanje strani

Stran se prilagodi glede na velikost ekrana. Na računalnikih in večjih tablicah bo v ospredju "Tap&Play" logo ter napis, ob strani pa obrazec za prijavo.   
Če uporabljamo manjši zaslon, kot je lahko pametni telefon, bo na ekranu viden samo obrazec za prijavo ali registracijo. Logo in ime spletne aplikacije dobimo pa v "Headerju".

### Dodajanje tekme
#### [ustvari_tekmo.html](docs/ustvari_tekmo.html)

Stran je namenjena kreiranju novega vnosa tekme. Obvezno je treba izpolniti parametre lokacija, datum, ura in število igralcev. Pod število igralcev je obvezno vnesti samo minimalno število. Maksimalno število lahko opcijsko spremenimo, sicer se privzeto izbere. Število že prijavljenih je namenjeno, da lahko "dodamo" igralce ki nimajo računa. Kot dodatno polje je polje za opombe, ki ni obvezno. Lahko pa dodamo različne opombe o zahtevah, priporočilih ali obvestilih.

### Podroben opis tekme
#### [pop_up_tekma.html](docs/pop_up_tekma.html)

Pop-up je namenjen podrobnejšemu prikazu tekme in možnosti prijave/odjave igralcev. Kreator in moderator pa imasta možnost urejanja in brisanja tekme. Pop-up prikazuje lokacijo v vtičniku Google maps in vreme v vtičniku ARSO.

Ko se tekma zaključi, lahko igralci na tem pogledu ocenijo njihove soigralce.

### Razlike med brskalniki

* Firefox se razlikuje od brskalnika Chrome in Opera v tem, da kot privzeto temo uporablja temo operacijskega sistema in ne lastne
    * Drsna vrstica je drugačna
    * Barve vnosnih polj so drugačne
    * Označen tekst se drugače obarva
* Opera in Chrome pri vnosnih poljih tipa **ura** in **datum** samodejno vključita tudi ustrezni ikoni, medtem ko Firefox tega ne stori
* Firefox ima v vnosnem polju **ura** 12-urni način, Chrome in Opera pa imata 24-urni način

## 2. LP

Dinamična spletna aplikacija z logiko na strani strežnika


## 3. LP

Dinamična spletna aplikacija s podatkovno bazo


## 4. LP

SPA aplikacija na eni strani


## 5. LP

Varnostno zaščitena progresivna aplikacija