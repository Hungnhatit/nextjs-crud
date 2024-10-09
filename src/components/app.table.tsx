'use client'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import CreateModal from './Modal/create.modal';
import { useState } from 'react';
import UpdateModal from './Modal/update.modal';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { mutate } from 'swr';


interface IProps {
  blogs: IBlog[];
}

const AppTable = (props: IProps) => {
  const { blogs } = props;
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  console.log(">> Check props blogs: ", blogs);

  const handleDeleteBlog = (id: number) => {
    if (confirm(`Do you want to delete this blog (id=${id})?`)) {
      fetch(`http://localhost:8000/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-type": "application/json"
        }
      }).then(res => res.json())
        .then(res => {
          if (res) {
            toast.success("Delete successfully!");
            mutate("http://localhost:8000/blogs");
          }
        })
    }
  }

  return (
    <>
      <div className='flex items-center justify-between mb-2'>
        <h3 className='text-lg font-bold'>Table blogs</h3>
        <Button
          variant='secondary'
          onClick={() => setShowModal(true)}
        >Add new</Button>
      </div>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th className='text-xl'>No.</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  <Link
                    href={`/blogs/${item.id}`} className='mx-2 btn btn-primary'
                  >
                    View
                  </Link>
                  <Button
                    className='mx-2'
                    variant='warning'
                    onClick={() => {
                      setBlog(item);
                      setShowUpdateModal(true);
                    }}
                  >Edit</Button>
                  <Button
                    className='mx-2'
                    variant='danger'
                    onClick={() => handleDeleteBlog(item.id)}
                  >Delete</Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <CreateModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <UpdateModal
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        blog={blog}
        setBlog={setBlog}
      />
    </>
  );
}

export default AppTable;