import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  editTask: (taskId: number, taskNewTitle: string) => void;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  task: Task;
  index: number;
}

export function TaskItem({
  toggleTaskDone,
  removeTask,
  editTask,
  task,
  index,
}: TaskItemProps) {
  const [editable, setEditable] = useState(false);
  const [titleTask, setTitleTask] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setEditable(true);
  }

  function handleCancelEditing() {
    setEditable(false);
    setTitleTask(task.title);
  }

  function handleSubmitEditing() {
    editTask(task.id, titleTask);
    setEditable(false);
  }

  useEffect(() => {
    if (editable) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [editable]);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}>
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}>
            {task.done && <Icon name='check' size={12} color='#FFF' />}
          </View>

          <TextInput
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={titleTask}
            onChangeText={setTitleTask}
            editable={editable}
            onSubmitEditing={handleSubmitEditing}
            onBlur={handleCancelEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.containerButton}>
        {editable ? (
          <TouchableOpacity
            testID={`trash-${index}`}
            style={{ justifyContent: 'center', paddingRight: 12 }}
            onPress={handleCancelEditing}>
            <Icon name='x' size={22} color='#B2B2B2' />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`trash-${index}`}
            style={{ paddingRight: 12 }}
            onPress={handleStartEditing}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ ...styles.buttonTrash, opacity: editable ? 0.2 : 1 }}
          onPress={() => removeTask(task.id)}
          disabled={editable}>
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerButton: {
    flexDirection: 'row',
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 4,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
  buttonTrash: {
    paddingRight: 24,
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#c8c8c8',
  },
});
