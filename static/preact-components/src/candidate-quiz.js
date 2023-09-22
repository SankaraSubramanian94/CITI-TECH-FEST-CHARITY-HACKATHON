import { html } from 'htm/preact';
import { useState, useEffect } from 'preact/hooks';

const CandidateQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [correctCandidate, setCorrectCandidate] = useState(null);

  useEffect(() => {
    // Fetch questions from the API
    fetch('https://9qfvneuspu.us-east-1.awsapprunner.com/questions')
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []); // Empty dependency array to fetch questions once when the component mounts

  const currentQuestion = questions[currentQuestionIndex];

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);

    if (candidate.isCorrect) {
      setCorrectCandidate(candidate);
    } else {
      setCorrectCandidate(null);
    }
  };

  const handleNextQuestion = () => {
    setSelectedCandidate(null);
    setCorrectCandidate(null);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // If it's the last question, reset the quiz
      setCurrentQuestionIndex(0);
    }
  };

  return html`
    <div class="container mt-5">
      ${questions.length > 0 ? (
        html`
        <h5 class="section-title h1">Guess the candidate from the description:</h5>
          <div class="jumbotron">
            <p class="section-title h2">${currentQuestion.info}</p>
          </div>
          <div class="row">
            ${currentQuestion.candidates.map((candidate) => html`
              <div class="col-md-4" key=${candidate.id}>
                <div class="card mb-4">
                  <img
                    src=${candidate.imageUrl}
                    alt=${candidate.name}
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <h5 class="card-title">${candidate.name}</h5>
                    <button
                      class="btn ${
                        selectedCandidate === candidate && correctCandidate === candidate
                          ? 'btn-success'
                          : selectedCandidate === candidate
                          ? 'btn-danger'
                          : 'btn-primary'
                      }"
                      style="min-height: 50px;min-width:100px;"
                      onClick=${() => handleCandidateClick(candidate)}
                    >
                      ${selectedCandidate === candidate
                        ? correctCandidate === candidate
                          ? html`<i class="fas fa-check-circle"></i>`
                          : html`<i class="fas fa-times-circle"></i>`
                        : 'Select'}
                    </button>
                  </div>
                </div>
              </div>
            `)}
          </div>
          ${selectedCandidate ? html`
            <button class="btn ${
              currentQuestionIndex + 1 < questions.length
                ? 'btn-primary'
                : 'btn-success'
            }" onClick=${handleNextQuestion}>
              ${
                currentQuestionIndex + 1 < questions.length
                  ? 'Next Question'
                  : 'Try Quiz Again'
              }
            </button>
          ` : ''}
        `
      ) : (
        html`<p>Loading questions...</p>`
      )}
    </div>
  `;
};

export { CandidateQuiz };
