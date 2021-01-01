(async function TapPlay() {
    const { exec } = require("child_process");
    const { describe, it, after, before } = require("mocha");
    const { Builder, By, until } = require("selenium-webdriver");
    const chrome = require("selenium-webdriver/chrome");
    const expect = require("chai").expect;

    let aplikacijaUrl = "http://localhost:4200"
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


    describe("Test 123", async function() {
        this.timeout(30 * 1000);
        before(async function() { await brskalnik.get(aplikacijaUrl); });
        
        it("Stevilo tekem", async () => {
            await pocakajStranNalozena(brskalnik, 10, "//h4");
            let lokacije = await brskalnik.findElements(By.id(tekma))
            expect(lokacije).to.be.an("array").to.have.lengthOf(2)
        })
        
        
    })

    after(async () => {
        brskalnik.quit();
      });

  } catch (napaka) {
      console.log("Med testom je prislo do napaka")
  }
})
