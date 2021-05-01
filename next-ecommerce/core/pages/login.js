import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from 'next/link'
import { Link as ALink } from '@material-ui/core'
import Router from 'next/router';
import { useMachine } from '@xstate/react'
import { Machine } from 'xstate'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))


const toggleMachine = Machine({
  id: 'toggle',
  initial: 'loggedOut',
  states: {
    loggedOut: {
      on: { TOGGLE: 'loggedIn' }
    },
    loggedIn: {
      on: { TOGGLE: 'loggedOut' }
    },
  }
})


export default function Login() {

  const classes = useStyles()

  const [csrfToken, setCsrfToken] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [state, send] = useMachine(toggleMachine)

  useEffect(() => {
    // Request a CSRF Token from backend
    // Define credentials to send cookies with request
    fetch("http://localhost:8000/account/csrf/", {
      credentials: "include",
    })
      .then((res) => {
        let csrfToken = res.headers.get("X-CSRFToken")
        setCsrfToken(csrfToken)
        // console.log(csrfToken)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleSubmit = (e) => {
    let isOk = false

    e.preventDefault()

    fetch("http://localhost:8000/account/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
    .then((response) => {
      if (response.ok) {
        isOk = true
      }
      return response.json()
    })
    .then((data) => {
      if (!isOk) {
        throw new Error(data.info)
      }
      console.log("DATA", data)
      send('TOGGLE')
      Router.push('/dashboard')
    })
    .catch((err) => {
      setError(err.message)
    })
  }

  console.log(state.value)

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {error}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href=".">
                  <ALink variant="body2">
                    Forgot password?
                  </ALink>
                </Link>
              </Grid>
              <Grid item>
                <Link href=".">
                  <ALink variant="body2">
                    {"Don't have an account? Sign Up"}
                  </ALink>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  )
}