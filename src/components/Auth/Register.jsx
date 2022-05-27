import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { signupUser } from 'slices/Auth/auths.slice';
import { EMAIL_REGEX } from 'constants';
import { PASSWORD_REGEX } from 'constants';


const theme = createTheme();

export default function Register({setSwitchAuth}) {
    const dispatch = useDispatch()
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        username: ''
    })

    const [errors, setErrors] = React.useState({
        email : 'Email is require',
        password: 'Password must have at least 8 character, 1 uppercase, 1 number',
    })

    const checkValidity = (field, value) => {
        switch(field){
            case 'email': 
                if(EMAIL_REGEX.test(value)){
                    setErrors({...errors, email: ''})
                    return true
                }else{
                    setErrors({...errors, email: 'Email is invalid'})
                    return false
                }
            case 'password':
                if(PASSWORD_REGEX.test(value)){
                    setErrors({...errors, password: ''})
                    return true
                }
                else{
                    setErrors({...errors, password: 'Password must have at least 8 character, 1 uppercase, 1 number'})
                    return false
                }
            default: return false
        }
    }

    const checkCanSubmit = () => !errors.email && !errors.password 
    const handleChangeValue = (field) => {
      
        return (e) => {
            checkValidity(field, e.target.value)
          setValues((state) => ({
            ...state,
            [field]: e.target.value,
          }));
        };
      };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log({values})
    const callback =()=>setSwitchAuth(0)
    dispatch(signupUser({body:values, callback}))
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value = {values.username}
                  required
                  fullWidth
                  id="firstName"
                  label="User Name"
                 
                  autoFocus
                  onChange={handleChangeValue("username")}
                />
              </Grid>
            
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value ={values.email}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="Email"
                  helperText={errors.email}
                  error={!!errors.email}
                  onChange={handleChangeValue("email")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={values.password}
                  helperText={errors.password}
                  error={!!errors.password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChangeValue("password")}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!checkCanSubmit()}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={()=>setSwitchAuth(0)}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}