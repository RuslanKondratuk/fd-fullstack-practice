import React from 'react';
import {Formik, Form, Field} from 'formik';
import { signUp } from '../../api';

const SignUp = () => {
    const initialValues = {
        firstName: '',
        lastName: '',
        birthday: new Date(),
        email: '',
        password: '',
    }

    const submitHandler = (values, actions) => {
        signUp(values)
        .then(data => console.log(data))
    }

        return (
            <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}>
                {(props) => (
                    <Form>
                        <Field name='firstName' placeholder="Type your firstName"/>
                        <Field name='lastName' placeholder="Type your lastName"/>
                        <Field name='email' placeholder="Type your email"/>
                        <Field name='birthday' type='date' placeholder="Type your birthday"/>
                        <Field name='password' placeholder="Type your password"/>
                        <button type = 'submit'>Authorization!</button>
                    </Form>
                )}
            </Formik>
        );
    }

export default SignUp;
