import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Askquestion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagList = tags.split(',').map(tag => tag.trim());
    console.log({ title, description, tags: tagList });
  };

  return (
    <div className="container mt-5">
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            placeholder="Describe your question here..."
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tags</label>
          <input
            type="text"
            className="form-control"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="react, jwt"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit Question</button>
      </form>
    </div>
  );
};

export default Askquestion;
