import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Keyboard, FlatList } from 'react-native';

import { firebase } from '../firebase/config';

import TodoInput from '../components/todoInput';
import Filter from '../components/filter';
import Row from '../components/row';
import Loading from '../components/loading';

import itemsFilter from '../utils/itemsFilter';

const Todo = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [todoItems, setTodoItems] = useState([]);
  const [filterItems, setFilterItems] = useState([]);

  const userReference = firebase.firestore().collection('users').doc(user.uid);
  const todoItemsCollection = userReference.collection('todoItems');

  useEffect(() => {
    setLoading(true);

    todoItemsCollection
      .orderBy('createdAt')
      .get()
      .then((querySnapshot) => {
        const userItems = [];

        querySnapshot.forEach((doc) => {
          userItems.push(doc.data());
        });

        setTodoItems(userItems);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilterItems(itemsFilter(filter, todoItems));
  }, [filter, todoItems]);

  const handleAddToDoItem = () => {
    if (!inputValue) {
      return;
    }

    const newItemRef = todoItemsCollection.doc();

    const newItem = {
      key: newItemRef.id,
      text: inputValue,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    setTodoItems((currentTodoItems) => {
      return [...currentTodoItems, newItem];
    });

    setInputValue('');

    newItemRef.set(newItem);
  };

  const handleToggleCompleteAllItems = () => {
    const itsAllComplete = todoItems.every((item) => item.complete === true);

    setTodoItems((currentTodoItems) => {
      const newTodoItem = [...todoItems];

      newTodoItem.map((item) => {
        currentTodoItems;
        item.complete = !itsAllComplete;
      });

      return newTodoItem;
    });

    todoItemsCollection
      .where('complete', '!=', !itsAllComplete)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          todoItemsCollection
            .doc(item.id)
            .update({ complete: !itsAllComplete })
            .catch((error) => {
              console.error(error);
            });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleToggleCompleteItem = (key, complete) => {
    const targetTodoItemIndex = todoItems.findIndex(
      (todoItem) => todoItem.key === key,
    );
    const targetTodoItem = todoItems[targetTodoItemIndex];
    const newTodoItem = { ...targetTodoItem, complete };

    setTodoItems((currentTodoItems) => {
      return [
        ...currentTodoItems.slice(0, targetTodoItemIndex),
        newTodoItem,
        ...currentTodoItems.slice(targetTodoItemIndex + 1),
      ];
    });

    todoItemsCollection
      .doc(key)
      .update({ complete })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveToDoItem = (key) => {
    const targetTodoItemIndex = todoItems.findIndex(
      (todoItem) => todoItem.key === key,
    );

    setTodoItems((currentTodoItems) => {
      return [
        ...currentTodoItems.slice(0, targetTodoItemIndex),
        ...currentTodoItems.slice(targetTodoItemIndex + 1),
      ];
    });

    todoItemsCollection
      .doc(key)
      .delete()
      .catch((error) => {
        console.error(error);
      });
  };

  const handleToggleEditing = (key, editing) => {
    const targetTodoItemIndex = todoItems.findIndex(
      (todoItem) => todoItem.key === key,
    );
    const targetTodoItem = todoItems[targetTodoItemIndex];
    const newTodoItem = { ...targetTodoItem, editing };

    setTodoItems((currentTodoItems) => {
      return [
        ...currentTodoItems.slice(0, targetTodoItemIndex),
        newTodoItem,
        ...currentTodoItems.slice(targetTodoItemIndex + 1),
      ];
    });
  };

  const handleUpdateTodoItem = (key, text) => {
    const targetTodoItemIndex = todoItems.findIndex(
      (todoItem) => todoItem.key === key,
    );
    const targetTodoItem = todoItems[targetTodoItemIndex];
    const newTodoItem = { ...targetTodoItem, text };

    setTodoItems((currentTodoItems) => {
      return [
        ...currentTodoItems.slice(0, targetTodoItemIndex),
        newTodoItem,
        ...currentTodoItems.slice(targetTodoItemIndex + 1),
      ];
    });

    todoItemsCollection
      .doc(key)
      .update({ text })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFilter = (filterOption) => {
    setFilter(filterOption);

    setFilterItems(itemsFilter(filter, todoItems));
  };

  const handleDeleteAllCompleted = () => {
    const incompletedTodoItems = todoItems.filter(
      ({ complete }) => complete === false,
    );

    setTodoItems(incompletedTodoItems);

    todoItemsCollection
      .where('complete', '==', true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          todoItemsCollection
            .doc(item.id)
            .delete()
            .catch((error) => {
              console.error(error);
            });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <TodoInput
        value={inputValue}
        onAddItem={handleAddToDoItem}
        onChange={(value) => setInputValue(value)}
        onToggleAllComplete={handleToggleCompleteAllItems}
      />

      <View style={styles.content}>
        <FlatList
          style={styles.list}
          data={filterItems}
          extraData={todoItems}
          onScroll={() => Keyboard.dismiss()}
          renderItem={({ item }) => {
            return (
              <Row
                key={item.key}
                onComplete={(complete) =>
                  handleToggleCompleteItem(item.key, complete)
                }
                onRemove={() => handleRemoveToDoItem(item.key)}
                onToggleEdit={(editing) =>
                  handleToggleEditing(item.key, editing)
                }
                onUpdate={(text) => handleUpdateTodoItem(item.key, text)}
                {...item}
              />
            );
          }}
          ItemSeparatorComponent={(rowId) => {
            return <View key={rowId} style={styles.separator} />;
          }}
        />
      </View>

      <Filter
        count={itemsFilter('ACTIVE', todoItems).length}
        onFilter={handleFilter}
        filter={filter}
        onClearComplete={handleDeleteAllCompleted}
      />

      <Loading loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    ...Platform.select({
      ios: { paddingTop: 30 },
    }),
  },

  content: {
    flex: 1,
  },

  list: {
    backgroundColor: '#FFF',
  },

  separator: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
});

export default Todo;
