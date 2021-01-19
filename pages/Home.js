import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import { openDatabase } from "expo-sqlite";
import AppLoading from 'expo-app-loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Font } from 'expo';
// import { Epub } from 'epubjs-rn';


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
  React. useEffect(() => {
 // clickForSearch("");
  },[]);


   clickForSearch= (bookSearch)=> {
    const db = openDatabase("db");

    var bookToBeSearched  = bookSearch;
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS BooksTable (name, link, flag, author,imgpath)');

      //Get all row information from BooksTable
      //tx.executeSql("SELECT * FROM BooksTable WHERE name like ?", ["'%" + bookToBeSearched + "%'"], function (tx, results) {
      tx.executeSql(`Select * from BooksTable where name like '%${bookToBeSearched}%'`, [], function(tx, results){
        //alert('Result obtained');
    //  setBooks(results);
      for(var i=1; i<=results.rows.length;i++) {
        // var bname = results.rows[i].name;
       // console.log('results',results.rows);

        //alert(bname);
        // var blink = results.rows.item(i).link;
        // var bookStatusFlag = results.rows.item(i).flag;
        // var bookStatusAuthor = results.rows.item(i).author; 
        // var bookStatusImgPath = results.rows.item(i).imgpath;
        // books.push(bname);
      }


    })
  })

   }



  // const db = openDatabase('db.testDb');
  // db.transaction(tx => {

  //   tx.executeSql(`Select * from BooksTable`, [], function (tx, results) {
  //     console.log('results', results);
  //     for (var i = 0; i <= results.rows.length; i++) {
  //       books.push(results.rows.item(i));
  //       //alert(results.rows.item(i));
  //     }

  //   })
  // })




  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
   // need to verify whether doc is epub
   // alert(result.name);
    const db = openDatabase("db");
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
 
    // const ebook =() => {
    //   return (
    //     <Epub src={"https://s3.amazonaws.com/epubjs/books/moby-dick/OPS/package.opf"}
    //     flow={"paginated"} />
      
    //   )}

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }


    // const lapsList = books.rows.map((data) => {
    //   return (
    //     <View><Text>{data.name}</Text></View>
    //   )
    // })
  
  return (

    <Container>
      <Header style={{ backgroundColor: 'black' }}>
        
        <Left>

        <Icon.Button name='cog' dark backgroundColor="black">
          <Text style={{ color: "white" }}>Settings</Text>
        </Icon.Button>
        </Left>
        {/* <Body>
        <Text  style={{ color: "white"}}> HOME </Text>  
        </Body> */}
        <Right>
        <Icon.Button name='plus' onPress={() => _pickDocument()}  dark backgroundColor="black">
          <Text style={{ color: "white" }}>Add Books</Text>
        </Icon.Button>
        </Right>
      </Header>
      
      <Content >
    
            <FormItem rounded>
            <Input placeholder='Search'/>
            <Button onclick= "clickForSearch()">
          <Text>
            GO
          </Text>
        </Button>
          </FormItem>
          
      
     
      {/* {lapsList} */}
{/* 
        {books.map((values, index) => (
            <Text style={{ color:"black" }} > {values}</Text>
              ))}  */}
        {/* books.map((y) => { (<Text>{y}</Text>)});
        { books.map((item, key)=>(
         <Text key={key}   > { item } </Text>)
         )} */}
          {/* {books.map((values, index) => (
              <Text key={index}>{values.name}</Text>
              ))} */}
              {/* Object.keys(books).map(value => {
  // if(departureloc[value] && departureloc[value].lat) {
  //    return //...
            <Text >{books[value].name}</Text>
              }) */}

              
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
