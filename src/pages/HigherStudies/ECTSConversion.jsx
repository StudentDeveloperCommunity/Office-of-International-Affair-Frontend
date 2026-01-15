import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';

const ECTSConversion = () => {
  const [fromSystem, setFromSystem] = useState('ects');
  const [toSystem, setToSystem] = useState('us');
  const [credits, setCredits] = useState('');
  const [result, setResult] = useState(null);

  const conversionRates = {
    ects: { us: 0.5, uk: 0.5, indian: 1 },
    us: { ects: 2, uk: 1, indian: 2 },
    uk: { ects: 2, us: 1, indian: 2 },
    indian: { ects: 1, us: 0.5, uk: 0.5 },
  };

  const systemNames = {
    ects: 'ECTS (European)',
    us: 'US Credits',
    uk: 'UK Credits',
    indian: 'Indian Credits',
  };

  const handleConvert = () => {
    const creditsNum = parseFloat(credits);
    if (isNaN(creditsNum) || creditsNum <= 0) {
      setResult(null);
      return;
    }

    if (fromSystem === toSystem) {
      setResult(creditsNum);
      return;
    }

    const rate = conversionRates[fromSystem]?.[toSystem] || 1;
    const converted = creditsNum * rate;
    setResult(converted.toFixed(2));
  };

  React.useEffect(() => {
    if (credits) {
      handleConvert();
    } else {
      setResult(null);
    }
  }, [fromSystem, toSystem, credits]);

  return (
    <>
      <Helmet>
        <title>ECTS Conversion Tool | Higher Studies - OIA</title>
        <meta name="description" content="Convert credits between ECTS, US, UK, and Indian credit systems for international study planning." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">ECTS Credit Conversion Tool</h1>
          <p className="text-xl text-slate-600 mb-8">
            Convert credits between different international credit systems to plan your studies abroad.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Converter */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-[#283887]" />
                  Credit Converter
                </CardTitle>
                <CardDescription>Convert between different credit systems</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>From System</Label>
                  <Select value={fromSystem} onValueChange={setFromSystem}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ects">ECTS (European)</SelectItem>
                      <SelectItem value="us">US Credits</SelectItem>
                      <SelectItem value="uk">UK Credits</SelectItem>
                      <SelectItem value="indian">Indian Credits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Number of Credits</Label>
                  <Input
                    type="number"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                    placeholder="Enter credits"
                    min="0"
                    step="0.5"
                  />
                </div>

                <div className="space-y-2">
                  <Label>To System</Label>
                  <Select value={toSystem} onValueChange={setToSystem}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ects">ECTS (European)</SelectItem>
                      <SelectItem value="us">US Credits</SelectItem>
                      <SelectItem value="uk">UK Credits</SelectItem>
                      <SelectItem value="indian">Indian Credits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {result !== null && (
                  <div className="bg-[#283887]/10 rounded-lg p-4 text-center">
                    <p className="text-sm text-slate-600 mb-1">Converted Credits</p>
                    <p className="text-3xl font-bold text-[#283887]">{result}</p>
                    <p className="text-xs text-slate-500 mt-1">{systemNames[toSystem]}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-[#283887]" />
                  Credit Systems
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-1">ECTS (European)</h4>
                  <p className="text-slate-600">1 ECTS = 25-30 hours of work. Standard in European universities.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">US Credits</h4>
                  <p className="text-slate-600">1 US credit = 1 hour of class per week. Typically 3-4 credits per course.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">UK Credits</h4>
                  <p className="text-slate-600">Similar to US system. 1 UK credit ≈ 1 US credit.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Indian Credits</h4>
                  <p className="text-slate-600">Based on contact hours. Typically 1 credit = 1 hour per week.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ */}
          <Alert className="mt-8">
            <Info className="h-4 w-4" />
            <AlertTitle>Note</AlertTitle>
            <AlertDescription>
              Conversion rates are approximate and may vary by institution. Always verify with your 
              target university's credit transfer policy. For official credit transfer, contact the 
              OIA office.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </>
  );
};

export default ECTSConversion;
