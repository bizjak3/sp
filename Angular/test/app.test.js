const { async } = require("rxjs");

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


      it("Stevilo tekem na zacetni strani", async () => {
        await pocakajStranNalozena(brskalnik, 10, "//div");
        let tekme = await brskalnik.findElements(By.css("#tekma"));
        expect(tekme).to.be.an("array").to.have.lengthOf(3);
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
        await pocakajStranNalozena(brskalnik, 10, "//div")
        let povezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Fakulteta')]"));
        expect(povezava).to.not.be.empty;
        await povezava.click();
      })

      context("Ustreznost podatkov na strani s podrobnostmi tekme", function() {

        it("Stran podatkov dela", async() => {
          await pocakajStranNalozena(brskalnik, 10, "//div")
          let naslov = await brskalnik.findElement(By.css("#exampleModalCenter"))
          
          expect(naslov).to.not.be.empty;
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
        
      it("Cick na gumb za novo igro", async function() {
        await pocakajStranNalozena(brskalnik, 10, "//*[@id='map']");
        let gumb = await brskalnik.findElement(By.css("#gumbNovaIgra")).click();
      })

      it("Strani ustvari tekmo deluje", async function() {
        await pocakajStranNalozena(brskalnik, 10, "//*[@id='map']");
        let mapa = await brskalnik.findElement(By.css("#map")).click();
    
        let datum = await brskalnik.findElement(By.css("input[name='datum']"));
        expect(datum).not.to.be.empty;
        datum.sendKeys("26.03.2021")

        let ura = await brskalnik.findElement(By.css("input[name='ura']"));
        expect(ura).not.to.be.empty;
        ura.sendKeys("21:00");

        let gumb = await brskalnik.findElement(By.css("input[value='Ustvari']"));
        gumb.click()
      })
    })

    

    



    
    after(async () => {
        brskalnik.quit();
      });

  } catch (napaka) {
      console.log("Med testom je prislo do napaka")
  }
})();
