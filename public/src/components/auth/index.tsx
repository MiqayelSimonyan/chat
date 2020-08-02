import React, { useEffect, FunctionComponent, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { Button, Grid, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import CustomModal from 'components/common/custom-modal';
import validate from 'components/common/validate';
import ErrorField from 'components/common/error-field';

import { loginRegister } from 'ducks/auth';

import 'assets/styles/layout/auth.scss';
import { IIndexSignature } from 'types/global/index-signature';

const styles = () => ({
    button: {
        marginRight: '10px',
        backgroundColor: '#1f5598'
    },
});

type Props = {
    title: string;
    mode: string;
    classes: IIndexSignature<any>;
};

const Auth: FunctionComponent<Props> = ({ mode, title, classes }) => {
    const [open, setModalStatus] = useState<boolean>(false);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: { username: '', password: '' },
        validate,
        onSubmit: (values) => {
            dispatch(loginRegister({
                mode,
                user: values
            }));
        },
    });

    const modalHandler = useCallback(() => {
        setModalStatus(!open);
    }, [open]);

    const { handleSubmit, values, touched, errors, setFieldValue, resetForm } = formik;

    const resetFormHandler = () => {
        resetForm();
    };

    useEffect(() => {
        if (!open) resetFormHandler();
    }, [open]);

    const onChange = useCallback((fieldName: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(fieldName, event.target.value);
    }, [setFieldValue]);

    return (
        <>
            <Button onClick={modalHandler}>{mode === 'signIn' ? 'Sign In' : 'Sign Up'}</Button>

            <CustomModal open={open} modalHandler={modalHandler} overlay="overlay">
                <Box className="modal-header">
                    <h4>{mode === 'signIn' ? 'Sign In' : 'Sign Up'}</h4>
                </Box>
                <Grid container className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    id="standard-username"
                                    label="Username"
                                    fullWidth
                                    onChange={onChange.bind(null, 'username')}
                                    value={values.username}
                                />
                                <ErrorField errors={errors} touched={touched} fieldName='username' />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="standard-password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    onChange={onChange.bind(null, 'password')}
                                    value={values.password}
                                />
                                <ErrorField errors={errors} touched={touched} fieldName='password' />
                            </Grid>
                        </Grid>
                        <Box mt={5} className='modal-footer'>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                type="submit"
                            >
                                {title}
                            </Button>
                        </Box>
                    </form>
                </Grid>
            </CustomModal>
        </>
    );
};

export default withStyles(styles)(Auth);