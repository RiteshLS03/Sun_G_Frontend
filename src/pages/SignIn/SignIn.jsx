/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Button } from '@mui/material';
import { useState } from 'react';
import GoogleImg from '../../assets/images/google.png';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import {  useFormik } from 'formik';
import * as Yup from 'yup';


import { useContext } from 'react';

import { MyContext } from '../../App';
// import { login } from '../../redux/features/auth/authSlice';


const SignIn = (props) => {

const dispatch = useDispatch()

    // validation with formik
    const formik  = useFormik ({
       initialValues:{
     email:"",
     password:""
    },
    validationSchema: Yup.object({
       
        email: Yup.string().email('Email should be vailid').required('Email Is Required'),
        password: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Password is  Required'),
      }),
    onSubmit: (values) => {
        dispatch(login(values))
      alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
});
    // const {type, label, ._id,className, name, value, formik.handleChange, formik.handleBlur}=props;

   
    // useEffect(() => {
    //     if (isSuccess) {
    //         if (user === "401") {
    //             toast.error("Invalid Credentials")
    //         } else {
    //             if (user.role === "admin") {
    //                 toast.success("Admin Login Success")
    //                 navigate("/admin")
    //             } else {
    //                 toast.success("User Login Success")
    //                 navigate("/checkout")
    //             }
    //         }
    //     }
    // }, [user])

    const [showPassword, setShowPassword] = useState(false);

    const [showLoader, setShowLoader] = useState(false);


    // const [formFields, setFormFields] = useState({
    //     email: '',
    //     password: '',
    // })

    // const context = useContext(MyContext);



    // const onChangeField = (e) => {
    //     const name = e.target.name;
    //     const value = e.target.value;

    //     setFormFields(() => ({
    //         ...formFields,
    //         [name]: value,
    //     }))

    // }



    return (
        <>
            <section className='signIn mb-5'>
                <div className="breadcrumbWrapper">
                    <div className="container-fluid">
                        <ul className="breadcrumb breadcrumb2 mb-0">
                            <li><Link to="/">Home</Link>  </li>
                            <li>Sign In</li>
                        </ul>
                    </div>
                </div>



                <div className='loginWrapper'>
                    <div className='card shadow'>
                        <Backdrop
                            sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={showLoader}
                            className="formLoader"
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>

                        <h3>Sign In</h3>
                        <form  onSubmit={formik.handleSubmit} className='mt-4' >
                            <div className='form-group mb-4 w-100'>
                                <TextField id="email" type="email" name='email' label="Email" className='w-100'
                                   onChange={formik.handleChange('email')}
                                   value={formik.values.email}
                                   onBlur={formik.handleBlur}
                                   // onChange={onChangeField} value={formFields.email} 
                                    />
                                    <div className="error">
                                  {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null}</div>
                            </div>
                            <div className='form-group mb-4 w-100'>
                                <div className='position-relative'>
                                    <TextField id="password" type={showPassword === false ? 'password' : 'text'} name='password' label="Password" className='w-100'
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        onBlur={formik.handleBlur}
                                      // onChange={onChangeField} value={formFields.password}
                                         />
                                         <div className="error">
                                          {formik.touched.password && formik.errors.password ? (
         <div>{formik.errors.password}</div>
       ) : null}</div>
                                    <Button className='icon' onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />
                                        }

                                    </Button>
                                </div>
                            </div>



                            <div className='form-group mt-5 mb-4 w-100'>
                                <Button 
                                 className='btn btn-g btn-lg w-100'>Sign In</Button>
                            </div>


                            <div className='form-group mt-5 mb-4 w-100 signInOr'>
                                <p className='text-center'>OR</p>
                                <Button className='w-100' variant="outlined"><img src={GoogleImg} />
                                    Sign In with Google</Button>
                            </div>


                            <p className='text-center'>Not have an account
                                <b> <Link to="/signup">Sign Up</Link>
                                </b>
                            </p>

                        </form>
                    </div>
                </div>


            </section>
        </>
    )
}

export default SignIn;