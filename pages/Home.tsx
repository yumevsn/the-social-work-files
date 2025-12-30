
import React from 'react';
import { Link } from 'react-router-dom';

const SectionBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="cl-box mb-6 overflow-hidden shadow-sm">
    <div className="cl-title">{title}</div>
    <div className="p-4 text-base text-black">
      {children}
    </div>
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Community Column */}
      <div className="col-span-1">
        <SectionBox title="community">
          <ul className="space-y-2">
            <li><Link to="/blog" className="cl-link font-bold">latest blog posts</Link></li>
            <li><Link to="/forums" className="cl-link font-bold">professional forums</Link></li>
            <li><Link to="/jobs" className="cl-link font-bold">job board</Link></li>
            <li><Link to="/volunteer" className="cl-link font-bold">volunteer opportunities</Link></li>
            <li><Link to="/events" className="cl-link font-bold">events & webinars</Link></li>
          </ul>
        </SectionBox>
        <SectionBox title="resources">
          <ul className="space-y-2">
            <li><Link to="/research" className="cl-link font-bold">research papers & dissertations</Link></li>
            <li><Link to="/ethics" className="cl-link font-bold">ethics guidelines</Link></li>
            <li><Link to="/theory" className="cl-link font-bold">theoretical frameworks</Link></li>
            <li><Link to="/reading" className="cl-link font-bold">recommended reading</Link></li>
          </ul>
        </SectionBox>
      </div>

      {/* Directory Column */}
      <div className="col-span-1">
        <SectionBox title="regulated regions">
          <div className="grid grid-cols-2 gap-4">
            <ul className="space-y-2">
              <li><Link to="/regulated-countries" className="cl-link font-bold">UK</Link></li>
              <li><Link to="/regulated-countries" className="cl-link font-bold">USA</Link></li>
              <li><Link to="/regulated-countries" className="cl-link font-bold">Canada</Link></li>
              <li><Link to="/regulated-countries" className="cl-link font-bold">Ireland</Link></li>
            </ul>
            <ul className="space-y-2">
              <li><Link to="/regulated-countries" className="cl-link font-bold">Australia</Link></li>
              <li><Link to="/regulated-countries" className="cl-link font-bold">South Africa</Link></li>
              <li><Link to="/regulated-countries" className="cl-link font-bold">New Zealand</Link></li>
              <li><Link to="/regulated-countries" className="cl-link font-bold">More...</Link></li>
            </ul>
          </div>
        </SectionBox>
        <SectionBox title="career paths">
          <ul className="space-y-2">
            <li><Link to="/career-paths" className="cl-link font-bold">social worker roles & types</Link></li>
            <li><Link to="/qualifications" className="cl-link font-bold">education & qualifying</Link></li>
            <li><Link to="/internships" className="cl-link font-bold">internship programs</Link></li>
            <li><Link to="/licensure" className="cl-link font-bold">licensure exams (ASWB)</Link></li>
            <li><Link to="/salary" className="cl-link font-bold">salary guide</Link></li>
          </ul>
        </SectionBox>
      </div>

      {/* Archives Column */}
      <div className="col-span-1">
        <SectionBox title="recent archives">
          <ul className="space-y-3 text-sm">
            <li className="border-b border-gray-200 pb-1">
              <span className="text-black font-black">May 15:</span> <Link to="/blog" className="cl-link font-bold ml-1">Self-Care in Stress</Link>
            </li>
            <li className="border-b border-gray-200 pb-1">
              <span className="text-black font-black">Apr 20:</span> <Link to="/blog" className="cl-link font-bold ml-1">Navigating Legislation</Link>
            </li>
            <li className="border-b border-gray-200 pb-1">
              <span className="text-black font-black">Mar 10:</span> <Link to="/blog" className="cl-link font-bold ml-1">The Future of SW & Ethics</Link>
            </li>
          </ul>
        </SectionBox>
        <SectionBox title="about us">
          <p className="text-base text-black leading-relaxed font-medium">
            The Social Work Files is a community-driven repository providing essential data for professionals and students globally. Founded in 2024 to centralize regulatory and educational data.
          </p>
        </SectionBox>
      </div>
    </div>
  );
};

export default Home;