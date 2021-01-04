const { async } = require("rxjs");

// docker run -d -p 4445:4444 -p 5901:5900 --shm-size=2g selenium/standalone-chrome-debug 

(async function TapPlay() {
    const { exec } = require("child_process");
    const { describe, it, after, before } = require("mocha");
    const { Builder, By, until } = require("selenium-webdriver");
    const chrome = require("selenium-webdriver/chrome");
    const expect = require("chai").expect;

    let aplikacijaUrl = "https://ang-tap-play.herokuapp.com/"
    let seleniumStreznikUrl = "http://localhost:4445/wd/hub";
    let brskalnik, jwtZeton;

    const axios = require('axios').create({
        baseURL: aplikacijaUrl + "api/",
        timeout: 5000
      });

        // Obvladovanje napak
    process.on("unhandledRejection", (napaka) => {
        console.log(napaka);
    });

    // Počakaj določeno število sekund na zahtevani element na strani
    let pocakajStranNalozena = async (brskalnik, casVS, xpath) => {
        await brskalnik.wait(() => {
        return brskalnik.findElements(By.xpath(xpath)).then(elementi => {
            return elementi[0];
        });
        }, casVS * 1000, `Stran se ni naložila v ${casVS} s.`);
    };

  try {

    before(() => {
      brskalnik = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(new chrome.Options()
        .addArguments("start-maximized")
        .addArguments("disable-infobars")
        .addArguments("allow-insecure-localhost")
        .addArguments("allow-running-insecure-content")
      )
      .usingServer(seleniumStreznikUrl)
      .build();
    });

    describe("Seznam tekem", function() {
      this.timeout(30 * 1000);
      before(() => {brskalnik.get(aplikacijaUrl)});


      it("Število tekem na zacetni strani", async () => {
        await pocakajStranNalozena(brskalnik, 10, "//div");
        let tekme = await brskalnik.findElements(By.css("#tekma"));
        expect(tekme).to.be.an("array").to.have.lengthOf(2);
      });

      it("Mapa na začetni strani", async() => {
        await pocakajStranNalozena(brskalnik, 10, "//div");
        let map = await brskalnik.findElements(By.css("#map"))
        expect(map).to.not.be.empty;
      });
      
    });

    describe("Informacije o tekmi", function() {
      this.timeout(30 * 1000);
      before(() => {brskalnik.get(aplikacijaUrl)});

      it("Izberi Fakulteta za Računalništvo in Informatiko", async() => {
        await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Fakulteta')]")
        let povezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Fakulteta')]"));
        expect(povezava).not.to.be.empty;
        await povezava.click();
      })

      context("Ustreznost podatkov na strani s podrobnostmi tekme", function() {

        it("Ustrezen kraj na strani podatkov", async() => {
          await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Tjas')]")
          let naslov = await brskalnik.findElement(By.css("#kraj"))
          expect(naslov).to.not.be.empty;
          expect(await naslov.getText()).to.have.string("Fakulteta za Računalništvo in Informatiko")
        })

        it("Ustrezen kreator tekme", async() => {
          await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Tjas')]")
          let kreator = await brskalnik.findElement(By.css("#kreator"))
          expect(kreator).to.not.be.empty;
          expect(await kreator.getText()).to.have.string("Tjas Leghissa")
        })
  
        it("Ustrezen datum tekme", async() => {
          await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Tjas')]")
          let datum = await brskalnik.findElement(By.xpath("//p[contains(text(), '31')]"))
          expect(datum).to.not.be.empty;
          expect(await datum.getText()).to.have.string("31. 01. 2021 | 18:40")
        })
      })

    

    })

    describe("Registracija", function() {
      this.timeout(30*1000);
      before(async function() {await brskalnik.get(aplikacijaUrl)});

      it("Cick na gumb za prijavo", async function() {
        let gumb = await brskalnik.findElement(By.css("#testMenuRazlika1"));
        expect(gumb).to.not.be.empty;
        await gumb.click();
      })

      it("Premaknise na stran prijave", async function() {
        let povezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Prijava')]"));
        expect(povezava).not.to.be.empty;
        await povezava.click()
      })

      context("Stran prijave", function() {
        it("Izbira registracije", async function() {
          await pocakajStranNalozena(brskalnik, 10, "//div")
          let povezava = await brskalnik.findElement(By.xpath("//button[contains(text(), 'Registracija')]"));
          expect(povezava).to.not.be.empty;
          await povezava.click()
        })
      })

      context("Stran registracije", function() {
        it("Vnos podatkov uporabnika", async function() {
          await pocakajStranNalozena(brskalnik, 10, "//button[contains(text(), 'Registracija')]");
  
          let ime = await brskalnik.findElement(By.css("#name"))
          expect(ime).to.not.be.empty;
          ime.sendKeys("Marko")
  
          let priimek = await brskalnik.findElement(By.css("#surname"))
          expect(priimek).to.not.be.empty;
          priimek.sendKeys("Novak")
  
          let mail = await brskalnik.findElement(By.css("#emailReg"))
          expect(mail).to.not.be.empty;
          mail.sendKeys("marko@novak.com")
  
          let geslo = await brskalnik.findElement(By.css("#gesloReg"))
          expect(geslo).to.not.be.empty;
          geslo.sendKeys("geslo123")
  
          let geslo2 = await brskalnik.findElement(By.css("#geslo2Reg"))
          expect(geslo2).to.not.be.empty;
          geslo2.sendKeys("geslo123")
  
          let gumb = brskalnik.findElement(By.xpath("//button[contains(text(), 'Registracija')]"));
          await gumb.click()
        })
      })
    })

    describe("Prijava", function() {
      this.timeout(30*1000);
      before(async function() {await brskalnik.get(aplikacijaUrl + "login")});

      it("Stran prijave dela", async function() {
        await pocakajStranNalozena(brskalnik, 10, "//button[contains(text(), 'Pozabil')]");
        let geslo = await brskalnik.findElement(By.css("#geslo"))
        expect(geslo).not.to.be.empty;
      })

      it("Vnesi podatke za prijavo", async function() {
        await pocakajStranNalozena(brskalnik, 10, "//button[contains(text(), 'Pozabil')]");
        let mail = await brskalnik.findElement(By.css("input[name='email']"))
        expect(mail).to.not.be.empty;
        mail.sendKeys("marko@novak.com")
        let geslo = await brskalnik.findElement(By.css("#geslo"))
        expect(geslo).not.to.be.empty;
        geslo.sendKeys("geslo123")
        let gumb = await brskalnik.findElement(By.css("input[value='Prijava']")).click();
      })
      context("Začetna stran", function() {
        it("Cick na gumb za vizualizacijo imena", async function() {
          await pocakajStranNalozena(brskalnik, 10, "//*[@id='map']");
          let gumb = await brskalnik.findElement(By.css("#testMenuRazlika1"));
          expect(gumb).to.not.be.empty;
          await gumb.click();
        })
        
        it("Prikazano ime prijavljenega uporabnika", async function() {
          let ime = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Marko')]"));
          expect(ime).to.not.be.empty;
          expect(await ime.getText()).to.have.string("Marko Novak")
        })

        it("pridobi JWT žeton", async function() {
          jwtZeton = await brskalnik.executeScript(function() {
            return localStorage.getItem("app-zeton");
          });
          expect(jwtZeton).to.not.be.empty;
        });

      })
      
      
    })

    describe("Prijavi se na tekmo", function() {
      this.timeout(30*1000);
      before(async function() {await brskalnik.get(aplikacijaUrl)});
        
      context("Začetna stran", function() {
        it("Vrni se na začetno stran", async function() {
          await pocakajStranNalozena(brskalnik, 20, "//*[@id='gumbNovaIgra']");
          let gumb = await brskalnik.findElement(By.css("#gumbNovaIgra"));
        })
  
        it("Izberi tekmo na fakulteti", async function() {
          await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Fakulteta')]");
          let f = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Fakulteta')]"));
          await f.click()
        })
      })

      context("Stran tekme", function() {
        it("Stran tekme", async function() {
          await pocakajStranNalozena(brskalnik, 10, "//*[@id='kraj']");
          let gumb = await brskalnik.findElement(By.css("#kraj"));
          expect(gumb).not.to.be.empty;
        })
  
        it("Pridruži se tekmi", async function() {
          await pocakajStranNalozena(brskalnik, 10, "//*[@id='kraj']");
          await brskalnik.findElement(By.css("button[class='btn btn-primary']")).click();
        })
      })
      

      
      describe("Preveri če se je pridružu in odjavi se od tekme", function() {
        this.timeout(30*1000);
        before(async function() {await brskalnik.get(aplikacijaUrl)});

        context("Začetna stran", function() {
          it("Izberi tekmo na fakulteti", async function() {
            await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Fakulteta')]");
            let f = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Fakulteta')]"));
            await f.click()
          })
        })
        
        context("Stran tekme", function() {
          it("Preveri če je pridružen", async function() {
            await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Marko')]");
            let ime = await brskalnik.findElement(By.css("button[class='btn btn-danger']"));
            expect(ime).not.to.be.empty;
          })
  
          it("Odjavi se od tekme", async function() {
            let gumb = await brskalnik.findElement(By.css("button[class='btn btn-danger']"));
            expect(gumb).not.to.be.empty;
            await gumb.click()
          })
        })
      })


      describe("Odjavi se", function() {
        this.timeout(30*1000);
        before(async function() {await brskalnik.get(aplikacijaUrl)});

        it("Cick na gumb za prikaz odjave", async function() {
          let gumb = await brskalnik.findElement(By.css("#testMenuRazlika1"));
          expect(gumb).to.not.be.empty;
          await gumb.click();
        })

        it("Odjavi se", async function() {
          let povezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Odjava')]"));
          expect(povezava).not.to.be.empty;
          await povezava.click()
        })
      })

      describe("Preveri da je uporabnik odjavljen", function() {
        this.timeout(30*1000);
        before(async function() {await brskalnik.get(aplikacijaUrl)});

        it("Cick na gumb za prikaz statusa prijave/odjave", async function() {
          let gumb = await brskalnik.findElement(By.css("#testMenuRazlika1"));
          expect(gumb).to.not.be.empty;
          await gumb.click();
        })

        it("Uporabnik je odjavljen", async function() {
          let povezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Prijava')]"));
          expect(povezava).not.to.be.empty;
        })
      })
      

      
      /*
      it("Strani ustvari tekmo deluje", async function() {
        await pocakajStranNalozena(brskalnik, 10, "//*[@id='map']");
        let lat = await brskalnik.findElement(By.css("#Input_Okno_LAT"));
        expect(lat).not.to.be.empty;
        lat.sendKeys(45)

        let lng = await brskalnik.findElement(By.css("#Input_Okno_LNG"));
        expect(lng).not.to.be.empty;
        lng.sendKeys(15)

        let kraj = await brskalnik.findElement(By.css("#Input_Okno_Kraj"));
        expect(kraj).not.to.be.empty;
        kraj.sendKeys("Ljubljana test")
    
        let datum = await brskalnik.findElement(By.css("input[name='datum']"));
        expect(datum).not.to.be.empty;
        datum.sendKeys("26-03-2021")

        let ura = await brskalnik.findElement(By.css("input[name='ura']"));
        expect(ura).not.to.be.empty;
        ura.sendKeys("21:00");

        let gumb = await brskalnik.findElement(By.css("input[value='Ustvari']")).click();
      })
      */
    })

    

    



    
    after(async () => {
        brskalnik.quit();
      });

  } catch (napaka) {
      console.log("Med testom je prislo do napaka")
  }
})();
