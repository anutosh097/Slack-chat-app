import React, { useState } from 'react'
import {Grid,Form,Segment,Button,Header,Message,Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import firebase from "../../firebase";

const Login = () => {

 const [email, handleEmail] = useState("")
 const [password, handlePassword] = useState("")
 const [errors, handleErrors] = useState([])
 const [loading, handleLoading] = useState(false)


 const displayErrors = errors => errors.map((error,i) => <p key={i}>{error.message}</p>)

 const isFormValid = ({email,password}) => email && password

 const handleSubmit = event => {
  event.preventDefault()
  if(isFormValid({email,password})){
    handleErrors([])
    handleLoading(true)
    firebase
    .auth()
    .signInWithEmailAndPassword(email,password)
    .then((signedInUser) => { console.log(signedInUser)})
    .catch(err => {
      console.log(err)
      handleErrors(errors.concat(err))
      handleLoading(false)
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
          <Header as="h1" icon color="violet" textAlign="center">
             <Icon name="code branch" color="violet" />
               Login to DevChat             
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
               <Form.Input className={handleInput(errors,"email")} fluid name="email" icon="mail" iconPosition="left" value={email} placeholder="Email Address" onChange={e => handleEmail(e.target.value)} type="email"/>
               <Form.Input className={handleInput(errors,"password")} fluid name="password" icon="lock" iconPosition="left" value={password} placeholder="Password" onChange={e => handlePassword(e.target.value)} type="password"/>
               <Button disabled={loading} className={loading ? "loading" : ""} color="violet" fluid size="large">Login</Button>
            </Segment>
          </Form>
           {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {displayErrors(errors)}
            </Message>
           )}
          <Message>Don't have an account? <Link to="/register">Register</Link></Message>
       </Grid.Column>
    </Grid>
    </React.StrictMode>
  )
}


export default Login

