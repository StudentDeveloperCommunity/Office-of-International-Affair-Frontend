import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, Shield, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const HealthInsurance = () => {
  const providers = [
    { name: 'ICICI Lombard', coverage: 'Comprehensive', premium: '$200/year' },
    { name: 'HDFC Ergo', coverage: 'Comprehensive', premium: '$180/year' },
    { name: 'Bajaj Allianz', coverage: 'Basic + Emergency', premium: '$150/year' },
  ];

  return (
    <>
      <Helmet>
        <title>Health & Insurance | International Student Support - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Health & Insurance</h1>
          <p className="text-xl text-slate-600 mb-12">
            Comprehensive health insurance is mandatory for all international students.
          </p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#283887]" />
                Insurance Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-600">
                <li>• Health insurance is mandatory for all international students</li>
                <li>• Minimum coverage: $50,000 for medical expenses</li>
                <li>• Must cover hospitalization, emergency care, and repatriation</li>
                <li>• Insurance must be valid for entire duration of study</li>
                <li>• Proof of insurance required at registration</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recommended Insurance Providers</CardTitle>
              <CardDescription>OIA-approved insurance providers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead>Premium</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {providers.map((provider, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{provider.name}</TableCell>
                      <TableCell>{provider.coverage}</TableCell>
                      <TableCell>{provider.premium}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-[#283887]" />
                  On-Campus Medical Facility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm mb-4">
                  Medi-Caps has a fully equipped medical center with qualified doctors available 
                  during office hours. Emergency services are available 24/7.
                </p>
                <div className="text-sm text-slate-600">
                  <p className="font-semibold mb-1">Services:</p>
                  <ul className="space-y-1">
                    <li>• General consultations</li>
                    <li>• First aid</li>
                    <li>• Health checkups</li>
                    <li>• Emergency care</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-[#283887]" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-slate-900">Medical Emergency</p>
                    <p className="text-slate-600">108 (Ambulance)</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Campus Medical Center</p>
                    <p className="text-slate-600">+91-731-1234567</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">OIA Emergency Helpline</p>
                    <p className="text-slate-600">+91-731-1234568 (24/7)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthInsurance;
