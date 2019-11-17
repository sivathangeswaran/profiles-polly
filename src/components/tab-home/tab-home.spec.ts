import { TestWindow } from '@stencil/core/testing';
import { TabHome } from './tab-home';

describe('tab-home', () => {
  it('should build', () => {
    expect(new TabHome()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLTabHomeElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [TabHome],
        html: '<tab-home>' 
          + '</tab-home>'
      });
    });

    it('creates the element', () => {
      expect(element).toBeTruthy();
    });
  });
});
