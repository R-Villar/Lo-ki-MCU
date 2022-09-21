import './App.css';
import { useEffect, useState } from 'react'
import Home from './components/Home';

function App() {
const [data, SetData] = useState([]);

  useEffect(() => {
		// let baseUrl = `${API_URL}/v1/public/comics`;
		// let ts = Date.now().toString();
		// let hash = getHash(ts, privateKey, apiKey);

		fetch(`/comics`)
			.then((res) => res.json())
			.then((data) => SetData(data));
  }, []);


  return (
    <div className="App">
      <Home data={data} />

    </div>
  );
}

export default App;
