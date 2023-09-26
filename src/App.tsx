import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import BitcoinChart from './components/BitcoinChart/BitcoinChart';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <BitcoinChart />
            </div>
        </Provider>
    );
};

export default App;
