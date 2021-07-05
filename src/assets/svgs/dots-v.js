import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SvgComponet = (props) => {
	return (
		<View>
			<Svg
				aria-hidden="true"
				data-icon="ellipsis-v"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 192 512"
				{...props}
			>
				<Path
					fill={props.fill ? props.fill : '#ffffff'}
					d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"
				/>
			</Svg>
		</View>
	);
};

export default SvgComponet;
