import {BrowserRouter, Route, Routes} from 'react-router';
import Home from './pages/public/Home';
import { MainLayout } from './layouts/MainLayout';

export default function () {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}
