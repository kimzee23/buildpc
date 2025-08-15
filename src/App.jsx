import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Build from './pages/Build';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/build" element={<Build />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
        </Router>
    );
}

export default App;