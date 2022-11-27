export enum interactionMode {
  COLLABORATION = 'collaboration',
  X_AS_A_SERVICE = 'x_as_a_service',
  FACILITATING = 'facilitating',
  UNDEFINED = 'undefined',
}

export const interactionModeColor = {
  [interactionMode.COLLABORATION]: {
    color: '#967EE2',
    backgroundColor: 'rgba(198,190,223,0.5)',
  },
  [interactionMode.X_AS_A_SERVICE]: {
    color: '#999696',
    backgroundColor: 'rgba(180,180,180,0.5)',
  },
  [interactionMode.FACILITATING]: {
    color: '#78996B',
    backgroundColor: 'rgba(201,223,190,0.5)',
  },
  [interactionMode.UNDEFINED]: {
    color: '#eeeeee',
    backgroundColor: 'rgba(235,235,239,0.4)',
  },
};
