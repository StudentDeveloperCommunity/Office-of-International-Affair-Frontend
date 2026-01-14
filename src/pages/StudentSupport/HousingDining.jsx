import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Home, Utensils, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const HousingDining = () => {
  const facilities = [
    { name: 'Wi-Fi', available: true },
    { name: 'Laundry', available: true },
    { name: '24/7 Security', available: true },
    { name: 'Common Room', available: true },
    { name: 'Study Room', available: true },
    { name: 'Gym', available: true },
  ];

  return (
    <>
      <Helmet>
        <title>Housing & Dining | International Student Support - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Housing & Dining</h1>
          <p className="text-xl text-slate-600 mb-12">
            Comfortable accommodation and nutritious dining options for international students.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Housing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-[#283887]" />
                  On-Campus Hostels
                </CardTitle>
                <CardDescription>Modern hostel facilities with all amenities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Room Types</h4>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li>• Single occupancy rooms</li>
                    <li>• Double occupancy rooms</li>
                    <li>• Triple occupancy rooms</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Facilities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {facilities.map((facility, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Badge variant={facility.available ? 'default' : 'outline'} className="text-xs">
                          {facility.available ? '✓' : '✗'}
                        </Badge>
                        {facility.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Rent</h4>
                  <p className="text-slate-600 text-sm">Starting from $200/month (varies by room type)</p>
                </div>
              </CardContent>
            </Card>

            {/* Dining */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-[#283887]" />
                  Dining Facilities
                </CardTitle>
                <CardDescription>Multiple dining options on campus</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Dining Halls</h4>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li>• Main Dining Hall (vegetarian & non-vegetarian)</li>
                    <li>• International Cuisine Corner</li>
                    <li>• Cafeteria & Snack Bar</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Meal Plans</h4>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li>• Full meal plan: $150/month</li>
                    <li>• Breakfast only: $60/month</li>
                    <li>• Pay-per-meal option available</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Special Dietary Needs</h4>
                  <p className="text-slate-600 text-sm">
                    Halal, vegetarian, and special dietary requirements can be accommodated. 
                    Please inform in advance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-100">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-slate-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Off-Campus Housing</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    OIA provides assistance in finding off-campus accommodation. Contact us for 
                    recommendations and support.
                  </p>
                  <a href="/contact" className="text-[#283887] hover:text-[#A21D2E] font-medium text-sm">
                    Request Housing Assistance →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default HousingDining;
