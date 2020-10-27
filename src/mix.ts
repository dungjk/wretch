export const mix = function (one: Record<string, any>, two: Record<string, any>, mergeArrays = false) {
  if (!one || !two || typeof one !== 'object' || typeof two !== 'object') return one;

  const clone = { ...one };
  for (const prop in two) {
    if (Object.prototype.hasOwnProperty.call(two, prop)) {
      if (two[prop] instanceof Array && one[prop] instanceof Array) {
        clone[prop] = mergeArrays ? [...one[prop], ...two[prop]] : two[prop];
      } else if (typeof two[prop] === 'object' && typeof one[prop] === 'object') {
        clone[prop] = mix(one[prop], two[prop], mergeArrays);
      } else {
        clone[prop] = two[prop];
      }
    }
  }

  return clone;
};
