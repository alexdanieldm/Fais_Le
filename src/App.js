import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform, Keyboard, FlatList } from 'react-native';

// Libreries for deprecdeprecated React Native Components
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListView from 'deprecated-react-native-listview';

import Header from './components/header';
import Footer from './components/footer';
import Row from './components/row';

const filterItems = (filter, items) => {
	const filteredItems = items.filter((item) => {
		if (filter === 'ALL') {
			return true;
		}
		if (filter === 'COMPLETED') {
			return item.complete;
		}
		if (filter === 'ACTIVE') {
			return !item.complete;
		}
	});

	return filteredItems;
};

const App = () => {
	const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
	const [ dataSource, setDataSource ] = useState(ds.cloneWithRows([]));
	const [ data, setData ] = useState([]);
	const [ filter, setFilter ] = useState('ALL');
	const [ inputValue, setInputValue ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ todoItems, setTodoItems ] = useState([]);

	//! FOR DEBUGGING
	useEffect(
		() => {
			console.log('Debugging');
			console.table(todoItems);
		},
		[ todoItems ]
	);

	useEffect(
		() => {
			setDataSource(dataSource.cloneWithRows(filterItems(filter, todoItems)));
			setData(filterItems(filter, todoItems));
		},
		[ todoItems ]
	);

	useEffect(
		() => {
			AsyncStorage.setItem('items', JSON.stringify(dataSource));
		},
		[ dataSource ]
	);

	useEffect(() => {
		setLoading(true);
		AsyncStorage.getItem('items').then((json) => {
			try {
				// setTodoItems(JSON.parse(json));
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		});
	}, []);

	const handleUpdateTodoItem = (key, text) => {
		const targetTodoItemIndex = todoItems.findIndex((todoItem) => todoItem.key === key);
		const targetTodoItem = todoItems[targetTodoItemIndex];
		const newTodoItem = { ...targetTodoItem, text };

		setTodoItems((currentTodoItems) => {
			return [
				...currentTodoItems.slice(0, targetTodoItemIndex),
				newTodoItem,
				...currentTodoItems.slice(targetTodoItemIndex + 1)
			];
		});
	};

	const handleToggleEditing = (key, editing) => {
		const targetTodoItemIndex = todoItems.findIndex((todoItem) => todoItem.key === key);
		const targetTodoItem = todoItems[targetTodoItemIndex];
		const newTodoItem = { ...targetTodoItem, editing };

		setTodoItems((currentTodoItems) => {
			return [
				...currentTodoItems.slice(0, targetTodoItemIndex),
				newTodoItem,
				...currentTodoItems.slice(targetTodoItemIndex + 1)
			];
		});
	};

	const handleDeleteAllCompleted = () => {
		const incompletedTodoItems = todoItems.filter(({ complete }) => complete === false);
		setTodoItems(incompletedTodoItems);
	};

	const handleFilter = (filter) => {
		setFilter(filter);

		setDataSource(dataSource.cloneWithRows(filterItems(filter, todoItems)));
		setData(filterItems(filter, todoItems));
	};

	const handleRemoveToDoItem = (key) => {
		const targetTodoItemIndex = todoItems.findIndex((todoItem) => todoItem.key === key);

		setTodoItems((currentTodoItems) => {
			return [
				...currentTodoItems.slice(0, targetTodoItemIndex),
				...currentTodoItems.slice(targetTodoItemIndex + 1)
			];
		});
	};

	const handleToggleCompleteItem = (key, complete) => {
		const targetTodoItemIndex = todoItems.findIndex((todoItem) => todoItem.key === key);
		const targetTodoItem = todoItems[targetTodoItemIndex];
		const newTodoItem = { ...targetTodoItem, complete };

		setTodoItems((currentTodoItems) => {
			return [
				...currentTodoItems.slice(0, targetTodoItemIndex),
				newTodoItem,
				...currentTodoItems.slice(targetTodoItemIndex + 1)
			];
		});
	};

	const handleToggleCompleteAllItems = () => {
		const itsAllComplete = todoItems.every((item) => item.complete === true);

		setTodoItems((currentTodoItems) => {
			const newTodoItem = [ ...todoItems ];

			newTodoItem.map((item) => {
				currentTodoItems;
				item.complete = !itsAllComplete;
			});

			return newTodoItem;
		});
	};

	const handleAddToDoItem = () => {
		if (!inputValue) {
			return;
		}

		setTodoItems((currentTodoItems) => {
			return [
				...currentTodoItems,
				{
					key: Date.now(),
					text: inputValue,
					complete: false
				}
			];
		});

		setInputValue('');
	};

	return (
		<View style={styles.container}>
			<Header
				value={inputValue}
				onAddItem={handleAddToDoItem}
				onChange={(value) => setInputValue(value)}
				onToggleAllComplete={handleToggleCompleteAllItems}
			/>

			<View style={styles.content}>
				<FlatList
					style={styles.list}
					data={data}
					extraData={data}
					onScroll={() => Keyboard.dismiss()}
					renderItem={({ item }) => {
						return (
							<Row
								key={item.key}
								onUpdate={(text) => handleUpdateTodoItem(item.key, text)}
								onToggleEdit={(editing) => handleToggleEditing(item.key, editing)}
								onRemove={() => handleRemoveToDoItem(item.key)}
								onComplete={(complete) => handleToggleCompleteItem(item.key, complete)}
								{...item}
							/>
						);
					}}
					ItemSeparatorComponent={(rowId) => {
						return <View key={rowId} style={styles.separator} />;
					}}
				/>
			</View>

			<Footer
				count={filterItems('ACTIVE', todoItems).length}
				onFilter={handleFilter}
				filter={filter}
				onClearComplete={handleDeleteAllCompleted}
			/>

			{loading && (
				<View style={styles.loading}>
					<ActivityIndicator animating size="large" />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
		...Platform.select({
			ios: { paddingTop: 30 }
		})
	},
	loading: {
		position: 'absolute',
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,.2)'
	},
	content: {
		flex: 1
	},
	list: {
		backgroundColor: '#FFF'
	},
	separator: {
		borderWidth: 1,
		borderColor: '#F5F5F5'
	}
});

export default App;
