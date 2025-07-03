import React, { useState, useEffect } from 'react';
import Alert from '../Alert';

const Step3 = ({ sessionId, onComplete, onBack, error, setError, getCaesarChallenge }) => {
  const [caesarAnswer, setCaesarAnswer] = useState('');
  const [challenge, setChallenge] = useState('');
  const [hint, setHint] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCaesarChallenge = async () => {
      try {
        const { caesarChallenge, hint } = await getCaesarChallenge(sessionId);
        setChallenge(caesarChallenge);
        setHint(hint);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load Caesar cipher challenge');
        setIsLoading(false);
      }
    };

    fetchCaesarChallenge();
  }, [sessionId, getCaesarChallenge, setError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caesarAnswer) {
      setError('Caesar cipher answer is required');
      return;
    }
    onComplete(sessionId, caesarAnswer);
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
        <p>Loading Caesar cipher challenge...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login - Step 3</h2>
      <p className="text-center mb-6">Solve the Caesar cipher challenge</p>
      
      {error && <Alert type="error" message={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Challenge</label>
          <p className="mt-1 p-2 bg-gray-100 rounded font-mono text-lg">{challenge}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hint</label>
          <p className="mt-1 p-2 bg-yellow-50 rounded">{hint}</p>
        </div>

        <div>
          <label htmlFor="caesarAnswer" className="block text-sm font-medium text-gray-700">Your Answer</label>
          <input
            type="text"
            id="caesarAnswer"
            value={caesarAnswer}
            onChange={(e) => setCaesarAnswer(e.target.value.toUpperCase())}
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
            Complete Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3;