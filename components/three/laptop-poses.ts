// x, y rotation, x rotation, camera height, camera distance.
export const laptopPoses = [
  [0, -.24, .02, 2, 5.9], [-.08, .22, -.04, 2.15, 5.8],
  [.08, -.28, .05, 2.45, 6], [0, .14, -.03, 1.9, 5.6],
  [-.06, -.16, .03, 2.1, 5.7], [.06, .1, -.02, 2.3, 5.9],
  [0, 0, 0, 2, 5.8],
] as const;

export const laptopCamera = {
  position: [0, laptopPoses[0][3], laptopPoses[0][4]] as [number, number, number],
  fov: 38,
};
