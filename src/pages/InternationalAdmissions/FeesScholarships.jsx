import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DollarSign, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';

const FeesScholarships = () => {
  const fees = [
    { program: 'B.Tech', annualFee: '$4,000', totalFee: '$16,000' },
    { program: 'M.Tech', annualFee: '$5,000', totalFee: '$10,000' },
    { program: 'BBA', annualFee: '$3,500', totalFee: '$10,500' },
    { program: 'MBA', annualFee: '$6,000', totalFee: '$12,000' },
    { program: 'B.Pharm', annualFee: '$4,500', totalFee: '$18,000' },
    { program: 'M.Pharm', annualFee: '$5,500', totalFee: '$11,000' },
  ];

  const scholarships = [
    {
      name: 'Merit Scholarship',
      coverage: '25-50%',
      criteria: 'CGPA ≥ 8.5, Outstanding academic record',
    },
    {
      name: 'International Student Scholarship',
      coverage: '30%',
      criteria: 'All international students, First year',
    },
    {
      name: 'Country-Specific Scholarship',
      coverage: 'Varies',
      criteria: 'Based on country of origin',
    },
    {
      name: 'Research Excellence Scholarship',
      coverage: '50%',
      criteria: 'For research-oriented programs, Strong research background',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Fees & Scholarships | International Admissions - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Fees & Scholarships</h1>
          <p className="text-xl text-slate-600 mb-12">
            Transparent fee structure and scholarship opportunities for international students.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Tuition Fees */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-[#283887]" />
                  Tuition Fees
                </CardTitle>
                <CardDescription>Annual tuition fees for international students</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program</TableHead>
                      <TableHead>Annual Fee</TableHead>
                      <TableHead>Total Fee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fees.map((fee, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{fee.program}</TableCell>
                        <TableCell>{fee.annualFee}</TableCell>
                        <TableCell>{fee.totalFee}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p className="text-xs text-slate-500 mt-4">
                  * Fees are subject to change. Additional charges may apply for hostel, mess, and other facilities.
                </p>
              </CardContent>
            </Card>

            {/* Scholarships */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#283887]" />
                  Scholarships
                </CardTitle>
                <CardDescription>Available scholarship opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scholarships.map((scholarship, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">{scholarship.name}</h4>
                        <Badge className="bg-green-100 text-green-800">{scholarship.coverage}</Badge>
                      </div>
                      <p className="text-sm text-slate-600">{scholarship.criteria}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-[#283887] to-[#A21D2E] text-white">
            <CardContent className="pt-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Financial Aid Available</h3>
              <p className="text-white/90 mb-4">
                We offer various financial aid options to make quality education accessible. 
                Contact our admissions office to learn more about scholarship applications.
              </p>
              <a href="/contact" className="inline-block px-6 py-3 bg-white text-[#283887] rounded-lg font-medium hover:bg-slate-100 transition-colors">
                Contact Admissions
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default FeesScholarships;
