class HomePageObject {
  elements = {
    cardTitle: () => cy.get('.image-generator__title'),
    aspectRatioSelect: () => cy.get('select'),
    widthInput: () => cy.get('input[id="width"]'),
    heightInput: () => cy.get('input[id="height"]'),
    outputSizeInput: () => cy.get('input[id="output-size"]'),
    generateButton: () => cy.get('button:contains("GENERATE")'),
  }

  visit() {
    cy.visit('https://image-generator-for-qa.vercel.app')
    return this
  }

  generateImage() {
    this.elements.generateButton().click()
  }

  fillAspectRatio(aspectRatioIndex: number) {
    this.elements.aspectRatioSelect().select(aspectRatioIndex)
    return this
  }

  fillWidth(width: number) {
    this.elements.widthInput().clear().type(width.toString())
    return this
  }

  fillHeight(height: number) {
    this.elements.heightInput().clear().type(height.toString())
    return this
  }

  fillOutputSize(outputSize: number) {
    this.elements.outputSizeInput().clear().type(outputSize.toString())
    return this
  }
}

export default new HomePageObject();
