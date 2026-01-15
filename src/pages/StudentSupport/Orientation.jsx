import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const Orientation = () => {
  const schedule = [
    { time: '9:00 AM', activity: 'Welcome & Registration', venue: 'Main Auditorium' },
    { time: '10:00 AM', activity: 'Campus Tour', venue: 'Starting from Admin Block' },
    { time: '11:30 AM', activity: 'Academic Policies & Procedures', venue: 'Seminar Hall A' },
    { time: '1:00 PM', activity: 'Lunch Break', venue: 'Dining Hall' },
    { time: '2:00 PM', activity: 'Student Services Overview', venue: 'Seminar Hall A' },
    { time: '3:30 PM', activity: 'Cultural Integration Session', venue: 'Cultural Center' },
    { time: '5:00 PM', activity: 'Q&A Session', venue: 'Main Auditorium' },
  ];

  return (
    <>
      <Helmet>
        <title>Orientation | International Student Support - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">International Student Orientation</h1>
          <p className="text-xl text-slate-600 mb-12">
            Welcome to Medicaps University! Our comprehensive orientation program helps you settle in smoothly.
          </p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#283887]" />
                Orientation Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg">
                    <div className="bg-[#283887] text-white rounded-lg px-3 py-2 text-center shrink-0">
                      <Clock className="h-4 w-4 mb-1" />
                      <p className="text-xs font-semibold">{item.time}</p>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-1">{item.activity}</h4>
                      <p className="text-sm text-slate-600 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.venue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>What to Expect</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Campus facilities introduction</li>
                  <li>• Academic system overview</li>
                  <li>• Student support services</li>
                  <li>• Cultural adaptation guidance</li>
                  <li>• Networking with peers</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Important Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Orientation is mandatory for all new international students</li>
                  <li>• Bring your admission documents</li>
                  <li>• Registration for courses happens during orientation</li>
                  <li>• Meet your academic advisors</li>
                  <li>• Complete FRRO registration (if not done)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orientation;
