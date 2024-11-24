import React, { useState } from 'react';

function App() {
  const [expressData, setExpressData] = useState(null);
  const [nestData, setNestData] = useState(null);

  const fetchFromExpress = () => {
    fetch('http://localhost:5000/product', {
      method: 'GET', // 명시적으로 GET 요청
    })
      .then((response) => response.json())
      .then((data) => setExpressData(data))
      .catch((error) => console.error('Error fetching from Express:', error));
  };

  const fetchFromNest = () => {
    fetch('http://localhost:4000/shoe', {
      method: 'GET', // 명시적으로 GET 요청
    }) // NestJS 서버로 요청
      .then((response) => response.json())
      .then((data) => setNestData(data))
      .catch((error) => console.error('Error fetching from NestJS:', error));
  };

  return (
    <div>
      <h1>React 에서 Express와 Nest로 fetch요청 테스트</h1>
      <button onClick={fetchFromExpress}>Express로 GET 요청 </button>
      <p>
        {expressData ? `Express Response: ${expressData.name}` : 'No data from Express yet'}
      </p>

      <button onClick={fetchFromNest}>Nest로 GET 요청 </button>
      <p>
        {nestData ? `NestJS Response: ${nestData.name}` : 'No data from NestJS yet'}
      </p>
    </div>
  );
}

export default App;
