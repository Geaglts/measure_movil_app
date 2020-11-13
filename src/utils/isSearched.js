export default (searchValue) => (item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase());
