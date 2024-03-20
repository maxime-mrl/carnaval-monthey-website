"use client"

import { signIn, useSession } from 'next-auth/react';
import { FormEvent } from 'react';

export default function Login() {
  const { data, status } = useSession();
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    await signIn('credentials', {
      mail: form.get('mail'),
      password: form.get('password'),
      callbackUrl: '/',
    });
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label htmlFor='mail'>Mail:</label>
          <input type='text' id='mail' name='mail' required />
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' name='password' required />
          <button type='submit'>Submit</button>
        </form>
      </div>
      {status === 'authenticated' && data !== null && (
        <>
          {JSON.stringify(data.user)}
        </>
      )}
    </>
  );
}