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
import { useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import * as Yup from 'yup';
import {useDispatch} from 'react-redux'
import {registerUser} from '../../redux/features/user/authSlice'
// import {registerUser} from '../../redux/features/user/userSlice'


import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



const SignUp = () => {
    const dispatch =useDispatch()

    const formik  = useFormik ({
        initialValues:{
      name:"",
      email:"",
      mobile:"",
      password:"",
    //   cpassword:""
     },
     validationSchema: Yup.object({
        
         name: Yup.string().required('Name is Required'),
         mobile: Yup.string().required('mobile Number is Required'),
         email: Yup.string().email('Email should be vailid').required('Email Is Required'),
         password: Yup.string()
         .max(15, 'Must be 15 characters or less')
         .required('Password is  Required'),
       }),
     onSubmit: (values) => {
         dispatch(registerUser(values))
    //    alert(JSON.stringify(values, null, 2));
    //    console.log(values);
     },
 });

    // const [register, { isSuccess }] = useRegisterMutation()
    // const navigate = useNavigate()
    // const { ui, data, pre } = useDynamic([
    //     // { type: "text", name: "name" },
    //     // { type: "email", name: "email" },
    //     // { type: "password", name: "password" },
    //     // { type: "number", name: "mobile" },
    // ])
    // useEffect(() => {
    //     if (isSuccess) {
    //         navigate("/login")
    //     }
    // }, [isSuccess])
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const [showLoader, setShowLoader] = useState(false);


    // const [formFields, setFormFields] = useState(
    // {
    //     email: '',
    //     password: '',
    //     conformPassword: '',
    // }
    // )



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
                <div className="breadcrumbWrapper res-hide">
                    <div className="container-fluid">
                        <ul className="breadcrumb breadcrumb2 mb-0">
                            <li><Link to="/">Home</Link>  </li>
                            <li>SignUp</li>
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

                        <h3>SignUp</h3>
                        <form className='mt-4' action="" onSubmit={formik.handleSubmit}>
                            <div className='form-group mb-4 w-100'>
                                <TextField id="name" type="text" name='name' label="Please Enter Your Name" className='w-100'
                                 onChange={formik.handleChange}  
                                 value={formik.values.name}
                                 onBlur ={formik.handleBlur('name')}

                                 />
                                   <div className="error">
                                  {formik.touched.name && formik.errors.name}
       </div>
                            </div>
                            <div className='form-group mb-4 w-100'>
                                <TextField id="mobile" type="number" name='mobile' label="Mobile" className='w-100' 
                                 onChange={formik.handleChange('mobile')}  
                                 value={formik.values.mobile}
                                 onBlur ={formik.handleBlur('mobile')}
                                />
                                 <div className="error">
                                  {formik.touched.mobile && formik.errors.mobile}
       </div>
                            </div>
                            <div className='form-group mb-4 w-100'>
                                <TextField id="email" type="email" name='email' label="Email" className='w-100'
                                 onChange={formik.handleChange}  
                                 value={formik.values.email}
                                 onBlur ={formik.handleBlur('email')}
                                 />
                                  <div className="error">
                                  {formik.touched.email && formik.errors.email}
       </div>
                            </div>
                            <div className='form-group mb-4 w-100'>
                                <div className='position-relative'>
                                    <TextField id="password" type={showPassword === false ? 'password' : 'text'} name='password' label="Password" className='w-100'
                                     onChange={formik.handleChange}  
                                     value={formik.values.password}
                                     onBlur ={formik.handleBlur('Password')}

                                     />
                                      <div className="error">
                                  {formik.touched.password && formik.errors.password}
       </div>
                                    <Button className='icon' onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />
                                        }

                                    </Button>
                                </div>

                            </div>

{/* confirm password */}
                            {/* <div className='form-group mb-4 w-100'>
                                <div className='position-relative'>
                                    <TextField id="cpassword" type={showPassword1 === false ? 'password' : 'text'} name='cpassword' label="Confirm Password" className='w-100' onChange={onChangeField}  value={formFields.conformPassword}/>
                                    <Button className='icon' onClick={() => setShowPassword1(!showPassword1)}>
                                        {
                                            showPassword1 === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />
                                        }

                                    </Button>
                                </div>

                            </div> */}


                            <div className='form-group mt-5 mb-4 w-100'>
                                <Button  className='btn btn-g btn-lg w-100'>Sign Up</Button>
                            </div>

                            <p className='text-center'>Already have an account
                                <b> <Link to="/signIn" >Sign In</Link>
                                </b>
                            </p>



                        </form>
                    </div>
                </div>


            </section>
        </>
    )
}

export default SignUp;