"use client"

import { signIn, useSession } from 'next-auth/react';
import { FormEvent } from 'react';

export default function Tests() {
  const { data, status } = useSession();
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const resp = await fetch("/api/user/delete", {
        method: "post",
        body: JSON.stringify({
            password: form.get('password'),
        })
    })
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <h2>deleteform</h2>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' name='password'  />
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