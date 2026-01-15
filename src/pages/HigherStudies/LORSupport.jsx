import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Helmet } from 'react-helmet-async';
import { Loader2, FileText, Mail } from 'lucide-react';
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
  studentId: z.string().min(1, 'Student ID is required'),
  program: z.string().min(1, 'Program is required'),
  graduationYear: z.string().min(1, 'Graduation year is required'),
  cgpa: z.string().min(1, 'CGPA is required'),
  universityName: z.string().min(1, 'University name is required'),
  programName: z.string().min(1, 'Program name is required'),
  deadline: z.string().min(1, 'Deadline is required'),
  purpose: z.string().min(50, 'Purpose must be at least 50 characters'),
  additionalInfo: z.string().optional(),
});

const LORSupport = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      studentId: '',
      program: '',
      graduationYear: '',
      cgpa: '',
      universityName: '',
      programName: '',
      deadline: '',
      purpose: '',
      additionalInfo: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await publicAPI.submitTypedForm('LOR Request', {
        ...data,
        subject: `LOR Request for ${data.universityName}`,
        message: `Student ID: ${data.studentId}\nProgram: ${data.program}\nGraduation Year: ${data.graduationYear}\nCGPA: ${data.cgpa}\n\nUniversity: ${data.universityName}\nProgram: ${data.programName}\nDeadline: ${data.deadline}\n\nPurpose: ${data.purpose}\n\nAdditional Info: ${data.additionalInfo || 'N/A'}`,
        formType: 'LOR Request',
      });
      toast.success('LOR request submitted successfully! We will process it within 5 business days.');
      form.reset();
      navigate('/higher-studies-opportunities');
    } catch (error) {
      toast.error(error.message || 'Failed to submit LOR request');
    }
  };

  return (
    <>
      <Helmet>
        <title>LOR Support | Higher Studies & Global Opportunities - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <FileText className="h-12 w-12 text-[#283887] mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-[#283887] mb-4">Letter of Recommendation (LOR) Support</h1>
            <p className="text-xl text-slate-600">
              Request a Letter of Recommendation for your higher studies applications.
            </p>
          </div>

          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Processing Time</h3>
                  <p className="text-blue-800 text-sm">
                    LOR requests are typically processed within 5 business days. Please submit your request 
                    well in advance of your application deadline.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Information</CardTitle>
                  <CardDescription>Your details as a Medi-Caps student</CardDescription>
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
                    name="studentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student ID *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="program"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Program *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., B.Tech CSE" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="graduationYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Graduation Year *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., 2025" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cgpa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current CGPA *</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" min="0" max="10" {...field} />
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
                  <CardTitle>Application Details</CardTitle>
                  <CardDescription>Information about the program you're applying to</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="universityName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University Name *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Stanford University" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="programName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Name *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., MS in Computer Science" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application Deadline *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purpose of LOR *</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            {...field}
                            placeholder="Explain why you need this LOR and how it will support your application..."
                          />
                        </FormControl>
                        <FormDescription>Minimum 50 characters</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
                            {...field}
                            placeholder="Any additional information that might help in writing your LOR..."
                          />
                        </FormControl>
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
                    <FileText className="h-4 w-4 mr-2" />
                    Submit LOR Request
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

export default LORSupport;
