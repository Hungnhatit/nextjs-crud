'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from 'react-bootstrap'

const Facebook = () => {
  const router = useRouter();
  const handleBtn = () => {
    router.push("/");
  }

  return (
    <>
      <h1>Facebook</h1>
      <button
        onClick={() => handleBtn()}
      >Back to Home</button>
      <Button variant='primary'>Hungnhatit</Button>
    </>
  )
}

export default Facebook