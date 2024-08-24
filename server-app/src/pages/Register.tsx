import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    Container,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface RegisterFormValues {
    fullName: string;
    email: string;
    dateOfBirth: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    username: string;
    password: string;
}

const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    dateOfBirth: Yup.date()
        .required('Date of birth is required')
        .max(new Date(), 'Date of birth cannot be in the future'),
    address: Yup.object().shape({
        street: Yup.string().required('Street is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        zipCode: Yup.string()
            .required('Zip code is required')
            .matches(/^\d{5}$/, 'Zip code must be 5 digits'),
    }),
    username: Yup.string()
        .required('Username is required')
        .min(4, 'Username must be at least 4 characters'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
            'Password must contain uppercase, lowercase, number, and special character'
        ),
});

const Register: React.FC = () => {
    const navigate = useNavigate();

    const initialValues: RegisterFormValues = {
        fullName: '',
        email: '',
        dateOfBirth: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
        },
        username: '',
        password: '',
    };

    const handleSubmit = async (values: RegisterFormValues, { setSubmitting, resetForm, setErrors }: any) => {
        try {
            const response = await fetch('http://localhost:8080/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.fieldErrors) {
                    setErrors(errorData.fieldErrors);
                }
                throw new Error(errorData.message || 'Unknown error');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            navigate('/login');
            resetForm();
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Register
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={RegisterSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, touched, errors }) => (
                        <Form>
                            <Typography variant="h6" gutterBottom>
                                Personal Info
                            </Typography>
                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Full Name"
                                    name="fullName"
                                    error={touched.fullName && Boolean(errors.fullName)}
                                    helperText={<ErrorMessage name="fullName" />}
                                />
                            </Box>

                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={<ErrorMessage name="email" />}
                                />
                            </Box>

                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Date of Birth"
                                    name="dateOfBirth"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                                    helperText={<ErrorMessage name="dateOfBirth" />}
                                />
                            </Box>

                            <Typography variant="h6" gutterBottom>
                                Address
                            </Typography>

                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Street"
                                    name="address.street"
                                    error={
                                        touched.address?.street && Boolean(errors.address?.street)
                                    }
                                    helperText={<ErrorMessage name="address.street" />}
                                />
                            </Box>

                            <Grid container spacing={2} mb={2}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="City"
                                        name="address.city"
                                        error={
                                            touched.address?.city && Boolean(errors.address?.city)
                                        }
                                        helperText={<ErrorMessage name="address.city" />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="State"
                                        name="address.state"
                                        error={
                                            touched.address?.state && Boolean(errors.address?.state)
                                        }
                                        helperText={<ErrorMessage name="address.state" />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Zip Code"
                                        name="address.zipCode"
                                        error={
                                            touched.address?.zipCode &&
                                            Boolean(errors.address?.zipCode)
                                        }
                                        helperText={<ErrorMessage name="address.zipCode" />}
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant="h6" gutterBottom>
                                Account Info
                            </Typography>

                            <Box mb={2}>
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
                                {isSubmitting ? 'Registering...' : 'Register'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
};

export default Register;
