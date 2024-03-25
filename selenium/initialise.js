const { time } = require('console');
const {Builder, WebElement, Browser, By, Key, until} = require('selenium-webdriver');

(async function example() {
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get('https://www.google.com/');
    let button = await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Reject all')]")), 5000);
    await driver.wait(until.elementIsVisible(button), 5000);
    await button.click();
    
  } finally {
    //await driver.quit();
  }
})();