import { AppPage } from './app.po';

describe('ng-conf App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    await page.navigateTo();
    expect(await page.getParagraphText()).toEqual('Welcome to ng-conf!');
  });
});
