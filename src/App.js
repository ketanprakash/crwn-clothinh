import { Routes, Route, Navigate } from 'react-router';
import { connect } from 'react-redux';
import React from 'react';
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions';
import './App.css';

import {HomePage} from './pages/homepage/homepage.component'
import {ShopPage} from './pages/shop/shop.component'
import { SignInAndSignUpPage } from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import Header from './components/header/header.component'

const SignInPageAuth = ({currentUser}) => {
  return currentUser ? <Navigate to = '/' replace = {true}/> : <SignInAndSignUpPage/>
}

class App extends React.Component{
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      }
      else setCurrentUser(userAuth);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/shop' element={<ShopPage/>}/>
          <Route path='/signin' element={<SignInPageAuth currentUser={this.props.currentUser}/>}/>
        </Routes>
      </div>
    )
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
