export const isSearched = (searchValue) => (item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase());

export const handleChangeText = (v) => {
    setSearchValue(v);
};
