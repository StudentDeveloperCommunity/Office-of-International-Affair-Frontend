import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Award, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const Scholarships = () => {
  const scholarships = [
    {
      name: 'Fulbright Scholarship',
      country: 'USA',
      amount: 'Full tuition + living',
      deadline: '2025-10-15',
      link: 'https://fulbright.org',
    },
    {
      name: 'Chevening Scholarship',
      country: 'UK',
      amount: 'Full funding',
      deadline: '2025-11-01',
      link: 'https://chevening.org',
    },
    {
      name: 'Erasmus Mundus',
      country: 'Europe',
      amount: 'Full funding',
      deadline: '2025-01-31',
      link: 'https://erasmus-plus.ec.europa.eu',
    },
    {
      name: 'Australia Awards',
      country: 'Australia',
      amount: 'Full funding',
      deadline: '2025-04-30',
      link: 'https://australiaawards.gov.au',
    },
    {
      name: 'DAAD Scholarship',
      country: 'Germany',
      amount: '€850-1200/month',
      deadline: '2025-09-30',
      link: 'https://daad.de',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Scholarships | Higher Studies & Global Opportunities - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Scholarships for Higher Studies</h1>
          <p className="text-xl text-slate-600 mb-12">
            Explore external scholarship opportunities for pursuing master's and PhD programs abroad.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scholarship Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scholarships.map((scholarship, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{scholarship.name}</TableCell>
                  <TableCell><Badge variant="outline">{scholarship.country}</Badge></TableCell>
                  <TableCell>{scholarship.amount}</TableCell>
                  <TableCell>{new Date(scholarship.deadline).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <a
                      href={scholarship.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#283887] hover:text-[#A21D2E] flex items-center gap-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Card className="mt-8 bg-gradient-to-r from-[#283887] to-[#A21D2E] text-white">
            <CardContent className="pt-6 text-center">
              <Award className="h-12 w-12 mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-bold mb-2">Need Scholarship Guidance?</h3>
              <p className="text-white/90 mb-4">
                Our team can help you identify suitable scholarships and prepare strong applications.
              </p>
              <a href="/contact" className="inline-block px-6 py-3 bg-white text-[#283887] rounded-lg font-medium hover:bg-slate-100 transition-colors">
                Get Guidance
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Scholarships;
