import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    Container,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    Alert,
    Link as MuiLink,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';

interface LoginFormValues {
    username: string;
    password: string;
}

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (
        values: LoginFormValues,
        { setSubmitting }: any
    ) => {
        try {
            const response = await fetch('http://localhost:8080/users');
            const users = await response.json();

            const user = users.find((u: any) => u.username === values.username);

            if (!user) {
                setErrorMessage('Username not found');
                return;
            }

            const isPasswordCorrect = await bcrypt.compare(values.password, user.password);

            if (!isPasswordCorrect) {
                setErrorMessage('Incorrect password');
                return;
            }

            localStorage.setItem('authToken', users.token); // 
            navigate('/category');
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('An unexpected error occurred. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Login
                </Typography>
                {errorMessage && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMessage === 'Username not found' ? (
                            <>
                                Username not found, please{' '}
                                <MuiLink component={Link} to="/register">
                                    register
                                </MuiLink>
                                .
                            </>
                        ) : (
                            errorMessage
                        )}
                    </Alert>
                )}
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, touched, errors }) => (
                        <Form>
                            <Box mb={3}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={<ErrorMessage name="username" />}
                                />
                            </Box>

                            <Box mb={4}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={<ErrorMessage name="password" />}
                                />
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
};

export default Login;