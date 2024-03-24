"use client"

import { signIn, useSession } from 'next-auth/react';
import { FormEvent } from 'react';

export default function Tests() {
  const { data, status } = useSession();
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const resp = await fetch("/api/user/", {
        method: "PUT",
        body: JSON.stringify({
          checkPassword: form.get('psswd'),
          username: form.get('username'),
        })
    })
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <h2>setright</h2>
          <label htmlFor='psswd'>atcual password</label>
          <input type='text' id='psswd' name='psswd' />
          <label htmlFor='username'>username</label>
          <input type='text' id='username' name='username' />
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