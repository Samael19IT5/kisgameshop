import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import HeaderBack from '../../components/Home/HeaderBack';
import Comment from '../../components/Product/Comment';
import React, {useState, useEffect} from 'react';
import {db, auth} from '../../../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../theme/styles';
import {serverTimestamp} from 'firebase/firestore';

export default function CommentScreen({navigation, route}) {
  const [comments, setComments] = React.useState([]);
  const [text, setText] = React.useState();
  commentRef = db
    .collection('comment')
    .where('productId', '==', route.params.id);
  useEffect(() => {
    try {
      const fetchComment = async () => {
        await commentRef.onSnapshot(snapshot => {
          setComments(
            snapshot.docs.map(doc => ({
              id: doc.id,
              name: doc.data().name,
              image: doc.data().image,
              content: doc.data().content,
              created_at: doc.data().created_at,
              userId: doc.data().created_at,
            })),
          );
        });
      };
      fetchComment();
    } catch (error) {}
  }, []);

  const sendComment = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user');
      if (jsonValue) {
        const store = JSON.parse(jsonValue);
        var docRef = db.collection('user').doc(store.uid);
        docRef
          .get()
          .then(doc => {
            if (doc.exists) {
              db.collection('comment')
                .add({
                  content: text,
                  created_at: serverTimestamp(),
                  image: doc.data().image,
                  name: doc.data().username,
                  productId: route.params.id,
                  userId: doc.id,
                })
                .then(docRef => {
                  console.log('Document written with ID: ', docRef.id);
                  setText();
                })
                .catch(error => {
                  console.error('Error adding document: ', error);
                });
            } else {
              console.log('No such document!');
            }
          })
          .catch(error => {
            console.log('Error getting document:', error);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3FC1A5" />
      <HeaderBack name="TẤT CẢ BÌNH LUẬN" goBack={navigation.goBack} />
      <FlatList
        data={comments}
        renderItem={({item}) => (
          <Comment
            id={item.id}
            name={item.name}
            image={item.image}
            content={item.content}
            time={
              item.created_at
                ? item.created_at.toDate().toLocaleString('en-GB')
                : ''
            }
          />
        )}
        keyExtractor={item => item.id}
      />
      <Text
        style={{
          marginLeft: 8,
          marginBottom: 8,
          fontSize: 16,
          color: colors.secondary,
        }}>
        Viết đánh giá
      </Text>
      <View style={styles.comment}>
        <TextInput
          style={styles.input}
          returnKeyType="done"
          placeholder="Đánh giá của bạn..."
          defaultValue={text}
          onChangeText={newText => setText(newText)}
        />
        <TouchableOpacity onPress={() => sendComment()}>
          <Icon name="send" style={styles.icon}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  comment: {
    flexDirection: 'row',
  },
  input: {
    marginLeft: 8,
    borderWidth: 1,
    flex: 1,
    height: 40,
    fontSize: 16,
    padding: 8,
    color: colors.secondary,
    borderColor: colors.secondary,
  },
  icon: {
    margin: 8,
    width: 40,
    fontSize: 32,
    color: colors.blue,
  },
});
