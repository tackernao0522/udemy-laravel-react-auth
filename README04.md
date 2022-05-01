## 18 Register

- `resources/ts/pages/Register.tsx`を編集<br>

```tsx:Register.tsx
import React, { SyntheticEvent, useState } from 'react'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const submit = (e: SyntheticEvent) => {
    e.preventDefault()
    console.log(firstName)
  }

  return (
    <form className="form-signin" onSubmit={submit}>
      <h1 className="h3 mb-3 font-weight-normal">Please register</h1>

      <input
        className="form-control mb-2"
        placeholder="First Name"
        required
        onChange={(e) => setFirstName(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Last Name"
        required
        onChange={(e) => setLastName(e.target.value)}
      />

      <input
        type="email"
        className="form-control mb-2"
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password Confirm"
        required
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />

      <button className="btn btn-lg btn-primary btn-block w-100" type="submit">
        Register
      </button>
    </form>
  )
}

export default Register
```

- `resources/ts/pages/Register.tsx`を編集<br>

```tsx:Register.tsx
import React, { SyntheticEvent, useState } from 'react'
import axios from 'axios'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const response = await axios.post('http://localhost/api/register', {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password_confirm: passwordConfirm,
    })

    console.log(response)
  }

  return (
    <form className="form-signin" onSubmit={submit}>
      <h1 className="h3 mb-3 font-weight-normal">Please register</h1>

      <input
        className="form-control mb-2"
        placeholder="First Name"
        required
        onChange={(e) => setFirstName(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Last Name"
        required
        onChange={(e) => setLastName(e.target.value)}
      />

      <input
        type="email"
        className="form-control mb-2"
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password Confirm"
        required
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />

      <button className="btn btn-lg btn-primary btn-block w-100" type="submit">
        Register
      </button>
    </form>
  )
}

export default Register
```

`console`<br>

```
{data: {…}, status: 201, statusText: 'Created', headers: {…}, config: {…}, …}
config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
data:
created_at: "2022-05-01T11:41:49.000000Z"
email: "takaproject777@gmail.com"
first_name: "naomi"
id: 2
last_name: "etsui"
updated_at: "2022-05-01T11:41:49.000000Z"
[[Prototype]]: Object
headers: {access-control-allow-credentials: 'true', access-control-allow-origin: 'http://localhost', cache-control: 'no-cache, private', connection: 'keep-alive', content-type: 'application/json', …}
request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
status: 201
statusText: "Created"
[[Prototype]]: Object
```