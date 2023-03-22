import { FC } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout/layout';
import { MainPage } from './pages/main/main-page';
import { NotePage } from './pages/note/note-page';

export const App : FC = () => (
    <HashRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<Navigate to='/notes'/>} />
                <Route path='/notes' element={<MainPage/>} />
                <Route path='/notes/:noteId' element={<NotePage/>} />
                <Route path='/*' element={<Navigate to='/notes'/>} />
            </Route>
        </Routes>
    </HashRouter>
);

