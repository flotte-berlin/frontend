export function flatten(object: Object, prefix: string = ''): any {
  let newObject = {};
  for (const prop in object) {
    let propName = prefix + prop;
    if (Array.isArray(object[prop])) {
      newObject[propName] = [];
      for (const arrayElement of object[prop]) {
        newObject[propName].push(flatten(arrayElement));
      }
    } else if (typeof object[prop] === 'object' && object[prop] !== null) {
      const flattenedObject = flatten(object[prop], propName + '.');
      for (const flattenedProperty in flattenedObject) {
        newObject[flattenedProperty] = flattenedObject[flattenedProperty];
      }
    } else {
      newObject[propName] = object[prop];
    }
  }
  return newObject;
}
