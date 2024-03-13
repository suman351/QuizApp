import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function HomePage() {
  const [quizData, setQuizData] = useState([]);


  useEffect(() => {
    (async () => {
      try {
        const questionData = await fetch('https://quizapi.io/api/v1/questions?apiKey=0N5XWUJTwExL42wJDLxv6p4CMi1eND5doAedZoRK&difficulty=Easy&limit=10&tags=HTML');
        const result = await questionData.json();
        setQuizData(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);


  function handleSubmit() {
    let totalScore = 0;
    quizData.forEach((question, index) => {
      const selectedOption = document.querySelector(`input[name="option-${index}"]:checked`);
      if (selectedOption) {
        const selectedValue = selectedOption.value;
        const correctAnswerKey = question.correct_answer;
        if (selectedValue === correctAnswerKey) {
          totalScore += 1;
          console.log(totalScore);
        }
      }
    });
  
    Swal.fire({
      title: 'Well Done',
      text: `Your Score is ${totalScore}/${quizData.length}`,
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  }
  

  return (
    <div className="container py-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
          Quiz App
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Test your knowledge with this quiz.
        </p>
      </div>
      <div className="bg-light p-6 shadow-sm">
        <div className="space-y-6">
          {quizData.map((question, index) => (
            <div key={index} className="bg-light p-6 shadow-sm my-5">
              <h5 className="font-semibold whitespace-nowrap tracking-tight text-base text-purple-600 dark:text-purple-400">
                {index + 1}. {question.question}
              </h5>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {Object.entries(question.answers).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <input id={`option-${index}-${key}`} className="form-check-input" type="radio" name={`option-${index}`} value={key} />
                    <label htmlFor={`option-${index}-${key}`} className="form-check-label text-sm font-medium line-clamp-2">
                      {value}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
