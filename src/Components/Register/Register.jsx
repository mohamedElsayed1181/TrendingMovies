import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'




export default function Register() {
  let navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [messageError, setmessageError] = useState('');
  //const [messagesuccess, setmessagesuccess] = useState('');

  async function handleRegister(value) {

    setisloading(true);

    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, value).catch((err) => {
      setisloading(false);
      setmessageError(`${err?.response?.data?.errors?.param} : ${err?.response?.data?.errors?.msg}`)
    })



    if (data.message === 'success') {
     // setmessagesuccess(data.message)
      setisloading(false);
      navigate('/login')
    }
  }



  let validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Name min length is 3').max(10, 'Name max length is 10'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start with uppercase..'),
    rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')], 'Password and repassword doesnt match'),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Phone is invalid')

  })


  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: ''
    },
    validationSchema,
    onSubmit: handleRegister
  });

  return <>
    <div className="w-75 mx-auto mt-5 mb-5">

      <h3 className='text-white text-center py-2'>Register Now : </h3>






      <form onSubmit={formik.handleSubmit}>



        <label className='text-white py-1' htmlFor="name">Name :</label>
        <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id='name' />
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger text-center'>{formik.errors.name}</div> : null}


        <label className='text-white py-1' htmlFor="email">Email :</label>
        <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id='email' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger text-center'>{formik.errors.email}</div> : null}
 

        <label className='text-white py-1' htmlFor="password">Password :</label>
        <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id='password' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger text-center'>{formik.errors.password}</div> : null}


        <label className='text-white py-1' htmlFor="repassword">rePassword :</label>
        <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id='rePassword' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger text-center'>{formik.errors.rePassword}</div> : null}



        <label className='text-white py-1' htmlFor="phone">Phone :</label>
        <input onBlur={formik.handleBlur} className='form-control mb-4' onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id='phone' />
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger text-center'>{formik.errors.phone}</div> : null}


        {isloading ? <button type="button" className='btn bg-main text-white w-100'><i className='fas fa-spinner fa-spin'></i></button>
          : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className='btn btn-login text-white w-100'>Register</button>
        }


        {messageError ? <div className='text-danger text-center mt-5 Email-Error'>Email is already in use.</div> : null}

      </form>
    </div>

  </>
}
