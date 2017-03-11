import { DevdiaryFrontendPage } from './app.po';

describe('devdiary-frontend App', () => {
  let page: DevdiaryFrontendPage;

  beforeEach(() => {
    page = new DevdiaryFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
