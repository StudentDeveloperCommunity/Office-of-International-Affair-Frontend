import React from 'react';
import { usePrograms } from '../../hooks/useOIAData';
import { Helmet } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { MapPin, Clock, Calendar } from 'lucide-react';

const OutboundMobility = () => {
  const { data, isLoading } = usePrograms({ page: 1, page_size: 20 });

  return (
    <>
      <Helmet>
        <title>Outbound Programs | Student Mobility - OIA</title>
      </Helmet>
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Outbound Programs</h1>
          <p className="text-xl text-slate-600 mb-8">
            Explore semester exchange, short-term, and internship opportunities abroad.
          </p>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#283887]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.items?.map((program) => (
                <Card key={program.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Badge className="mb-2">{program.status}</Badge>
                    <CardTitle className="line-clamp-2">{program.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {program.partnerUniversity}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="h-4 w-4" />
                        {program.duration}
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="h-4 w-4" />
                        {program.deadline}
                      </div>
                    </div>
                    <Button asChild className="w-full">
                      <Link to={`/program/${program.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OutboundMobility;


