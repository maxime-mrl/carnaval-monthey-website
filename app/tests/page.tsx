"use client"

import { signIn, useSession } from 'next-auth/react';
import { FormEvent } from 'react';

export default function Tests() {
  const { data, status } = useSession();
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const resp = await fetch("/api/user/", {
        method: "PATCH",
        body: JSON.stringify({
          target: form.get('target'),
          right: form.get('right'),
        })
    })
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <h2>setright</h2>
          <label htmlFor='target'>Target</label>
          <input type='text' id='target' name='target' />
          <label htmlFor='right'>Right</label>
          <input type='text' id='right' name='right' />
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