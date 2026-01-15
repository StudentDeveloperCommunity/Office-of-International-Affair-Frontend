import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Helmet } from 'react-helmet-async';
import { Loader2, FileText } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { publicAPI } from '../../services/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  institution: z.string().min(1, 'Institution is required'),
  department: z.string().min(1, 'Department is required'),
  position: z.string().min(1, 'Position is required'),
  proposalTitle: z.string().min(5, 'Proposal title is required'),
  researchArea: z.string().min(1, 'Research area is required'),
  proposalDescription: z.string().min(100, 'Proposal description must be at least 100 characters'),
  expectedOutcomes: z.string().min(50, 'Expected outcomes must be at least 50 characters'),
  budget: z.string().optional(),
  timeline: z.string().min(1, 'Timeline is required'),
  collaborationType: z.string().min(1, 'Please select collaboration type'),
});

const CallForProposals = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      institution: '',
      department: '',
      position: '',
      proposalTitle: '',
      researchArea: '',
      proposalDescription: '',
      expectedOutcomes: '',
      budget: '',
      timeline: '',
      collaborationType: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await publicAPI.submitTypedForm('Proposal', {
        ...data,
        subject: `Research Proposal: ${data.proposalTitle}`,
        message: `Research Area: ${data.researchArea}\n\nProposal Description: ${data.proposalDescription}\n\nExpected Outcomes: ${data.expectedOutcomes}\n\nBudget: ${data.budget || 'Not specified'}\n\nTimeline: ${data.timeline}\n\nCollaboration Type: ${data.collaborationType}`,
        formType: 'Proposal',
      });
      toast.success('Proposal submitted successfully! Our team will review and contact you within 2 weeks.');
      form.reset();
      navigate('/faculty-mobility-research');
    } catch (error) {
      toast.error(error.message || 'Failed to submit proposal');
    }
  };

  return (
    <>
      <Helmet>
        <title>Call for Proposals | Faculty Mobility & Research - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Call for Research Proposals</h1>
          <p className="text-xl text-slate-600 mb-8">
            Submit your research proposal for international collaboration and funding opportunities.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your contact and professional details</CardDescription>
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
                            <Input {...field} />
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
                            <Input {...field} />
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
                          <Input type="email" {...field} />
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
                          <Input type="tel" {...field} />
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
                        <FormLabel>Institution *</FormLabel>
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
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department *</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>Position *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Proposal Details</CardTitle>
                  <CardDescription>Information about your research proposal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="proposalTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proposal Title *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="researchArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Research Area *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Artificial Intelligence, Climate Change, etc." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="collaborationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Collaboration Type *</FormLabel>
                        <FormControl>
                          <select {...field} className="w-full px-3 py-2 border border-slate-300 rounded-md">
                            <option value="">Select type</option>
                            <option value="joint-research">Joint Research Project</option>
                            <option value="faculty-exchange">Faculty Exchange</option>
                            <option value="student-exchange">Student Exchange</option>
                            <option value="conference">Conference/Workshop</option>
                            <option value="publication">Joint Publication</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="proposalDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proposal Description *</FormLabel>
                        <FormControl>
                          <Textarea rows={6} {...field} placeholder="Describe your research proposal in detail..." />
                        </FormControl>
                        <FormDescription>Minimum 100 characters</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expectedOutcomes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expected Outcomes *</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} placeholder="What are the expected outcomes and benefits of this collaboration?" />
                        </FormControl>
                        <FormDescription>Minimum 50 characters</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Budget (Optional)</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} placeholder="e.g., $50,000" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proposed Timeline *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., 12 months, Q1 2026, etc." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
                    <FileText className="h-4 w-4 mr-2" />
                    Submit Proposal
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

export default CallForProposals;
