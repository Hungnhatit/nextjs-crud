'use client'

import Link from 'next/link';
import React from 'react'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import useSWR, { Fetcher } from 'swr';

function ViewDetailBlog({ params }: { params: { id: string } }) {
  const fetcher: Fetcher<IBlog, string> = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.id}`, fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );



  return (
    <div>
      <Link href={"/blogs"} >Go back</Link>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
        <Card.Body>
          <Card.Title>Title: {data?.title}</Card.Title>
          <Card.Text>
            {data?.content}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Author: {data?.author}</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

export default ViewDetailBlog;