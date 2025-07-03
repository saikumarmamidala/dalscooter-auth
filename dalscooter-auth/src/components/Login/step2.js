import React, { useState, useEffect } from 'react';
import Alert from '../Alert';

const Step2 = ({ sessionId, onNext, onBack, error, setError, getSecurityQuestion }) => {
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSecurityQuestion = async () => {
      try {
        const question = await getSecurityQuestion(sessionId);
        setSecurityQuestion(question);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load security question');
        setIsLoading(false);
      }
    };

    fetchSecurityQuestion();
  }, [sessionId, getSecurityQuestion, setError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!securityAnswer) {
      setError('Security answer is required');
      return;
    }
    onNext(sessionId, securityAnswer);
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
        <p>Loading security question...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login - Step 2</h2>
      <p className="text-center mb-6">Answer your security question</p>
      
      {error && <Alert type="error" message={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Security Question</label>
          <p className="mt-1 p-2 bg-gray-100 rounded">{securityQuestion}</p>
        </div>

        <div>
          <label htmlFor="securityAnswer" className="block text-sm font-medium text-gray-700">Your Answer</label>
          <input
            type="text"
            id="securityAnswer"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back
          </button>
          <button
            type="submit"
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Next: Caesar Cipher
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2;