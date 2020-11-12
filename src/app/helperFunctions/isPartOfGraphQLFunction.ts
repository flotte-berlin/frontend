import { DocumentNode } from 'graphql';

export function isPartOfGraphQLDoc(
  variableName: String,
  doc: DocumentNode
): boolean {
  return isPartOfSelectionSet(variableName, doc.definitions[0]);
}

function isPartOfSelectionSet(
  variableName: String,
  selectionObject: any
): boolean {
  const variablePath = variableName.split('.');
  const selections = selectionObject.selectionSet?.selections;
  if (selections !== undefined) {
    const nextSelectionObject = selections.find(selection => selection.name.value === variablePath[0]);
    if (nextSelectionObject !== undefined) {
        if (variablePath.length === 1) {
            return true;
        }
        return isPartOfSelectionSet(variablePath.slice(1).join(), nextSelectionObject);
    } else {
        return false;
    }
  }
  return false;
}
