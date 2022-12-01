import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import { Alert, Button, Grid, Typography } from '@mui/material';
import ControlledTextInput from '../../components/Form/ControlledTextInput';
import FormGroupWrapper from '../../components/Form/FormGroupWrapper';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setBasicAuthData } from '../../store/slices/globalSlice';
import { useEffect, useState } from 'react';
import { LOCAL_PASSWORD, LOCAL_USERNAME } from '../../constants/basicAuth';
import axiosInstance from '../../axios';

interface ILoginFormInput {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const basicAuthDataSet = useAppSelector(
    (state) => state.global.basicAuthDataSet,
  );

  const [basicAuthError, setBasicAuthError] = useState<boolean>(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  useEffect(() => {
    if (
      !basicAuthDataSet &&
      localStorage.getItem(LOCAL_USERNAME) &&
      localStorage.getItem(LOCAL_PASSWORD)
    ) {
      dispatch(setBasicAuthData(true));
    }
  }, [basicAuthDataSet, dispatch]);

  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    // use already for axios requests
    axiosInstance.defaults.auth = {
      username: data.username,
      password: data.password,
    };
    // try to get projects as a test if the data is correct
    axiosInstance
      .get('/projects')
      .then(() => {
        // set data needed for basic auth requests
        localStorage.setItem(LOCAL_USERNAME, data.username);
        localStorage.setItem(LOCAL_PASSWORD, data.password);

        dispatch(setBasicAuthData(true));
        navigate('/');
      })
      .catch((reason) => {
        console.log(reason);
        if (reason.response.status === 401) {
          setBasicAuthError(true);
          return;
        }
      });
  };

  return (
    <>
      <PageHeadline text="Please login" />
      <Typography component="div" variant="body1">
        Please enter your credentials (again) to also access the backend within
        this application. You only need to do that once.
      </Typography>
      <FormGroupWrapper caption="Login">
        {basicAuthError && (
          <Grid item xs={12} md={12}>
            <Alert severity="error">
              The credentials you provided are not correct.
            </Alert>
          </Grid>
        )}
        <Grid item xs={12} md={4}>
          <ControlledTextInput
            error={errors.username}
            control={control}
            register={register}
            name="username"
            label="Usernname"
            placeholder=""
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ControlledTextInput
            error={errors.password}
            control={control}
            register={register}
            name="password"
            label="Password"
            placeholder=""
            required
            isPasswordField
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Button
            sx={{ mt: 4 }}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
        </Grid>
      </FormGroupWrapper>
    </>
  );
};

export default Login;
