'use client'

import { useState } from 'react';

const JoinButton = () => {
  const [joined, setJoined] = useState(false);

  return (
    <button onClick={() => setJoined(!joined)}>
      {joined ? 'Leave Community' : 'Join Community'}
    </button>
  );
};

export default JoinButton;