import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Lightbulb, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const JointProjects = () => {
  const projects = [
    {
      title: 'AI for Climate Change',
      partners: ['MIT', 'Stanford'],
      status: 'Active',
      funding: '$500K',
    },
    {
      title: 'Sustainable Energy Solutions',
      partners: ['ETH Zurich'],
      status: 'Active',
      funding: '$300K',
    },
    {
      title: 'Biomedical Engineering',
      partners: ['Oxford', 'Cambridge'],
      status: 'Planning',
      funding: 'TBD',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Joint Research Projects | Faculty Mobility & Research - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Joint Research Projects</h1>
          <p className="text-xl text-slate-600 mb-12">
            Collaborative research initiatives with international partners driving innovation and academic excellence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {projects.map((project, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge>{project.status}</Badge>
                    <Lightbulb className="h-5 w-5 text-[#283887]" />
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Partners:</p>
                      <div className="flex flex-wrap gap-1">
                        {project.partners.map((partner, pIdx) => (
                          <Badge key={pIdx} variant="outline" className="text-xs">
                            {partner}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-600">Funding: {project.funding}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>How to Propose a Joint Project</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 list-decimal list-inside text-slate-600">
                <li>Identify research area and potential partners</li>
                <li>Develop project proposal with clear objectives and outcomes</li>
                <li>Submit through Call for Proposals form</li>
                <li>OIA reviews and facilitates partner discussions</li>
                <li>Project approval and funding allocation</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default JointProjects;
