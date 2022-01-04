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
				<Pressable style={styles.button} onPress={onImageLibraryPress}>
					<Text style={styles.buttonText}>Add Image</Text>
					<Image style={styles.buttonIcon} source={images.image} />
				</Pressable>
			</SafeAreaView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modal: {
		justifyContent: 'flex-end',
		margin: 2,
	},
	buttonIcon: {
		width: 40,
		height: 40,
	},
	buttons: {
		backgroundColor: 'white',
		flexDirection: 'row',
		borderTopRightRadius: 30,
		borderTopLeftRadius: 40,
	},
	button: {
		flex: 1,
		// justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 10,
		padding: 10,
		borderRadius: 20,
		// marginLeft: 115,
		backgroundColor: '#8a8a8a',
		color: '#fff',
		shadowColor: "#000",
		marginTop: 25,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
});
