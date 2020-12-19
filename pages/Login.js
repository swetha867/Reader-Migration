import React,{Component} from 'react';
import {connect} from 'react-redux';
// import { Redirect } from "react-router-dom";

// import { NavigationContainer,navigate,navigation } from '@react-navigation/native';

// import {View,TouchableOpacity,Text,TextInput}  from 'react-native';
// import 
// {Item as FormItem, Container ,Header,Button,Input,Label} from 'native-base';
import {
  Container,
  Header,
  Button,
  Text,
  Body,
  Form,
  Icon,
  Left,
  Right,
  Item as FormItem,
  Input,
  Label,
  Title,
  View,
} from 'native-base';
import axios from "axios";
// import Home from './Home';
// import { AsyncStorage } from 'react-native';

import {
  setStudentId,
  setIsLoggedIn,
  setIsTeacher,
  setUserID,
  setEmail
} from "../redux/actions/userActions";
import Home from './Home';


const Login = ({
  email,
  student_id,
  isLoggedIn,
  dispatch,
}) => {  

   const login = () => {


    
    axios
    .post("http://3.15.37.149:6010/users/", {
      email: email,
      student_id: student_id
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {

      if (response.data.user_id!=0 ) {
        dispatch(setIsLoggedIn(true)); 
        dispatch(setIsTeacher(response.data.isTeacher));
        dispatch(setUserID(response.data.user_id));

              
      } else {
        dispatch(setIsLoggedIn(false));
      }
      alert(isLoggedIn);
    });
    
};
// if(isLoggedIn){
//  // navigation.navigate('Home');
//  navigate('home');
// }
    // this.props.login(this.state.email,this.state.password).then(() => {
    //   if(this.props.error){
    //     alert(this.props.error)
    //   }
    //   else{
    //     alert(this.props.userData.user.name+' user successfully logged in ')
    //   }
    // })
  

    return(

      // <View style={{flex:2}}>
      //          <Text style={{marginTop:40,color:'black',textAlign:'center'}}>Koob Epub Reader</Text> 
      //          <FormItem floatingLabel>
      //       <Label>Email</Label>
      //      <Input /> </FormItem> 
      //      <FormItem floatingLabel>
      //       <Label>Student ID</Label>
      //      <Input /> </FormItem> 
      //    {/* <TextInput autoCapitalize="none" style={styles.input} placeholder="SFSU Email Address" value={email} onChangeText={(e) => dispatch(setEmail(e))}/> */}
      //   <TextInput autoCapitalize="none"   style={styles.input} placeholder="Student ID" value={student_id} onChangeText={(e) => dispatch(setStudentId(e))}/>
      //   <TouchableOpacity onPress={() =>login()}>
      //     <Text style={{marginTop:20,color:'black',textAlign:'center'}}>
      //       Login
      //     </Text>
      //   </TouchableOpacity>
      //   </View>
      
      
      <Container>
      <Header style={{ backgroundColor: 'black' }}
>
<Body>
          <Title  style={{  alignSelf:'center'}}>Reader</Title>
        </Body>
      {/* <Button iconLeft dark>
            <Icon name='cog' />
            <Text>Settings</Text>
          </Button>
       
        <Button iconLeft dark>
            <Icon name='cog' />
            <Text>Add Books</Text>
          </Button> */}
      </Header>
         

      <Form > 
        <FormItem floatingLabel style={{ marginLeft: 75, marginRight: 75, marginTop: 100 }} >
          <Label>SFSU Email Address</Label>
          {/* onChangeText={(e) => dispatch(setEmail(e))}  */}
          <Input onChangeText={(e) => dispatch(setEmail(e))} />
        </FormItem>
        <FormItem floatingLabel  style={{ marginLeft: 75, marginRight: 75 }}>
          <Label>Student Id</Label>
          {/* onChangeText={(e) => dispatch(setStudentId(e))} */}
          <Input onChangeText={(e) => dispatch(setStudentId(e))} />
        </FormItem>

        <Button rounded dark style={{   marginTop: 40 
,alignSelf:'center'}} onPress={() =>login()}>
          <Text> Login </Text>
        </Button>
      </Form>
    </Container>
    )
  
};
// const AppNavigator = StackNavigator({
//   First: {
//     home: Home,
//   }
// });
const mapStateToProps = (state) => {
  return {
    email: state.userReducer.email,
    student_id: state.userReducer.student_id,
    isLoggedIn: state.userReducer.isLoggedIn,
    // navigation: state.navigation 

    

  };
};

export default connect(mapStateToProps)(Login);

