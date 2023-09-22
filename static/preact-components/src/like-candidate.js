import { html } from 'htm/preact';
import { useState } from 'preact/hooks';

const LikeCandidate = (props) => {
  const [liked, setLiked] = useState(false);

  async function handleLike() {
    console.log("liked");
    if (!liked) {
      try {
        console.log(`https://cxka1yt3tj.execute-api.us-east-1.amazonaws.com/test/vote?userId=${props.userId}&candidateId=${props.candidateId}`);
        const response = await fetch(
          `https://cxka1yt3tj.execute-api.us-east-1.amazonaws.com/test/vote?userId=${props.userId}&candidateId=${props.candidateId}`,
          {
            method: 'POST',
          }
        );
        const data = await response.json();
        setLiked(true); // Set liked to true when the PUT request is successful
        const elementsToDisable = document.querySelectorAll('.vote-button.heart-button');
        elementsToDisable.forEach((element) => {
          element.disabled = true;
          element.style.backgroundColor = 'grey';
        });
      } catch (error) {
        // Handle errors if needed
        console.log(error);
      }
    }
  }

  if (liked) {
    return html`<button class="vote-button"><i class="fa fa-heart"></i>You Liked this candidate</button>`
  } else {
    return html`<button class="vote-button heart-button" onClick=${handleLike}><i class="fa fa-heart"></i></button>`
  }
};

export { LikeCandidate };
