import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Plane, Users, FileCheck, GraduationCap } from 'lucide-react';

const StudentMobility = () => {
  return (
    <>
      <Helmet>
        <title>Student Mobility | OIA - Medicaps University</title>
      </Helmet>
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Student Mobility</h1>
          <p className="text-xl text-slate-600 mb-12">
            Explore opportunities for student exchange programs, both outbound and inbound.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Plane className="h-8 w-8 text-[#283887] mb-2" />
                <CardTitle>Outbound Programs</CardTitle>
                <CardDescription>Study abroad opportunities for Medicaps students</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link to="/student-mobility/outbound">Explore Outbound</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-[#283887] mb-2" />
                <CardTitle>Inbound Programs</CardTitle>
                <CardDescription>Exchange programs for international students</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link to="/student-mobility/inbound">Explore Inbound</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <FileCheck className="h-8 w-8 text-[#283887] mb-2" />
                <CardTitle>Eligibility & Selection</CardTitle>
                <CardDescription>Requirements and selection criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link to="/student-mobility/eligibility">View Requirements</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <GraduationCap className="h-8 w-8 text-[#283887] mb-2" />
                <CardTitle>Apply for Mobility</CardTitle>
                <CardDescription>Submit your application for exchange programs</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link to="/student-mobility/apply">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentMobility;


