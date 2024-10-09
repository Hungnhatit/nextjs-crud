import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { stringify } from 'querystring';
import { mutate } from 'swr';

interface IProps {
  showUpdateModal: boolean;
  setShowUpdateModal: (value: boolean) => void;
  blog: IBlog | null;
  setBlog: (value: IBlog | null) => void;
}

function UpdateModal(props: IProps) {
  const { showUpdateModal, setShowUpdateModal, blog, setBlog } = props;

  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  //Mỗi lần khi biến blog thay đổi (tức là khi click vào edit của mỗi blog) thì cập nhật lại từng state 
  useEffect(() => {
    if (blog && blog.id) {
      setId(blog.id);
      setTitle(blog.title);
      setAuthor(blog.author);
      setContent(blog.content);
    }
  }, [blog])


  const handleSubmit = () => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Accept": 'application/json, text/plain, */*',
        "Content-type": "application/json"
      },
      body: JSON.stringify({ title, author, content })
    })
      .then((res) => res.json())
      .then(res => {
        if (res) {
          toast.success("Updated successfully!");
          handleCloseModal();
          mutate("http://localhost:8000/blogs");
        }
      })
  }

  const handleCloseModal = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setBlog(null);
    setShowUpdateModal(false);
  }

  return (
    <>
      <Modal
        show={showUpdateModal}
        onHide={() => handleCloseModal()}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a new blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/*----------< Form Control >---------- */}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Author..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
          >Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;