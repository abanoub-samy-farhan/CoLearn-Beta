import { useState, useEffect } from 'react';
import { DeleteOutlined, EditOutlined, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';

function QuizMaker() {
  const [quizInfo, setQuizInfo] = useState({
    title: '',
    description: '',
  });

  const [questions, setQuestions] = useState(() => {
    const savedQuiz = localStorage.getItem('quiz');
    return savedQuiz ? JSON.parse(savedQuiz) : [];
  });

  useEffect(() => {
    localStorage.setItem('quiz', JSON.stringify(questions));
  }, [questions]);

  const [currentQuestion, setCurrentQuestion] = useState({
    type: 'multiple-choice',
    title: '',
    grade: 0,
    options: [''],
    writtenAnswer: '',
    isSaved: false,
  });

  const handleQuizInfoChange = (field, value) => {
    setQuizInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push('');
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const saveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].isSaved = true;
    setQuestions(updatedQuestions);
  };

  const editQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].isSaved = false;
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { ...currentQuestion, options: [''] }]);
  };

  const handleQuizAction = (action) => {
    if (action === 'save') {
      console.log('Quiz Saved:', { quizInfo, questions });
    } else if (action === 'publish') {
      console.log('Quiz Published:', { quizInfo, questions });
    }
  };
  const onOk = (value) => {
    console.log('onOk: ', value);
  };

  return (
    <div className="overflow-hidden h-full">
      <div className="p-4 bg-gray-100 rounded-lg space-y-6">
        <div className="p-4 bg-white shadow-md rounded-lg gap">
          <label className="block">
            Quiz Title:
            <input
              value={quizInfo.title}
              onChange={(e) => handleQuizInfoChange('title', e.target.value)}
              className="block w-full mt-2 p-2 border rounded"
              placeholder="Enter quiz title"
            />
          </label>
          <label className="block mt-4">
            Quiz Description:
            <textarea
              value={quizInfo.description}
              onChange={(e) => handleQuizInfoChange('description', e.target.value)}
              className="block w-full mt-2 p-2 border rounded mb-2"
              placeholder="Enter quiz description"
            />
          </label>
          <Space direction="vertical" size={12}>
            Due Date:
            <DatePicker
              showTime
              onChange={(value, dateString) => {
                console.log('Selected Time: ', value);
                console.log('Formatted Selected Time: ', dateString);
              }}
              onOk={onOk}
            />
          </Space>
        </div>

        {/* Questions */}
        <div className="space-y-6 max-h-[50vh] overflow-y-auto p-4 bg-gray-100 rounded-lg">
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="p-4 bg-white shadow-md rounded-lg">
              {!question.isSaved ? (
                <div>
                  <label className="block">
                    Question Type:
                    <select
                      value={question.type}
                      onChange={(e) => handleQuestionChange(qIndex, 'type', e.target.value)}
                      className="block w-full mt-2 p-2 border rounded"
                    >
                      <option value="multiple-choice">Multiple Choice</option>
                      <option value="true-false">Written</option>
                    </select>
                  </label>

                  <label className="block mt-4">
                    Question Title:
                    <input
                      value={question.title}
                      onChange={(e) => handleQuestionChange(qIndex, 'title', e.target.value)}
                      className="block w-full mt-2 p-2 border rounded"
                      placeholder="Enter question title"
                    />
                  </label>

                  <label className="block mt-4">
                    Grade:
                    <input
                      type="number"
                      value={question.grade}
                      onChange={(e) => handleQuestionChange(qIndex, 'grade', e.target.value)}
                      className="block w-full mt-2 p-2 border rounded"
                      placeholder="Enter grade"
                    />
                  </label>

                  {question.type === 'multiple-choice' ? (
                    <div className="mt-4 space-y-2">
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-2">
                          <input
                            value={option}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                            className="block w-2/5 p-2 border rounded"
                            placeholder={`Option ${oIndex + 1}`}
                          />
                          <button
                            className="bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-600"
                            onClick={() => {
                              const updatedQuestions = [...questions];
                              updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter((_, i) => i !== oIndex);
                              setQuestions(updatedQuestions);
                            }}
                          >
                            <CloseCircleOutlined />
                          </button>
                        </div>
                      ))}
                      <button
                        className="bg-blue-500 text-white mt-2 px-4 py-2 rounded-md"
                        onClick={() => addOption(qIndex)}
                      >
                        Add Option
                      </button>
                    </div>
                  ) : (
                    <label className="block mt-4">
                      Written Answer:
                      <textarea
                        value={question.writtenAnswer}
                        onChange={(e) => handleQuestionChange(qIndex, 'writtenAnswer', e.target.value)}
                        className="block w-full mt-2 p-2 border rounded"
                        placeholder="Enter written answer"
                      />
                    </label>
                  )}

                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                      onClick={() => deleteQuestion(qIndex)}
                    >
                      <DeleteOutlined />
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                      onClick={() => saveQuestion(qIndex)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold">{question.title}</h3>
                  <p>Grade: {question.grade}</p>
                  <ul className="list-disc ml-4">
                    {question.options.map((option, oIndex) => (
                      <li key={oIndex}>{option}</li>
                    ))}
                  </ul>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      className="bg-yellow-500 text-white px-3 py-2 rounded-full"
                      onClick={() => editQuestion(qIndex)}
                    >
                      <EditOutlined />
                    </button>
                    <button
                      className="bg-gray-500 text-white px-3 rounded-full"
                      onClick={() => deleteQuestion(qIndex)}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-end space-x-4 mt-6">
            <button
              className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-600"
              onClick={addQuestion}
            >
              <PlusOutlined className="mr-2" />
              Add Question
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => handleQuizAction('save')}
            >
              Save Quiz
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={() => handleQuizAction('publish')}
            >
              Publish Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizMaker;
