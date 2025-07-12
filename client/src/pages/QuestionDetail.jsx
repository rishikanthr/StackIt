import React from 'react';
import { useParams } from 'react-router-dom';

const QuestionDetail = () => {
  const { id } = useParams();

  return (
    <div className="container mt-5">
      <h2>Question #{id}</h2>
      <p>This is the detail page for question ID: {id}</p>
    </div>
  );
};

export default QuestionDetail;
