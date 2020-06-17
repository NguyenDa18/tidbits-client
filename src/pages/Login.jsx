import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../util/graphql'

import { AuthContext } from '../context/auth'
import { useForm } from '../util/hooks'

const Login = (props) => {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    });

    function loginUserCallback() {
        loginUser();
      }

      const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(
          _,
          {
            data: { login: userData }
          }
        ) {
          context.login(userData);
          props.history.push('/');
        },
        onError(err) {
          setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
      });

      return (
        <div className="form-container">
          <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
            <h1>Login</h1>
            <Form.Input
              label="Username"
              placeholder="Username.."
              name="username"
              type="text"
              value={values.username}
              error={errors.username ? true : false}
              onChange={onChange}
            />
            <Form.Input
              label="Password"
              placeholder="Password.."
              name="password"
              type="password"
              value={values.password}
              error={errors.password ? true : false}
              onChange={onChange}
            />
            <Button type="submit" primary>
              Login
            </Button>
          </Form>
          {Object.keys(errors).length > 0 && (
            <div className="ui error message">
              <ul className="list">
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
}

export default Login