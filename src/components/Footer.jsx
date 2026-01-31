import React from 'react';
import { MapPin, Phone, Mail, Clock, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* University Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="https://www.medicaps.ac.in/public/frontend/images/logo.png" 
                alt="Medicaps University" 
                className="h-10 w-auto filter brightness-0 invert"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/100x40/ffffff/1e40af?text=MEDICAPS";
                }}
              />
              
            </div>
            <h3 className="text-xl font-bold">Medicaps University</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Office of International Affairs - Connecting students to global opportunities 
              through world-class exchange programs and international partnerships.
            </p>
            <div className="flex items-center space-x-2 text-slate-300">
              <MapPin className="h-4 w-4 text-blue-400" />
              <span className="text-sm">A.B. Road Pigdamber, Rau, Indore, MP 453331</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-400">
              <Globe className="h-5 w-5 text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.medicaps.ac.in" target="_blank" rel="noopener noreferrer" 
                   className="text-slate-300 hover:text-white transition-colors text-sm">
                  Medicaps University
                </a>
              </li>
              <li>
                <a href="https://admission.medicaps.ac.in" target="_blank" rel="noopener noreferrer" 
                   className="text-slate-300 hover:text-white transition-colors text-sm">
                  Admissions
                </a>
              </li>
              <li>
                <a href="https://www.medicaps.ac.in/internationalism-collaboration/internationalism-overview" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-slate-300 hover:text-white transition-colors text-sm">
                  International Collaborations
                </a>
              </li>
              <li>
                <a href="https://www.medicaps.ac.in/faculty-staff" target="_blank" rel="noopener noreferrer" 
                   className="text-slate-300 hover:text-white transition-colors text-sm">
                  Faculty & Staff
                </a>
              </li>
              <li>
                <a href="/dev-team" 
                   className="text-slate-300 hover:text-white transition-colors text-sm">
                  Developing Team of Website
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-slate-300 text-sm">+91 731 3111500</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-slate-300 text-sm">international@medicaps.ac.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-slate-300 text-sm">Mon-Fri: 9:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2025 Medicaps University - Office of International Affairs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;