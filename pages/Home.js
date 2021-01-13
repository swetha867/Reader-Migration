import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import { openDatabase } from "expo-sqlite";
import AppLoading from 'expo-app-loading';
import Icon from 'react-native-vector-icons/FontAwesome';

// import {Text} from  'react-native';
import {
  Container,
  Header,
  Footer,
  FooterTab,
  Button,
  Text,
  Body,
  Form,
  Left,
  Right,
  Content,
  Item as FormItem,
  Input,
  Label,
  Title,
  View,
} from 'native-base';

const Home = ({

  isLoggedIn,
  dispatch,
}) => {
  const [books, setBooks] = React.useState([]);
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  React. useEffect(() => {
          //Update the document title using the browser API
  (async () => await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    }))();
    setFontsLoaded(true);
  });

  const db = openDatabase('db.testDb');
  db.transaction(tx => {

    tx.executeSql(`Select * from BooksTable`, [], function (tx, results) {
      console.log('results', results);
      for (var i = 0; i <= results.rows.length; i++) {
        books.push(results.rows.item(i).Object.name);
        //alert(results.rows.item(i));
      }

    })
  })




  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    // need to verify whether doc is epub
    // alert(result.name);
    //  const db = openDatabase("db");
    const db = openDatabase('db.testDb');
    var slash_index = result.name.lastIndexOf("/") + 1;
    var epubindex = result.name.lastIndexOf(".epub");
    var onlyname = result.name.substring(slash_index, epubindex);
    onlyname = onlyname.replace(/-/g, " ");
    var linkname = result.uri;
    var bname = toTitleCase(onlyname);
    //alert(bname);
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS BooksTable (name, link, flag, author,imgpath)'
      )
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS BooksTable (name, link, flag, author,imgpath)'
      )
      tx.executeSql('INSERT INTO BooksTable VALUES (?,?,?,?,?)', [bname,
        linkname, 0, '', '']);
    })
    console.log(result);
  }
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (

    // <View style={{flex:1}}>
    //            <Text style={{marginTop:40,color:'black',textAlign:'center'}}>Home</Text> 

    //            </View>
    <Container>
      <Header style={{ backgroundColor: 'black' }}>
        <Body>
        </Body>
        <Icon.Button name='cog' dark backgroundColor="black">
          <Text style={{ color: "white" }}>Settings        </Text>
        </Icon.Button>

        <Icon.Button name='plus' title="Select Document"
          onPress={() => _pickDocument()}>
          <Text style={{ color: "white" }}>Add Books</Text>
        </Icon.Button>
      </Header>
      <Content >
        {/* {books.map((values, index) => (
            <Text style={{ color:"black" }} > {values}</Text>
              ))} */}
        {/* books.map((y) => { (<Text>{y}</Text>)}); */}
      </Content>

      <Footer >
        <FooterTab style={{ backgroundColor: 'black' }} >
          <Button vertical>
            <Text>Home</Text>
          </Button>
          <Button vertical>
            <Text>Book</Text>
          </Button>
          <Button vertical >
            <Text>Statistics</Text>
          </Button>
          <Button vertical>
            <Text>Learning</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>

  )
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
  };
};
export default connect(mapStateToProps)(Home);
