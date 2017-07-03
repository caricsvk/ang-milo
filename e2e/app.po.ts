import { browser, by, element } from 'protractor';

export class AngMiloPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('milo-root h1')).getText();
  }
}
