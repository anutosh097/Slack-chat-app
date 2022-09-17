import React, { useState } from 'react'
import {Grid,Form,Segment,Button,Header,Message,Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import firebase from "../../firebase";

const Register = () => {

 const [username, handleUser] = useState("")
 const [email, handleEmail] = useState("")
 const [password, handlePassword] = useState("")
 const [passwordConfirmation, handlePasswordConfirmation] = useState("")

 const handleSubmit = event => {
    event.preventDefault()
    firebase
     .auth()
     .createUserWithEmailAndPassword(email, password)
     .then(userCredential => console.log(userCredential))
     .catch(err => console.log(err))
 }

  return (
    <React.StrictMode>
    <Grid textAlign = "center" verticalAlign="middle" className="app">
       <Grid.Column style={{maxWidth: 450}}>
          <Header as="h2" icon color="orange" textAlign="center">
             <Icon name="puzzle piece" color="orange" />
               Register for DevChat             
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
               <Form.Input fluid name="username" icon="user" iconPosition="left" value={username} placeholder="Username" onChange={e => handleUser(e.target.value)} type="text"/>
               <Form.Input fluid name="email" icon="mail" iconPosition="left" value={email} placeholder="Email Address" onChange={e => handleEmail(e.target.value)} type="email"/>
               <Form.Input fluid name="password" icon="lock" iconPosition="left" value={password} placeholder="Password" onChange={e => handlePassword(e.target.value)} type="password"/>
               <Form.Input fluid name="passwordConfirmation" icon="repeat" iconPosition="left" value={passwordConfirmation} placeholder="Password Confirmation" onChange={e => handlePasswordConfirmation(e.target.value)} type="password"/>
               <Button color="orange" fluid size="large">Submit</Button>
            </Segment>
          </Form>
          <Message>Already a user? <Link to="/login">Login</Link></Message>
       </Grid.Column>
    </Grid>
    </React.StrictMode>
  )
}


export default Register
