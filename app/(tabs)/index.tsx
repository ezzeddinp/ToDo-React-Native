import { View, Text, ScrollView, TouchableOpacity, Modal, Button, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';

interface Note {
	id: number;
	title: string;
	content: string;
}



const NoteTaker: React.FC = () => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [selectedNote, setSelectedNote] = useState<Note | null>(null);
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [modalVisible, setModalVisible] = useState<boolean>(false)

	const handleSaveNote = () => {
		if (selectedNote) {
			const updatedNotes = notes.map((note) =>
				note.id === selectedNote.id ? { ...note, title, content } : note
			); // kalau id yg udh ada equal to id yg dipilih then nampilin smua note title content
			setNotes(updatedNotes);
			setSelectedNote(null); // reset selected note karna udh dihapus td
		} else {
			const newNote: Note = {
				id: Date.now(),
				title,
				content
			};
			setNotes([...notes, newNote]); // mengupdate notes & menambahkan newNote ke tampungan notes
		}
		setTitle("");
		setContent("");
		setModalVisible(false);
	}

	// ngehandle edit
	const handleEditNote = (note: Note) => {
		setSelectedNote(note);
		setTitle(note.title);
		setContent(note.content);
		setModalVisible(true);
	}

	const handleDeleteNote = (note: Note) => {
		const updatedNotes = notes.filter((item) => item.id !== note.id)
		setNotes(updatedNotes); // ngeUpdate note setelah melakukan delete
		setSelectedNote(null); // inactive note yg diselect soalnya udh kehapus
		setModalVisible(false);
	}

	const closeModal = () => {
		setSelectedNote(null); //harus direset soalnya habis close form notenya, kalau ga nnti pas add note, si delete button akan muncul walaupun gada data
		setModalVisible(false);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>My Noooooooooooootes</Text>
			<ScrollView style={styles.noteList}>
				{
					notes.map((note) => (
						<TouchableOpacity key={note.id} onPress={() => handleEditNote(note)}>
							<Text style={styles.noteList}>
								{note.title}
							</Text>
						</TouchableOpacity>
					))
				}
			</ScrollView>

			{/* Add Button */}
			<TouchableOpacity
				style={styles.addButton}
				onPress={() => {
					setTitle("");
					setContent("");
					setModalVisible(true);
				}}
			>
				<Text style={styles.addButtonText}>Add Note</Text>
			</TouchableOpacity>

			<Modal presentationStyle="pageSheet" visible={modalVisible} animationType="slide" transparent={false}>
				<View style={styles.modalContainer}>
					<TextInput
						style={styles.input}
						placeholder="Note Title"
						value={title}
						onChangeText={setTitle}
					/>
					<TextInput
						style={styles.contentInput}
						placeholder="Note Content"
						value={content}
						onChangeText={setContent}
					/>

					<View style={styles.buttonContainer}>
						<Button // i recommend use touchableopacity for better customize of color in text
							title="Save"
							onPress={handleSaveNote}
							color="dark"
						/>
						<Button
							title="Close"
							onPress={closeModal}
							color="dark"
						/>
						{
							selectedNote && (
								<Button
									title="Delete"
									onPress={() => handleDeleteNote(selectedNote)}
									color="red"
								/>
							)
						}
					</View>
				</View>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 40,
		backgroundColor: "black"
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
		color: "white"
	},
	noteList: {
		flex: 1,
		color: "white",
	},
	noteTitle: {
		fontSize: 15,
		marginBottom: 10,
		fontWeight: "bold",
		color: "white",
		backgroundColor: "black",
		height: 40,
		width: "100%",
		padding: 10,
		borderRadius: 8
	},
	addButton: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		paddingVertical: 12,
		borderRadius: 5,
		marginTop: 10
	},
	addButtonText: {
		color: "black",
		fontSize: 15,
		fontWeight: "bold"
	},
	modalContainer: {
		flex: 1,
		padding: 50,
		backgroundColor: "black"
	},
	input: {
		borderWidth: 1,
		borderColor: "white",
		color: "white",
		padding: 10,
		marginBottom: 10,
		borderRadius: 5
	},
	contentInput: {
		borderWidth: 1,
		borderColor: "black",
		padding: 10,
		color: "white",
		marginBottom: 20,
		borderRadius: 5,
		height: 150,
		textAlignVertical: "top"
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 30
	}
})


export default NoteTaker