import { AngMiloPage } from './app.po';

describe('ang-milo App', () => {
  let page: AngMiloPage;

  beforeEach(() => {
    page = new AngMiloPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to milo!!');
  });
});
