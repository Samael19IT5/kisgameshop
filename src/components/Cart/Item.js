import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../../theme/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {db} from '../../../firebase';
import {numberWithCommas} from '../../utils/numberWithCommas';

export default function Item(props) {
  const [limit, setLimit] = React.useState();
  const productRef = db.collection('product').doc(props.itemId).get();

  const plusItem = () => {
    try {
      const fetchProduct = async () => {
        await productRef.then(doc => {
          setLimit(doc.data().quantity);
        });
      };
      fetchProduct();
    } catch (error) {}
    const itemRef = db.collection('cart').doc(props.id);
    let val = props.quantity + 1;
    console.log(limit);
    if (val > limit) {
      val = limit;
    }
    itemRef
      .update({quantity: val})
      .then(() => {
        console.log('Document successfully updated!' + limit);
      })
      .catch(error => {
        console.error('Error updating document: ', error);
      });
  };

  const minusItem = () => {
    const itemRef = db.collection('cart').doc(props.id);
    let val = props.quantity - 1;
    if (val == 0) {
      val = 1;
    }
    itemRef
      .update({quantity: val})
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch(error => {
        console.error('Error updating document: ', error);
      });
  };

  const removeItem = () => {
    db.collection('cart')
      .doc(props.id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: props.image,
        }}
      />
      <View
        style={{
          padding: 4,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.price}>{numberWithCommas(props.price)} đ</Text>
        <View style={styles.set}>
          <View style={styles.set}>
            <TouchableOpacity onPress={() => plusItem()}>
              <Icon style={styles.icon} name="plus" />
            </TouchableOpacity>
            <Text> {props.quantity} </Text>
            <TouchableOpacity onPress={() => minusItem()}>
              <Icon style={styles.icon} name="minus" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => removeItem()}>
            <Icon style={styles.icon} name="trash-o" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginVertical: 4,
            marginHorizontal: 8,
            borderBottomColor: colors.blue,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 120,
    margin: 8,
    borderRadius: 8,
  },
  name: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  price: {
    margin: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.red,
  },
  set: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  icon: {
    marginHorizontal: 8,
    fontSize: 20,
  },
});
