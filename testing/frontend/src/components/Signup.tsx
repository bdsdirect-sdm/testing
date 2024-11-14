/* eslint-disable @typescript-eslint/no-unused-vars */
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { Local } from '../environment/env';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import * as Yup from 'yup';
import './Signup.css';

const Signup: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/dashboard')
        }
    }, [navigate]);

    const addUser = async (formData: any) => {
        try {
            const response = await api.post(`${Local.CREATE_USER}`, formData);
            console.log("Response--->", response.data);
            localStorage.setItem("email", formData.email);
            localStorage.setItem("OTP", response.data.OTP);
            toast.success(response.data.message);
            return response;
        }
        catch (err: any) {
            toast.error(err?.response?.data?.message);
            return err;
        }
    }

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('First name is required'),
        lastname: Yup.string().required('Last name is required'),
        doctype: Yup.number().required("Select Doctor Type"),
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().min(8, "Password must be at least 8 characters long").required("Password is required")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/\d/, "Password must contain at least one number")
            .matches(/[`~!@#$%^&*()"?<>|:{}(),.]/, "Password must contain at least one special Character"),
        confirmPass: Yup.string().required("Confirm Password is required")
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });

    const signupMutation = useMutation({
        mutationFn: addUser,
        onSuccess: () => { navigate("/Verify"); }
    });

    const signupHandler = (values: any) => {
        const { confirmPass, ...data } = values;
        signupMutation.mutate(data);
    }

    return (
        <>
        <section className="sign-up-section">
            <div className="parent-div">
                {/* Left Side - Background (Optional) */}
                <div className="left-login-wrap">
                    <div className="bg-img-div">
                    <img src='logo.png' alt="loginbg" />
                    </div>
                </div>

                {/* Right Side - Signup Form */}
                <div className="sign-up-form">
                    <div className="form-heading">
                        <h2>Signup</h2>
                    </div>

                    <Formik
                        initialValues={{
                            firstname: '',
                            lastname: '',
                            doctype: '',
                            email: '',
                            password: '',
                            confirmPass: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={signupHandler}>
                        {() => (
                            <Form className="auth-form">
                                <div className="field-wrap input-fields">
                                    <label>First Name:</label>
                                    <Field type="text" name="firstname" className="form-control" />
                                    <ErrorMessage name="firstname" component="div" className="text-danger" />
                                </div>

                                <div className="field-wrap input-fields">
                                    <label>Last Name:</label>
                                    <Field type="text" name="lastname" className="form-control" />
                                    <ErrorMessage name="lastname" component="div" className="text-danger" />
                                </div>

                                <div className="field-wrap input-fields">
                                <label className="doctor-label">Doctor Type:</label>
    <Field as="select" name="doctype" className="form-select" aria-label="Doctor Type">
        <option value="" disabled>Select Doctor Type</option>
        <option value="1">MD</option>
        <option value="2">OD</option>
    </Field>
    <ErrorMessage name="doctype" component="div" className="text-danger" />
</div>


                                <div className="field-wrap input-fields">
                                    <label>Email:</label>
                                    <Field type="email" name="email" className="form-control" />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>

                                <div className="field-wrap input-fields">
                                    <label>Password:</label>
                                    <Field type="password" name="password" className="form-control" />
                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                </div>

                                <div className="field-wrap input-fields">
                                    <label>Confirm Password:</label>
                                    <Field type="password" name="confirmPass" className="form-control" />
                                    <ErrorMessage name="confirmPass" component="div" className="text-danger" />
                                </div>

                                <button type="submit" className="btn btn-outline-primary sign-up-btn color-#43d79e;">SignUp</button>
                            </Form>
                        )}
                    </Formik>

                    <div className="bottom-sec">
                        <p>Already have an account? <Link to='/Login' className="login-link">Login</Link></p>
                    </div>
                </div>
            </div>
        </section>
        <section className='footer'>
            <div className='footer-content bg-dark'>
                <p className='text-white text-center m-0 p-2'>@2024 Eye Refer</p>
            </div>
        </section>
        </>
    );
}

export default Signup;

