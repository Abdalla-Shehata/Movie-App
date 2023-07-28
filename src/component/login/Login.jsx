import React, { useState } from 'react'
import axios  from 'axios'
import Joi from 'joi'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
  let navigate = useNavigate()
  let [err, setError] = useState('') // api
  let [errList, setErrorList] = useState([]) //joi
  let [user, setUser] = useState({
    email: "",
    password: "",
  })

  function getInputData(e) {
    let newUser = { ...user };
    newUser[e.target.name] = e.target.value
    setUser(newUser)
    console.log(user);
  }

  async function getApi(Data) {
    let { data } = await axios.post(`https://route-movies-api.vercel.app/signin`, Data)
    if (data.message === 'success') {
      setError('')
      localStorage.setItem('token',data.token)  // visible on all the application
      props.saveCurrentUserPro() // call function when success  and the user will contain information
      navigate('/home')
    } else {
      setError(data.message);
    }
  }

  function submitForm(e) {
    e.preventDefault()
    let resValidate = validation()
    console.log(resValidate);
    if (resValidate.error) {
      setErrorList(resValidate.error.details)
    } else {
      setErrorList([])
      getApi(user)
    }
  }

  function validation() {
    const schema = Joi.object({
      
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    });
    return schema.validate(user, { abortEarly: false });

  }

  return (
    <div className='py-5'>
      {err ? <p className='alert alert-danger'>{err}</p> : ''}
      {errList.map((errr, index) => <p className='alert alert-info' key={index}>{errr.message}</p>)}
      <h2>Login Form</h2>
      <form onSubmit={submitForm}>
        
        <label htmlFor="email">email</label>
        <input type="text" className='form-control my-2' onChange={getInputData} id='email' name='email' />
        <label htmlFor="password">password</label>
        <input type="password" className='form-control my-2' onChange={getInputData} id='password' name='password' />
        
        <button type='submit' className='btn btn-info float-end'>login</button>
      </form>
    </div>
  )
}
