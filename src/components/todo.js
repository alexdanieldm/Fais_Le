import React from 'react';

import { StyleSheet, TextInput, Text, View, TouchableOpacity, FlatList, Keyboard } from 'react-native';

import Row from './row';

const TaskInput = () => {

  const defaultList = {
    allComplete: false,
    value: "",
    items: [],
    isLoading: false,
    data: [],
  }
  
  const [ list, setList ] = React.useState(defaultList);

  const handleAddItems =() => {
    if ( !list.value ) { 
      console.log("EMPTY VALUE")
      return
    };

    //* Update State AKA list
    const items = list.items
    items.push(
      {
        key: Date.now(),
        text: list.value,
        complete: false
      }
    )

    setList({
      ...list,
      value: "",
      items: items
    })

    //! Debuggin
    console.log("handleAddItems\n")
    // console.table(list);
    console.table(list.items)
  }

  const handleToggle = () => {
    const itsComplete = !list.allComplete

    let items = list.items;
    
    const updatedList = items.map( (item) => (
      {
        ...item,
        complete: itsComplete
      }
    ));

    setList({
      ...list,
      items: updatedList,
      allComplete: itsComplete
    });

    //! Debuggin
    console.log("\nhandleToggle")
    // console.table(list);
    console.table(list.items)
  }

  const renderRow = ( {key, ...value} ) => {
    return(
      <Row
        key={key}
        {...value}
      />
    )
  }

  const renderSeparator = ( {sectioId, rowId} ) => {
    return(
      <View
        key={rowId}
        style={styles.separator}
      />
    )
  }

  return (
    <View style={ styles.container }>
      
      <View style={styles.todoInput}>
        <TouchableOpacity onPress={ handleToggle }>
          <Text style={styles.toggleIcon}>{String.fromCharCode(10003)}</Text>
        </TouchableOpacity>
        
        <TextInput
          placeholder="Whats needs to be done?"
          returnKeyType="done"
          blurOnSubmit={ false }
          style={ styles.input }
          value={list.value}
          onChangeText={ value => setList({ ...list, value: value }) }
          onSubmitEditing={ handleAddItems }
        />
      </View>
      
      <FlatList
        style={styles.list}
        enableEmptySection
        data={list.data}
        keyboardDismissMode="on-drag"
      />

      <View style={ styles.content }>
        
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 22,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },

  todoInput: {
    flexDirection: "row",
  },

  toggleIcon: {
    fontSize: 30,
    color: "rgb(204, 204, 204)"
  },
  
  input: {
    height: 50,
    marginLeft: 10,
    fontSize: 16,
  },

  list: {
    backgroundColor: '#0FF'
  },
  separator: {
    borderWidth: 1,
    borderColor: "#F5F5F5"
  }
});

export default TaskInput;

