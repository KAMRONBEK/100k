import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	Image,
	View,
	ImageBackground,
} from 'react-native';

import { images } from '../../assets/index';

export function ImagePickerAvatar({ uri, onPress }) {
	return (
		<View style={styles.avatar}>
			<Image
				style={styles.avatarImage}
				source={uri ? { uri } : images.avatar}
			/>
			<TouchableOpacity style={styles.addButton} onPress={onPress}>
				<Image source={images.plus2} style={{ width: 20, height: 20, }} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	imageBackground: {
		flex: 1,
	},
	avatar: {
		resizeMode: 'contain',
		backgroundColor: "#f3f4f5",
	},
	avatarImage: {
		height: 80,
		width: 80,
		borderColor: '#8a8a8a',
		overflow: 'hidden',
		borderWidth: 1,
		borderRadius: 260 / 2,
		backgroundColor: '#000'
	},
	addButton: {
		height: 30,
		width: 30,
		backgroundColor: '#fff',
		borderRadius: 50,
		top: 55,
		left: 50,
		position: 'absolute',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	addButtonIcon: {
		height: 35,
		width: 35,
	},
});
