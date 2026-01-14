import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Download, FileText, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

const FormsDownloads = () => {
  const forms = [
    {
      title: 'Student Mobility Application Form',
      description: 'Application form for student exchange programs',
      category: 'Mobility',
      format: 'PDF',
      size: '245 KB',
      downloadUrl: '#',
    },
    {
      title: 'Credit Transfer Request Form',
      description: 'Request form for credit transfer from partner universities',
      category: 'Mobility',
      format: 'PDF',
      size: '180 KB',
      downloadUrl: '#',
    },
    {
      title: 'Faculty Exchange Application',
      description: 'Application form for faculty exchange programs',
      category: 'Faculty',
      format: 'PDF',
      size: '220 KB',
      downloadUrl: '#',
    },
    {
      title: 'LOR Request Form',
      description: 'Letter of Recommendation request form',
      category: 'Higher Studies',
      format: 'PDF',
      size: '150 KB',
      downloadUrl: '#',
    },
    {
      title: 'International Admission Form',
      description: 'Application form for international students',
      category: 'Admissions',
      format: 'PDF',
      size: '300 KB',
      downloadUrl: '#',
    },
    {
      title: 'Partnership Proposal Template',
      description: 'Template for partnership proposals',
      category: 'Partnerships',
      format: 'DOCX',
      size: '125 KB',
      downloadUrl: '#',
    },
    {
      title: 'Visa Support Letter Request',
      description: 'Request form for visa support letters',
      category: 'Admissions',
      format: 'PDF',
      size: '160 KB',
      downloadUrl: '#',
    },
    {
      title: 'Research Collaboration Proposal',
      description: 'Template for research collaboration proposals',
      category: 'Research',
      format: 'DOCX',
      size: '200 KB',
      downloadUrl: '#',
    },
  ];

  const categories = ['All', 'Mobility', 'Faculty', 'Higher Studies', 'Admissions', 'Partnerships', 'Research'];

  return (
    <>
      <Helmet>
        <title>Forms & Downloads | Resources & Systems - OIA</title>
        <meta name="description" content="Download forms and documents for student mobility, admissions, partnerships, and other OIA services." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Forms & Downloads</h1>
          <p className="text-xl text-slate-600 mb-8">
            Download application forms, templates, and other documents for OIA services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline">{form.category}</Badge>
                    <Badge>{form.format}</Badge>
                  </div>
                  <CardTitle className="text-base">{form.title}</CardTitle>
                  <CardDescription className="text-sm">{form.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{form.size}</span>
                    <Button size="sm" variant="outline" asChild>
                      <a href={form.downloadUrl} download>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
                  <p className="text-blue-800 text-sm mb-4">
                    If you need assistance filling out any form or have questions about the application process, 
                    please contact our office.
                  </p>
                  <Button asChild variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    <a href="/contact">Contact Support</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default FormsDownloads;
