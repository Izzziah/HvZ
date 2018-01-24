import { ZombieAppPage } from './app.po';

describe('zombie-app App', () => {
  let page: ZombieAppPage;

  beforeEach(() => {
    page = new ZombieAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
