import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DollarSign, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const Grants = () => {
  const grants = [
    {
      name: 'International Research Collaboration Grant',
      amount: 'Up to $50,000',
      deadline: '2025-03-31',
      status: 'Open',
      category: 'Research',
    },
    {
      name: 'Faculty Exchange Program Grant',
      amount: 'Up to $25,000',
      deadline: '2025-02-28',
      status: 'Open',
      category: 'Exchange',
    },
    {
      name: 'Conference Travel Grant',
      amount: 'Up to $5,000',
      deadline: 'Ongoing',
      status: 'Open',
      category: 'Travel',
    },
    {
      name: 'Joint Publication Grant',
      amount: 'Up to $10,000',
      deadline: '2025-04-30',
      status: 'Open',
      category: 'Publication',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Grants | Faculty Mobility & Research - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Research Grants & Funding</h1>
          <p className="text-xl text-slate-600 mb-12">
            Explore funding opportunities for international research collaborations and faculty mobility.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Grant Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grants.map((grant, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{grant.name}</TableCell>
                  <TableCell>{grant.amount}</TableCell>
                  <TableCell><Badge variant="outline">{grant.category}</Badge></TableCell>
                  <TableCell>{grant.deadline === 'Ongoing' ? 'Ongoing' : new Date(grant.deadline).toLocaleDateString()}</TableCell>
                  <TableCell><Badge className="bg-green-100 text-green-800">{grant.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#283887]" />
                  Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Full-time faculty members</li>
                  <li>• Active research profile</li>
                  <li>• Clear collaboration objectives</li>
                  <li>• Matching funds from partner institution (for some grants)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-[#283887]" />
                  Application Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
                  <li>Review grant requirements</li>
                  <li>Prepare proposal with budget</li>
                  <li>Submit through Call for Proposals</li>
                  <li>Review and approval process</li>
                  <li>Grant disbursement</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grants;
