import React from 'react';
import { SafeAreaView, Text, Image, Pressable, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import { images } from '../../assets/index';

export function ImagePickerModal({
	isVisible,
	onClose,
	onImageLibraryPress,
	onCameraPress,
}) {
	return (
		<Modal
			isVisible={isVisible}
			onBackButtonPress={onClose}
			onBackdropPress={onClose}
			style={styles.modal}
		>
			<SafeAreaView style={styles.buttons}>
				<Pressable style={styles.button} onPress={onImageLibraryPress} />
				<Image style={styles.buttonIcon} source={images.image} />
				<Text style={styles.buttonText}>Add Image</Text>
			</SafeAreaView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modal: {
		justifyContent: 'flex-end',
		margin: 10,
	},
	buttonIcon: {
		width: 30,
		height: 30,
	},
	buttons: {
		backgroundColor: 'white',
		flexDirection: 'row',
		borderTopRightRadius: 30,
		borderTopLeftRadius: 40,
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 20,
		padding: 10,
		borderRadius: 20,
		backgroundColor: '#8a8a8a',
		elevation: 5,
		color: '#fff'
	},
});
