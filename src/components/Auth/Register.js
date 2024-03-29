import React, { useState } from 'react'
import {Grid,Form,Segment,Button,Header,Message,Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import md5 from 'md5';
import firebase from "../../firebase";

const Register = () => {

 const [username, handleUser] = useState("")
 const [email, handleEmail] = useState("")
 const [password, handlePassword] = useState("")
 const [passwordConfirmation, handlePasswordConfirmation] = useState("")
 const [errors, handleErrors] = useState([])
 const [loading, handleLoading] = useState(false)
 const [usersRef,handleUsersRef] = useState(firebase.database().ref("users"))




 const isFormEmpty = ({username,email,password,passwordConfirmation}) => {
   return !username.length || !email.length || !password.length || !passwordConfirmation.length
 }

 const isPasswordValid = (password,passwordConfirmation) => {
     if(password.length < 6 || passwordConfirmation < 6){ //min length of password should be 6 characters
       return false
     }else if(password !== passwordConfirmation){
       return false
     }else{
      return true
     }
 }

 const displayErrors = errors => errors.map((error,i) => <p key={i}>{error.message}</p>)

 const isFormValid = () => {
  let errors = []
  let error
   if(isFormEmpty({username,email,password,passwordConfirmation})){
      error = {message: "Fill in all fields"}
      errors = handleErrors(errors.concat(error))
      return false
   } else if(!isPasswordValid(password,passwordConfirmation)){
      error = {message: "Password is invalid or passwords don't match"}
      errors = handleErrors(errors.concat(error))
      return false
   }else{
    return true
   }
 }

 const saveUser = createdUser => {
  return handleUsersRef(usersRef.child(createdUser.user.uid).set({
    name: createdUser.user.displayName,
    avatar: createdUser.user.photoURL
  }))
}

 const handleSubmit = event => {
  event.preventDefault()
  if(isFormValid()){
    handleErrors([])
    handleLoading(true)
    firebase
     .auth()
     .createUserWithEmailAndPassword(email, password)
     .then(userCredential => {
      console.log(userCredential)
      userCredential.user.updateProfile({
        displayName: username,
        photoURL: `http://gravatar.com/avatar/${md5(email)}?d=identicon`
      }).then(() => {
        // console.log(res)
        saveUser(userCredential).then(() => console.log("user saved in database")).catch((err) => console.log(err))
      }).catch((err) => {
        console.log(err)
        handleLoading(false)
        handleErrors(errors.concat(err))
      })
    })
     .catch(err => {
      console.log(err)
      handleLoading(false)
      handleErrors(errors.concat(err))
    })
  }   
 }



 const handleInput = (allerrors, inputName) => {
      return allerrors.some(error => error.message.toLowerCase().includes(inputName)) ? "error" : ""
 }

  return (
    <React.StrictMode>
    <Grid textAlign = "center" verticalAlign="middle" className="app">
       <Grid.Column style={{maxWidth: 450}}>
          <Header as="h1" icon color="orange" textAlign="center">
             <Icon name="puzzle piece" color="orange" />
               Register for DevChat             
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
               <Form.Input fluid name="username" icon="user" iconPosition="left" value={username} placeholder="Username" onChange={e => handleUser(e.target.value)} type="text"/>
               <Form.Input className={handleInput(errors,"email")} fluid name="email" icon="mail" iconPosition="left" value={email} placeholder="Email Address" onChange={e => handleEmail(e.target.value)} type="email"/>
               <Form.Input className={handleInput(errors,"password")} fluid name="password" icon="lock" iconPosition="left" value={password} placeholder="Password" onChange={e => handlePassword(e.target.value)} type="password"/>
               <Form.Input className={handleInput(errors,"password")} fluid name="passwordConfirmation" icon="repeat" iconPosition="left" value={passwordConfirmation} placeholder="Password Confirmation" onChange={e => handlePasswordConfirmation(e.target.value)} type="password"/>
               <Button disabled={loading} className={loading ? "loading" : ""} color="orange" fluid size="large">Submit</Button>
            </Segment>
          </Form>
           {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {displayErrors(errors)}
            </Message>
           )}
          <Message>Already a user? <Link to="/login">Login</Link></Message>
       </Grid.Column>
    </Grid>
    </React.StrictMode>
  )
}


export default Register
