
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import RegulatedCountries from './pages/RegulatedCountries';
import Qualifications from './pages/Qualifications';
import Blog from './pages/Blog';
import Ethics from './pages/Ethics';
import Theory from './pages/Theory';
import Jobs from './pages/Jobs';
import Forums from './pages/Forums';
import Volunteer from './pages/Volunteer';
import Events from './pages/Events';
import Reading from './pages/Reading';
import Internships from './pages/Internships';
import Licensure from './pages/Licensure';
import Salary from './pages/Salary';
import CreatePost from './pages/CreatePost';
import Research from './pages/Research';
import SocialWorkTypes from './pages/SocialWorkTypes';
import DocumentDetail from './pages/DocumentDetail';
import { AdminProvider, useAdmin } from './context/AdminContext';

const AppContent: React.FC = () => {
  const { isAdmin, toggleAdmin } = useAdmin();
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }));

  return (
    <HashRouter>
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Top Craigslist-style Header */}
        <header className="cl-header p-3 flex flex-wrap justify-between items-center mb-6">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-3xl font-bold cl-link no-underline hover:no-underline tracking-tight">
              the social work files
            </Link>
            <span className="text-gray-900 text-base font-bold">{currentDate}</span>
          </div>
          <nav className="text-sm sm:text-base space-x-4 mt-2 sm:mt-0 font-bold">
            <Link to="/regulated-countries" className="cl-link">countries</Link>
            <Link to="/qualifications" className="cl-link">education</Link>
            <Link to="/blog" className="cl-link">blog</Link>
            <Link to="/ethics" className="cl-link">ethics</Link>
            <Link to="/theory" className="cl-link">theory</Link>
            <Link to="/jobs" className="cl-link">jobs</Link>
            <Link to="/post" className="cl-link text-red-700">post</Link>
          </nav>
        </header>

        {/* Main Content Area */}
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/regulated-countries" element={<RegulatedCountries />} />
            <Route path="/qualifications" element={<Qualifications />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/ethics" element={<Ethics />} />
            <Route path="/theory" element={<Theory />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/forums" element={<Forums />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/events" element={<Events />} />
            <Route path="/reading" element={<Reading />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/licensure" element={<Licensure />} />
            <Route path="/salary" element={<Salary />} />
            <Route path="/post" element={<CreatePost />} />
            <Route path="/research" element={<Research />} />
            <Route path="/research/:id" element={<DocumentDetail type="research" />} />
            <Route path="/reading" element={<Reading />} />
            <Route path="/reading/:id" element={<DocumentDetail type="reading" />} />
            <Route path="/career-paths" element={<SocialWorkTypes />} />
          </Routes>

        </main>

        {/* Craigslist-style Footer */}
        <footer className="cl-header mt-12 p-6 text-sm text-center border-t border-gray-400">
          <div className="space-x-6 mb-4 font-bold flex flex-wrap justify-center">
            <Link to="/" className="cl-link">home</Link>
            <Link to="/blog" className="cl-link">blog</Link>
            <Link to="/regulated-countries" className="cl-link">directory</Link>
            <Link to="/ethics" className="cl-link">ethics</Link>
            <Link to="/jobs" className="cl-link">jobs</Link>
            <Link to="/research" className="cl-link">research</Link>
            <Link to="/career-paths" className="cl-link">careers</Link>
            <button
              onClick={toggleAdmin}
              className={`cl-link text-[10px] opacity-10 hover:opacity-100 uppercase`}
            >
              {isAdmin ? '[ exit terminal ]' : '[ system ]'}
            </button>
          </div>
          <p className="text-gray-900 font-bold text-base">© 2024 the social work files - information provided for educational purposes only.</p>
        </footer>
      </div>
    </HashRouter>
  );
};

const App: React.FC = () => (
  <AdminProvider>
    <AppContent />
  </AdminProvider>
);

export default App;