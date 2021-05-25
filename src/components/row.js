import { View, Text, StyleSheet, Switch, TouchableOpacity, TextInput } from 'react-native';

const ToDoItem = ( {complete, onToggleEdit, text} ) => (
	<TouchableOpacity style={styles.textWrap} onLongPress={() => onToggleEdit(true)}>
		<Text style={[ styles.text, complete && styles.complete ]}>
			{text}
		</Text>
	</TouchableOpacity>
);

const RemoveButton = ({onRemove}) => (
	<TouchableOpacity onPress={onRemove}>
		<Text style={styles.destroy}>X</Text>
	</TouchableOpacity>
);

const EditButton = ( {text, onUpdate} ) => (
	<View style={styles.textWrap}>
		<TextInput 
			style={styles.input} 
			value={text} 
			onChangeText={onUpdate} 
			autoFocus 
			multiline 
		/>
	</View>
);

const DoneButton = ({onToggleEdit}) => (
	<TouchableOpacity style={styles.done} onPress={() => onToggleEdit(false)}>
		<Text style={styles.doneText}>
			Save
		</Text>
	</TouchableOpacity>
);

const Row = ( props ) => {
	return (
		<View style={styles.container}>
			<Switch value={props.complete} onValueChange={props.onComplete} />
			{props.editing ? <EditButton text={props.text} onUpdate={props.onUpdate}/>: <ToDoItem onToggleEdit={props.onToggleEdit} text={props.text} complete={props.complete}/>}
			{props.editing ? <DoneButton onToggleEdit={props.onToggleEdit}/> : <RemoveButton onRemove={props.onRemove}/> }
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between'
	},
	input: {
		height: 100,
		flex: 1,
		fontSize: 24,
		padding: 0,
		color: '#4d4d4d'
	},
	textWrap: {
		flex: 1,
		marginHorizontal: 10
	},
	done: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#7be290',
		padding: 7
	},
	doneText: {
		color: '#4d4d4d',
		fontSize: 20
	},
	complete: {
		textDecorationLine: 'line-through'
	},
	text: {
		fontSize: 24,
		color: '#4d4d4d'
	},
	destroy: {
		fontSize: 20,
		color: '#cc9a9a'
	}
});
export default Row;
