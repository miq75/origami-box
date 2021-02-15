import './App.css';
import { Suspense } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Masu from './Masu/';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <Suspense fallback="Loading...">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/">
            <Masu />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </Suspense>
  );
}
