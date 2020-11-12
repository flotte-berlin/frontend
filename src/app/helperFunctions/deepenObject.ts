export function deepen(object: Object): any {
    let newObject = {};
    for (const prop in object) {
      if (prop.includes('.')) {
        const splittedProp = prop.split('.');
        const outerProp = splittedProp[0];
        const innerProp = splittedProp.slice(1).join('.');
        if (!newObject[outerProp]) {
          newObject[outerProp] = {};
        }
        newObject[outerProp][innerProp] = object[prop];
      } else {
        newObject[prop] = object[prop];
      }
    }
    for (const prop in newObject) {
      if (typeof newObject[prop] === 'object' && newObject[prop] !== null)
        newObject[prop] = deepen(newObject[prop]);
    }
    return newObject;
  }