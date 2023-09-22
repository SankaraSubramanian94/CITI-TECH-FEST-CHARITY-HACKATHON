import { html } from 'htm/preact';
import { useEffect, useState } from 'preact/hooks';

const VoteReadyChecklist = (props) => {
  const [tasks, setTasks] = useState({
    registerToVote: false,
    learnAboutCandidates: false,
    findPollingStation: false,
  });
  

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await fetch(`https://cxka1yt3tj.execute-api.us-east-1.amazonaws.com/test/task?userId=${props.userId}` , {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if( res.ok ) {
      let json = await res.json();
      setTasks(json);
      // Calculate completion progress
    const completedTasks = Object.values(json).filter((task) => task).length;
    const totalTasks = Object.keys(json).length;
    const progress = (completedTasks / totalTasks) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
    }

    if( ! res.ok ) {
    }
  }
  const toggleTask = async (taskName) => {
    const updatedTasks = { ...tasks, [taskName]: !(tasks[taskName]) };
    // Calculate completion progress
    const completedTasks = Object.values(updatedTasks).filter((task) => task).length;
    const totalTasks = Object.keys(updatedTasks).length;
    const progress = (completedTasks / totalTasks) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
    // Check if the previous task is completed
    if (
      taskName === 'learnAboutCandidates' &&
      !updatedTasks['registerToVote']
    ) {
      return;
    }

    if (taskName === 'findPollingStation' && !updatedTasks['learnAboutCandidates']) {
      return;
    }

    setTasks(updatedTasks);
    try {
      // Send a POST request to save completion status
      let userId='04f864d8-90e1-701e-0969-2827cccee612';
      console.log(taskName);
      const response = await fetch(
        `https://cxka1yt3tj.execute-api.us-east-1.amazonaws.com/test/task?userId=${props.userId}&taskName=${taskName}`,
        {
          method: 'POST'
        }
      );
      console.log(`https://cxka1yt3tj.execute-api.us-east-1.amazonaws.com/test/task?userId=${props.userId}&taskName=${taskName}`);
      const data = await response.json();
      // Handle the response if necessary
      console.log('Task completion status saved:', data);
    } catch (error) {
      console.error('Error saving task completion status:', error);
    }
    //fetchData();
  };
  function updateBar() {
    // Calculate completion progress
    const completedTasks = Object.values(tasks).filter((task) => task).length;
    const totalTasks = Object.keys(tasks).length;
    const progress = (completedTasks / totalTasks) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
  }

  return html`
    <div className="container mt-5">
    <h5 class="section-title h1">${props.givenName}'s Vote Ready Checklist</h5>
      <br/>
      <div className="row">
        <div className="col-md-4">
          <div className="task text-center">
            <div>
              <i
                className="fa fa-user task-icon"
                style="font-size: 5em;"
              ></i>
            </div>
            <div>Register to Vote</div>
            <div>
              <i
                className=${`fa ${
                  tasks.registerToVote ? 'fa-check-circle text-success' : 'fa-circle-xmark'
                }`}
                onClick=${() => toggleTask('registerToVote')}
                style="font-size: 3em;"
              ></i>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="task text-center">
            <div>
              <i
                className="fa fa-info-circle task-icon"
                style="font-size: 5em;"
              ></i>
            </div>
            <div>Learn About Candidates</div>
            <div>
              <i
                className=${`fa ${
                  tasks.learnAboutCandidates  ? 'fa-check-circle text-success' : 'fa-circle-xmark'
                }`}
                onClick=${() => toggleTask('learnAboutCandidates')}
                style="font-size: 3em;"
              ></i>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="task text-center">
            <div>
              <i
                className="fa fa-map-marker task-icon"
                style="font-size: 5em;"
              ></i>
            </div>
            <div>Find Polling Station</div>
            <div>
              <i
                className=${`fa ${
                  tasks.findPollingStation ? 'fa-check-circle text-success' : 'fa-circle-xmark'
                }`}
                onClick=${() => toggleTask('findPollingStation')}
                style="font-size: 3em;"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div className="progress mt-3">
        <div
          id="progress-bar"
          className="progress-bar bg-success"
          role="progressbar"
          style="width: 0%"
        ></div>
      </div>
    </div>
  `;
};
export { VoteReadyChecklist };