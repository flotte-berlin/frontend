export function logArrayInColumnInfoForm(array: string[]) {
    console.log(array.map(prop => '{name: \'' + prop + '\', header: \'\'},').join('\n'));
}