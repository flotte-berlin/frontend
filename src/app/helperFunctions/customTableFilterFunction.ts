export function customTableFilterFunction(data: any, filter: any) {
  if (data.newObject) {
    return true; // always show new objects
  }
  if (filter.onlyUnsaved && !data.isLockedByMe) {
    return false;
  }
  for (const filterElementName of Object.keys(filter.columnFilters)) {
    const filterElement = filter.columnFilters[filterElementName];
    if (filterElement.value) {
      if (filterElement.type === 'String' || filterElement.type === 'Id') {
        let searchString = filterElement.value.trim();
        let dataElement = data[filterElementName]?.trim();
        if (dataElement == null) {
            return false;
        }
        if (!filterElement.options.caseSensitive) {
          searchString = searchString.toLowerCase();
          dataElement = dataElement.toLowerCase();
        }
        if (
          (filterElement.options.exact && dataElement !== searchString) ||
          !dataElement.includes(searchString)
        ) {
          return false;
        }
      }
    }
    if (filterElement.min != null || filterElement.max != null) {
      if (
        filterElement.type === 'Float' ||
        filterElement.type === 'Int' ||
        filterElement.type === 'Money'
      ) {
        let dataElement = data[filterElementName];
        if (dataElement == null) {
          return false;
        }
        if (filterElement.min != null && dataElement < filterElement.min) {
          return false;
        }
        if (filterElement.max != null && dataElement > filterElement.max) {
          return false;
        }
      }
    }
    if (filterElement.type === 'NumRange') {
      if (
        filterElement.minValue.min != null ||
        filterElement.minValue.max != null ||
        filterElement.maxValue.min != null ||
        filterElement.maxValue.max != null
      ) {
        let dataElementMin = data[filterElementName + '.min'];
        let dataElementMax = data[filterElementName + '.max'];
        if (dataElementMin == null && dataElementMax == null) {
            return false;
        }
        if (filterElement.minValue.min != null && dataElementMin < filterElement.minValue.min) {
            return false;
        }
        if (filterElement.minValue.max != null && dataElementMin > filterElement.minValue.max) {
            return false;
        }
        if (filterElement.maxValue.min != null && dataElementMax < filterElement.maxValue.min) {
            return false;
        }
        if (filterElement.maxValue.max != null && dataElementMax > filterElement.maxValue.max) {
            return false;
        }
      }
    }
  }
  /*const b =
      !filter.includesString ||
      Object.keys(data).some(
        (k) =>
          data[k] != null &&
          data[k]
            .toString()
            .toLowerCase()
            .includes(filter.includesString.toLowerCase())
      );*/
  return true;
}
