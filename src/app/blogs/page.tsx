'use client'
import AppTable from '@/components/app.table';
import React from 'react'
import useSWR from 'swr';

const Blogs = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs", fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  if (isLoading) {
    <div>Loading...</div>
  }

  if (!isLoading) {
    return (
      <div>
        <AppTable
          blogs={data?.sort((a: any, b: any) => b.id - a.id) ?? []}
        ></AppTable>
      </div>
    )
  }


  return (
    <h1>Blogs</h1>
  )
}

export default Blogs