import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, TextInput } from 'react-native';

import Trash from '../assets/svgs/trash';

const Item = ({ complete, onToggleEdit, text }) => (
	<TouchableOpacity style={styles.textWrap} onLongPress={() => onToggleEdit(true)}>
		<Text style={[ styles.text, complete && styles.complete ]}>{text}</Text>
	</TouchableOpacity>
);

const RemoveButton = ({ onRemove }) => (
	<TouchableOpacity onPress={onRemove}>
		<Trash width={15} height={15} fill={'#cc9a9a'} />
	</TouchableOpacity>
);

const EditButton = ({ text, onUpdate }) => (
	<View style={styles.textWrap}>
		<TextInput style={styles.input} value={text} onChangeText={onUpdate} autoFocus multiline />
	</View>
);

const DoneButton = ({ onToggleEdit }) => (
	<TouchableOpacity style={styles.done} onPress={() => onToggleEdit(false)}>
		<Text style={styles.doneText}>Save</Text>
	</TouchableOpacity>
);

const Row = (props) => {
	const [ itsComplete, setItsComplete ] = useState(props.complete);

	useEffect(
		() => {
			setItsComplete(props.complete);
		},
		[ props.complete ]
	);

	const toggleSwitch = (value) => {
		setItsComplete((previousState) => !previousState);
		props.onComplete(value);
	};

	return (
		<View style={styles.container}>
			<Switch
				thumbColor={props.complete ? '#f4f3f4' : '#f4f3f4'}
				trackColor={{ true: '#45C8EB', false: '#bababa' }}
				value={itsComplete}
				onValueChange={(value) => toggleSwitch(value)}
			/>

			{props.editing ? (
				<EditButton text={props.text} onUpdate={props.onUpdate} />
			) : (
				<Item onToggleEdit={props.onToggleEdit} text={props.text} complete={itsComplete} />
			)}

			{props.editing ? (
				<DoneButton onToggleEdit={props.onToggleEdit} />
			) : (
				<RemoveButton onRemove={props.onRemove} />
			)}
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
		fontSize: 15
	},
	complete: {
		textDecorationLine: 'line-through'
	},
	text: {
		fontSize: 24,
		color: '#4d4d4d'
	},
	destroy: {
		fontSize: 15,
		color: '#cc9a9a'
	}
});
export default Row;
