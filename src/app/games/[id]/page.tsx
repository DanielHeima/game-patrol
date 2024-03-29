import React from 'react';

const GamePage = ({ params }: {params: {id: string}}) => {
  // Add your component logic here
  const gameId = params.id;
  return (
    <div>
      {gameId}
    </div>
  );
}

export default GamePage;