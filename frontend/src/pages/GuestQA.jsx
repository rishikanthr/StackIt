import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GuestQA() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/api/questions/all');
      setQuestions(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Questions (Guest View)</h2>
      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Tags</th>
            <th className="p-2 border">Answers</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q._id} className="border">
              <td className="p-2 border">{q.title}</td>
              <td className="p-2 border">{q.author?.name || 'Anonymous'}</td>
              <td className="p-2 border">{q.tags.join(', ')}</td>
              <td className="p-2 border">
                <ul className="list-disc pl-4">
                  {q.answers?.map((a) => (
                    <li key={a._id}>
                      <strong>{a.author?.name || 'Anon'}:</strong>{' '}
                      <span dangerouslySetInnerHTML={{ __html: a.content }} />
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
