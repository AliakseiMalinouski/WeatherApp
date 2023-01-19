
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PageRouter } from './Router/PageRouter';
import { store } from './Redux/store';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <div className='Container'>
            <PageRouter/> 
          </div>  
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;