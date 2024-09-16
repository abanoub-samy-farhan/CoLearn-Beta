import { useState, useEffect } from 'react';
import { DeleteOutlined, EditOutlined, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { DatePicker, Space,Checkbox, Select, InputNumber, Input} from 'antd';

function QuizMaker() {
  const [quizInfo, setQuizInfo] = useState({
    title: '',
    description: '',
    dueDate: '',
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
    correct_option: '',
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

  return (
    <div className="h-full bg-gray-100 overflow-auto">
      <h1 className="font-semibold p-4 text-3xl text-purple-700">Create a Quiz</h1>
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
              className='hover:border-purple-500 click:border-purple-500'
              onChange={(date, dateString) => {
                handleQuizInfoChange('dueDate', dateString)
              }}
            />
          </Space>
        </div>

        {/* Questions */}
        <div className="space-y-6 p-4 bg-gray-100 rounded-lg">
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="p-4 bg-white shadow-md rounded-lg">
              {!question.isSaved ? (
                <div>
                  <label className="block flex flex-col gap-2">
                    Question Type:
                    <Select
                      defaultValue={question.type}
                      onChange={(value) => handleQuestionChange(qIndex, 'type', value)}
                      className='w-2/6'
                    >
                      <option value="multiple-choice">Multiple Choice</option>
                      <option value="true-false">Written</option>
                    </Select>
                  </label>

                  <label className="block mt-4">
                    Question Title:
                    <Input
                      value={question.title}
                      onChange={(e) => handleQuestionChange(qIndex, 'title', e.target.value)}
                      className="block w-full mt-2 p-2 border rounded"
                      placeholder="Enter question title"
                    />
                  </label>

                  <label className="block mt-4 flex flex-col">
                    Grade:
                    <InputNumber
                      type="number"
                      value={question.grade}
                      className='w-40'
                      onChange={(value) => handleQuestionChange(qIndex, 'grade', value)}
                      placeholder="Enter grade"
                    />
                  </label>

                  {question.type === 'multiple-choice' ? (
                    <div className="mt-4 space-y-2">
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-2">
                          <Checkbox
                            checked={question.correct_option === oIndex}
                            onChange={(e) => {
                              const updatedQuestions = [...questions];
                              if (e.target.checked && !updatedQuestions[qIndex].correct_option) {
                                updatedQuestions[qIndex].correct_option = oIndex;
                              } else if (e.target.checked && updatedQuestions[qIndex].correct_option) {
                                // replace the index of the correct option and uncheck the previous one
                                updatedQuestions[qIndex].correct_option = oIndex;
                              }
                              setQuestions(updatedQuestions);                              
                            }}
                          />
                          <Input
                            defaultValue={option}
                            size='middle'
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                            className="w-1/6"
                            placeholder={`Option ${oIndex + 1}`}
                          />
                          <button
                            className="transparent text-black hover:text-red-500 transition ease-in-out duration-300"
                            onClick={() => {
                              const updatedQuestions = [...questions];
                              updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter((_, i) => i !== oIndex);
                              setQuestions(updatedQuestions);
                            }}
                          >
                            <CloseCircleOutlined/>
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

                  <div className="flex justify-center mt-4 w-full">
                    <button
                      onClick={() => deleteQuestion(qIndex)}
                    >
                      <DeleteOutlined className='text-black transition ease-in-out duration-300 h-10 w-20 justify-center hover:text-red-700 border rounded-l-md hover:bg-red-200' />
                    </button>
                    <button
                      className="text-black transition ease-in-out duration-300 h-10 w-20 hover:text-green-700 border rounded-r-md hover:bg-green-200"
                      onClick={() => saveQuestion(qIndex)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className=''>
                  <h3 className="font-semibold">{question.title}</h3>
                  <p>Grade: {question.grade}</p>
                  {question.type === 'multiple-choice' ? (
                    <ul className="list-disc ml-4">
                    {question.options.map((option, oIndex) => (
                      {option} && <li key={oIndex}>{option}</li>
                    ))}
                  </ul>
                  ): (
                    <div>
                      <p>Written Answer:</p>
                      <div className='p-2 border h-fit border-purple-400 rounded-md mt-2'>
                        {question.writtenAnswer}
                      </div>
                  </div>
                  )}
                  <div className="flex justify-center mt-4 w-full">
                    <button
                      className="transparent text-white rounded-md"
                      onClick={() => editQuestion(qIndex)}
                    >
                      <EditOutlined className='text-black transition ease-in-out duration-10 px-2 py-2 hover:bg-purple-200 hover:text-purple-700 border rounded-l-md h-10 w-20 justify-center'/>
                    </button>
                    <button
                      onClick={() => deleteQuestion(qIndex)}
                    >
                      <DeleteOutlined className='text-black transition ease-in-out duration-300 h-10 w-20 justify-center hover:text-red-700 border rounded-r-md hover:bg-red-200' />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-center space-x-4 mt-6">
            <button
              className="transparent border border-2 border-black hover:border-purple-500 transition-all ease-in-out duration-300 text-black hover:text-purple-500 px-4 py-2 rounded-md"
              onClick={addQuestion}
            >
              <PlusOutlined className="mr-2" />
              Add Question
            </button>
            <button
              className="transparent border border-2 border-black hover:border-green-500 transition-all ease-in-out duration-300 text-black hover:text-white hover:bg-green-500 px-4 py-2 rounded-md"
              onClick={() => handleQuizAction('save')}
            >
              Save Quiz
            </button>
            <button
              className="transparent border border-2 border-black hover:border-purple-500 transition-all ease-in-out duration-300 text-black hover:text-purple-500 px-4 py-2 rounded-md"
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
