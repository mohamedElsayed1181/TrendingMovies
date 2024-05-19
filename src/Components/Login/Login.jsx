import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

export default function Login({ saveUserData }) {
  let navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [messageError, setmessageError] = useState('');

  async function handleLogin(value) {

    setisloading(true);

    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, value).catch((err) => {

      setisloading(false);
      setmessageError(`${err?.response?.data?.errors?.param} : ${err?.response?.data?.errors?.msg}`)
    })



    if (data.message === 'success') {
      localStorage.setItem('userToken', data.token)
      saveUserData();
      setisloading(false);
      navigate('/')
    }
  }



  let validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start with uppercase..'),
  })


  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin
  });

  return <>
    <div className="w-75 mx-auto mt-5 mb-5">

      <h3 className='py-2 text-white text-center'>Login Now : </h3>






      <form onSubmit={formik.handleSubmit}>

        <label className='text-white py-1' htmlFor="email">Email :</label>
        <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id='email' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger text-center'>{formik.errors.email}</div> : null}


        <label className='text-white py-1' htmlFor="password">Password :</label>
        <input onBlur={formik.handleBlur} className='form-control mb-4' onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id='password' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger text-center'>{formik.errors.password}</div> : null}




        {isloading ? <button type="button" className='btn bg-main text-white w-100'><i className='fas fa-spinner fa-spin'></i></button>
          : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className='btn btn-login text-white w-100 '>Login</button>
        }


        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center mt-4">
              <Link to="/register" className='text-muted text-center'>Don't have an account ? Sign Up Now.  </Link>
            </div>
          </div>
        </div>

        {messageError ? <div className='text-danger mt-5 Email-Error text-center'>Email is not valid.</div> : null}
      </form>
    </div>

  </>
}