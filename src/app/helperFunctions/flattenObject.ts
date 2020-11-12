export function flatten(object: Object, prefix: string = ''): any {
    let newObject = {};
    for (const prop in object) {
      let propName = prefix + prop;
      if (typeof object[prop] === 'object' && object[prop] !== null) {
        const flattenedObject = flatten(object[prop], propName + '.');
        for (const flattenedProperty in flattenedObject) {
          newObject[flattenedProperty] =
            flattenedObject[flattenedProperty];
        }
      } else if(!prop.includes('_', 0)) {
        newObject[propName] = object[prop];
      }
    }
    return newObject;
  }