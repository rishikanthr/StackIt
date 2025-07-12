import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagList = tags.split(',').map(tag => tag.trim());

    console.log({
      title,
      description,
      tags: tagList,
    });

    // Show toast confirmation
    setShowToast(true);

    // Clear form
    setTitle('');
    setDescription('');
    setTags('');

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Ask a Question</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <ReactQuill
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
            placeholder="e.g., react, jwt"
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit Question</button>
      </form>

      {/* Toast Message */}
      {showToast && (
        <div
          className="toast show position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 9999, minWidth: '250px' }}
        >
          <div className="toast-header bg-success text-white">
            <strong className="me-auto">Submitted</strong>
            <button type="button" className="btn-close btn-close-white" onClick={() => setShowToast(false)}></button>
          </div>
          <div className="toast-body">
            Your question has been submitted!
          </div>
        </div>
      )}
    </div>
  );
};

export default AskQuestion;
