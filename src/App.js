import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform, Keyboard } from 'react-native';

// Libreries for deprecdeprecated React Native Components
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListView from 'deprecated-react-native-listview';

import Header from './components/header';
import Footer from './components/footer';
import Row from './components/row';

const filterItems = (filter, items) => {
	return items.filter((item) => {
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
};

const App = () => {
	const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
	const [ dataSource, setDataSource ] = useState(ds.cloneWithRows([]));
	const [ filter, setFilter ] = useState('ALL');
	const [ inputValue, setInputValue ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ todoItems, setTodoItems ] = useState([]);

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
				setTodoItems(JSON.parse(json));
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
		setSource(state.items, filterItems(filter, state.items), {
			filter
		});
	};

	const handleRemoveItem = (key) => {
		const newItems = state.items.filter((item) => {
			return item.key !== key;
		});
	};

	const handleToggleComplete = (key, complete) => {
		const newItems = state.items.map((item) => {
			if (item.key !== key) {
				return item;
			}
			return {
				...item,
				complete
			};
		});

		setSource(newItems, filterItems(state.filter, newItems));
	};

	const handleToggleAllComplete = () => {
		const complete = !state.allComplete;
		const newItems = state.items.map((item) => ({
			...item,
			complete
		}));

		setSource(newItems, filterItems(state.filter, newItems), {
			allComplete: complete
		});
	};

	const handleAddItem = () => {
		if (!state.value) {
			return;
		}

		const newItems = state.items;

		newItems.push({
			key: Date.now(),
			text: state.value,
			complete: false
		});

		setSource(newItems, filterItems(state.filter, newItems), {
			value: ''
		});
	};

	return (
		<View style={styles.container}>
			<Header
				value={state.value}
				onAddItem={handleAddItem}
				onChange={(value) => setState({ ...state, value: value })}
				onToggleAllComplete={handleDeleteAllCompleted}
			/>

			<View style={styles.content}>
				<ListView
					style={styles.list}
					enableEmptySections
					dataSource={state.dataSource}
					onScroll={() => Keyboard.dismiss()}
					renderRow={({ key, ...value }) => {
						return (
							<Row
								key={key}
								onUpdate={(text) => handleUpdateText(key, text)}
								onToggleEdit={(editing) => handleToggleEditing(key, editing)}
								onRemove={() => handleRemoveItem(key)}
								onComplete={(complete) => handleToggleComplete(key, complete)}
								{...value}
							/>
						);
					}}
					renderSeparator={(sectionId, rowId) => {
						return <View key={rowId} style={styles.separator} />;
					}}
				/>
			</View>

			<Footer
				count={filterItems('ACTIVE', state.items).length}
				onFilter={handleFilter}
				filter={state.filter}
				onClearComplete={handleClearComplete}
			/>

			{state.loading && (
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
