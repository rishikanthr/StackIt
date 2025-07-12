import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import axios from 'axios';

export default function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get(`/api/questions/${id}`).then(res => setQuestion(res.data));
  }, [id]);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    await axios.post(`/api/answers/${id}`, { content }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.location.reload();
  };

  return question && (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{question.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: question.description }} />
      <div className="mt-4">
        {question.answers.map((a) => (
          <div key={a._id} className="border p-2 mt-2">
            <div dangerouslySetInnerHTML={{ __html: a.content }} />
            <div className="flex gap-4 text-sm">
              <button onClick={() => axios.put(`/api/answers/${a._id}/upvote`)}>⬆ Upvote</button>
              {question.author === localStorage.getItem('userId') && !question.acceptedAnswer && (
                <button onClick={() => axios.put(`/api/answers/${a._id}/accept`)}>✅ Accept</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <ReactQuill value={content} onChange={setContent} className="mt-4" />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">Post Answer</button>
    </div>
  );
}
