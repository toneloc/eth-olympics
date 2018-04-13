import {createSandbox, triggerEvent} from 'helper';

import Swappable from './..';

const sampleMarkup = `
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
`;

describe('Swappable', () => {
  let sandbox;
  let swappable;

  beforeEach(() => {
    jest.useFakeTimers();
    sandbox = createSandbox(sampleMarkup);
    swappable = new Swappable(sandbox.querySelectorAll('ul'), {
      draggable: 'li',
    });
  });

  afterEach(() => {
    sandbox.parentNode.removeChild(sandbox);
  });

  test('triggers `swappable:swap` event with `swappedElement`', () => {
    const callback = jest.fn();
    swappable.on('swappable:swapped', callback);
    const draggableElement = sandbox.querySelector('li');
    const target = draggableElement.nextElementSibling;

    // Simulate drag start
    document.elementFromPoint = () => draggableElement;
    triggerEvent(draggableElement, 'mousedown', {button: 0});
    // Wait for gesture delay
    jest.runTimersToTime(100);

    // Simulate drag move over the target
    document.elementFromPoint = () => target;
    triggerEvent(target, 'mousemove');

    const swappableSwappedEvent = callback.mock.calls[0][0];
    expect(swappableSwappedEvent.type).toBe('swappable:swapped');
    expect(swappableSwappedEvent.swappedElement).toBe(target);
  });
});
