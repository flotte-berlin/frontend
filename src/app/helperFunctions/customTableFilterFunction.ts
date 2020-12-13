export function customTableFilterFunction(data: any, filter: any) {
  if (data.newObject) {
    return true; // always show newly created objects
  }
  if (filter.onlyUnsaved && !data.isLockedByMe) {
    return false;
  }
  for (const filterElementName of Object.keys(filter.columnFilters)) {
    const filterElement = filter.columnFilters[filterElementName];
    // List Filter - ignore types if column is list
    if (filterElement.list && filterElement.values?.length > 0) {
      let dataElement: Array<any> = data[filterElementName];
      if (dataElement.length !== filterElement.values.length) {
        return false;
      }
      for (const element of filterElement.values) {
        if (!dataElement.includes(element)) {
          return false;
        }
      }
    } else {
      // String Filter
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
      // Number Filter
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
      // NumberRange Filter
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
          if (
            filterElement.minValue.min != null &&
            dataElementMin < filterElement.minValue.min
          ) {
            return false;
          }
          if (
            filterElement.minValue.max != null &&
            dataElementMin > filterElement.minValue.max
          ) {
            return false;
          }
          if (
            filterElement.maxValue.min != null &&
            dataElementMax < filterElement.maxValue.min
          ) {
            return false;
          }
          if (
            filterElement.maxValue.max != null &&
            dataElementMax > filterElement.maxValue.max
          ) {
            return false;
          }
        }
      }
      // Date Filter
      if (
        filterElement.type === 'Date' &&
        (filterElement.from != null || filterElement.to != null)
      ) {
        let dataElement = data[filterElementName];
        if (dataElement == null) {
          return false;
        }
        if (
          filterElement.from != null &&
          new Date(dataElement) < new Date(filterElement.from)
        ) {
          return false;
        }
        if (
          filterElement.to != null &&
          new Date(dataElement) > new Date(filterElement.to)
        ) {
          return false;
        }
      }
      // DateRange Filter
      if (
        filterElement.type === 'DateRange' &&
        (filterElement.fromValue.from != null ||
          filterElement.fromValue.to != null ||
          filterElement.toValue.from != null ||
          filterElement.toValue.to != null)
      ) {
        let dataElementFrom = data[filterElementName + '.from'];
        let dataElementTo = data[filterElementName + '.to'];
        if (!dataElementFrom && !dataElementTo) {
          return false;
        }
        if (
          filterElement.fromValue.from != null &&
          (!dataElementFrom ||
            new Date(dataElementFrom) < new Date(filterElement.fromValue.from))
        ) {
          return false;
        }
        if (
          filterElement.fromValue.to != null &&
          new Date(dataElementFrom) > new Date(filterElement.fromValue.to)
        ) {
          return false;
        }
        if (
          filterElement.toValue.from != null &&
          new Date(dataElementTo) < new Date(filterElement.toValue.from)
        ) {
          return false;
        }
        if (
          filterElement.toValue.to != null &&
          (!dataElementTo ||
            new Date(dataElementTo) > new Date(filterElement.toValue.to))
        ) {
          return false;
        }
      }
      // Enum Filter
      if (
        filterElement.type.startsWith('Enum') &&
        filterElement.value != null &&
        filterElement.value !== data[filterElementName]
      ) {
        return false;
      }
      // Boolean Filter
      if (
        filterElement.type === 'Boolean' &&
        ((filterElement.value === 'Ja' && !data[filterElementName]) ||
          (filterElement.value === 'Nein' && data[filterElementName]))
      ) {
        return false;
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
