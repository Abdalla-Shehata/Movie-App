import React, { useState } from 'react'
import axios, { Axios } from 'axios'
import Joi from 'joi'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  let navigate = useNavigate()
  let [err, setError] = useState('') // api
  let [errList, setErrorList] = useState([]) //joi
  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
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
    let { data } = await axios.post(`https://route-movies-api.vercel.app/signup`, Data)
    if (data.message === 'success') {
      setError('')
      // navigate('/project/src/component/login/Login.jsx')
      navigate('/Login')
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
      first_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      last_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

      age: Joi.number()
        .min(16)
        .max(60)
        .required()
    });
    return schema.validate(user, { abortEarly: false });

  }

  return (
    <div className='py-5'>
      {err ? <p className='alert alert-danger'>{err}</p> : ''}
      {errList.map((errr, index) => <p className='alert alert-info' key={index}>{errr.message}</p>)}
      <form onSubmit={submitForm}>
        <label htmlFor="first_name">firstname</label>
        <input type="text" className='form-control my-2' onChange={getInputData} id='first_name' name='first_name' />
        <label htmlFor="last_name">lastname</label>
        <input type="text" className='form-control my-2' onChange={getInputData} id='last_name' name='last_name' />
        <label htmlFor="email">email</label>
        <input type="text" className='form-control my-2' onChange={getInputData} id='email' name='email' />
        <label htmlFor="password">password</label>
        <input type="password" className='form-control my-2' onChange={getInputData} id='password' name='password' />
        <label htmlFor="age">age</label>
        <input type="text" className='form-control my-2' onChange={getInputData} id='age' name='age' />
        <button className='btn btn-info float-end'>register</button>
      </form>
    </div>
  )
}
