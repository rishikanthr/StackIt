import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Sample dummy data
  const questions = [
    { id: 1, title: 'How to use React Router?', tags: ['react', 'routing'] },
    { id: 2, title: 'What is JWT?', tags: ['auth', 'jwt'] }
  ];

  return (
    <div className="container mt-5">
      <h2>All Questions</h2>
      <ul className="list-group">
        {questions.map((q) => (
          <li key={q.id} className="list-group-item">
            <Link to={`/question/${q.id}`}>{q.title}</Link>
            <div>
              {q.tags.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-1">{tag}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
