/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import Droppable from 'lib/droppable';
import Draggable from 'lib/draggable';
import Sensors from 'lib/draggable';

/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

export default function OneAndOnly() {
  const containers = document.querySelectorAll('#OneAndOnly .BlockLayout');

  if (containers.length === 0) {
    return false;
  }

  const droppable = new Droppable(containers, {
    draggable: '.Block--isDraggable',
    droppable: '.BlockWrapper--isDroppable',
    mirror: {
      constrainDimensions: true,
    },
  });

  // ///////////////// 
  // const draggable = new Draggable(containers, {
  //   sensors: [Sensors.DragSensor]
  // });

  // // // Remove default mouse sensor
  // draggable.removeSensor(Sensors.MouseSensor);
  // /////////////////

  let droppableOrigin;

  // --- Draggable events --- //
  droppable.on('drag:start', evt => {
    droppableOrigin = evt.originalSource.parentNode.dataset.droppable;
  });

  droppable.on('droppable:over', evt => {
    if (droppableOrigin !== evt.droppable.dataset.droppable) {
      evt.cancel();
    }
  });

    droppable.on('drag:start', evt => {
    droppableOrigin = evt.originalSource.parentNode.dataset.droppable;
  });

  let x = droppable.getDraggableElementsForContainer(containers[0]);
  console.log("x = " + x);

  return droppable;

}


