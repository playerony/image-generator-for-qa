import homePageObject from '../page-objects/home.page-object';

describe('Home', () => {
  it('should generate image', () => {
    homePageObject.visit()
      .fillAspectRatio(1)
      .fillWidth(800)
      .fillHeight(600)
      .fillOutputSize(1)
      .fillAspectRatio(10)
      .generateImage();
  });
});
