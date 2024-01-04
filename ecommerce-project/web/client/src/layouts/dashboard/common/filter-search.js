import _ from 'lodash';
export function applyFilter({ inputData, filterName }) {
  if (filterName === '') {
    return [];
  }
  const filterKeywords = filterName.split(' ');

  const filteredData = _.filter(inputData, (item) => {
    const nameWords = item.name.toLowerCase().split(' ');
    return _.some(filterKeywords, (keyword) => {
      return _.some(nameWords, (word) => _.includes(word, keyword));
    });
  });

  return filteredData;
}
