import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Helmet } from 'react-helmet-async';
import { Loader2, Handshake } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { publicAPI } from '../../services/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";

const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria",
  "Bangladesh", "Belgium", "Brazil", "Canada", "China", "Denmark", "Egypt",
  "Finland", "France", "Germany", "Greece", "India", "Indonesia", "Iran",
  "Iraq", "Ireland", "Israel", "Italy", "Japan", "Kenya", "Mexico", "Nepal",
  "Netherlands", "New Zealand", "Nigeria", "Pakistan", "Poland", "Russia",
  "Saudi Arabia", "Singapore", "South Africa", "Spain", "Sri Lanka", "Sweden",
  "Switzerland", "Thailand", "Turkey", "United Kingdom", "United States",
  "Vietnam", "Zimbabwe"
];
const countryOptions = countries.map(c => ({ value: c, label: c }));

const formSchema = z.object({
  firstName: z.string().regex(/^[A-Za-z\s]+$/).min(2, 'First name is required'),
  lastName: z.string().regex(/^[A-Za-z\s]+$/).min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  institution: z.string().min(1, 'Institution name is required'),
  country: z.string().min(1, 'Country is required'),
  position: z.string().min(1, 'Position is required'),
  partnershipType: z.string().min(1, 'Please select partnership type'),
  interestAreas: z.string().min(1, 'Please specify areas of interest'),
  proposal: z.string().min(100, 'Proposal must be at least 100 characters'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
});

const PartnerWithUs = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      institution: '',
      country: '',
      position: '',
      partnershipType: '',
      interestAreas: '',
      proposal: '',
      website: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await publicAPI.submitTypedForm('Partnership', {
        ...data,
        subject: `Partnership Proposal from ${data.institution}`,
        message: `Partnership Type: ${data.partnershipType}\n\nAreas of Interest: ${data.interestAreas}\n\nProposal: ${data.proposal}\n\nWebsite: ${data.website || 'Not provided'}`,
        formType: 'Partnership',
      });
      toast.success('Partnership proposal submitted successfully! We will review and contact you within 2 weeks.');
      form.reset();
      navigate('/global-partnerships');
    } catch (error) {
      toast.error(error.message || 'Failed to submit proposal');
    }
  };

  return (
    <>
      <Helmet>
        <title>Partner with Us | Global Partnerships - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Handshake className="h-12 w-12 text-[#283887] mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-[#283887] mb-4">Partner with Us</h1>
            <p className="text-xl text-slate-600">
              Interested in establishing a partnership with Medicaps University? Submit your proposal below.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Your details for partnership discussions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input  {...field} placeholder="Your First Name"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input  {...field} placeholder="Your Last Name"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} placeholder="Your Email Address" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            value={field.value ?? ""}
                            placeholder="Enter 10-digit phone number"
                            maxLength={10}
                            inputMode="numeric"
                            pattern="[0-9]{10}"
                            required
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 10);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution/Organization Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                      <FormItem>
                            <FormLabel>Country *</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                options={countryOptions}
                                value={countryOptions.find(option => option.value === field.value)}
                                onChange={option => field.onChange(option.value)}   
                                placeholder="Select a country..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Position *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution Website (Optional)</FormLabel>
                        <FormControl>
                          <Input type="url" {...field} placeholder="https://..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Partnership Proposal</CardTitle>
                  <CardDescription>Details about your proposed partnership</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="partnershipType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Partnership Type *</FormLabel>
                        <FormControl>
                          <select {...field} className="w-full px-3 py-2 border border-slate-300 rounded-md">
                            <option value="">Select type</option>
                            <option value="Strategic">Strategic Partnership</option>
                            <option value="Research">Research Collaboration</option>
                            <option value="Dual Degree">Dual/Joint Degree Program</option>
                            <option value="Student Exchange">Student Exchange Program</option>
                            <option value="Faculty Exchange">Faculty Exchange</option>
                            <option value="Industry">Industry Partnership</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="interestAreas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Areas of Interest *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Engineering, Business, Research in AI, etc." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="proposal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Partnership Proposal *</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={8}
                            {...field}
                            placeholder="Describe your proposed partnership, its objectives, benefits, and how it aligns with both institutions' goals..."
                          />
                        </FormControl>
                        <FormDescription>Minimum 100 characters</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-[#283887] hover:bg-[#283887]/90">
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Handshake className="h-4 w-4 mr-2" />
                    Submit Partnership Proposal
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default PartnerWithUs;
