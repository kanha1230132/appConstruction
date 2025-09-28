// components/SearchBarComponent.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { AppColor } from '../../../themes/AppColor';

interface Props {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBarComponent: React.FC<Props> = ({ placeholder = "Search", onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query); // Trigger callback
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={placeholder}
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
    </View>
  );
};

export default SearchBarComponent;

const styles = StyleSheet.create({
  container: {
    marginBottom:10
  },
  searchBar: {
    borderRadius: 10,
    backgroundColor:AppColor.WHITE,
    borderWidth:1,
    borderColor:AppColor.BORDER_COLOR,
  },
});
