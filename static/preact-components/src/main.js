import { render } from 'preact';
import { html } from 'htm/preact';

import { VoteReadyChecklist } from './vote-ready-checklist';
import { CandidateQuiz } from './candidate-quiz';

const voteReadyChecklist = document.getElementById('vote-ready-checklist')
if (voteReadyChecklist) {
  render(html`
    <${VoteReadyChecklist} userId=${voteReadyChecklist.dataset.userId} givenName=${voteReadyChecklist.dataset.givenName}/>
  `, voteReadyChecklist);
}


const candidateQuiz = document.getElementById('candidate-quiz');
if (candidateQuiz) {
  console.log('here');
  render(html`
    <${CandidateQuiz} />
  `, candidateQuiz);
}
