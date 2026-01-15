import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { publicAPI } from '../../services/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  studentId: z.string().min(1, 'Student ID is required'),
  program: z.string().min(1, 'Please select a program'),
  semester: z.string().min(1, 'Please select a semester'),
  cgpa: z.string().min(1, 'CGPA is required'),
  motivation: z.string().min(50, 'Motivation statement must be at least 50 characters'),
  previousExperience: z.string().optional(),
  additionalInfo: z.string().optional(),
});

const ApplyMobility = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const totalSteps = 3;
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      studentId: '',
      program: '',
      semester: '',
      cgpa: '',
      motivation: '',
      previousExperience: '',
      additionalInfo: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await publicAPI.submitTypedForm('Application', {
        ...data,
        subject: `Mobility Application - ${data.program}`,
        message: `Motivation: ${data.motivation}\n\nPrevious Experience: ${data.previousExperience || 'N/A'}\n\nAdditional Info: ${data.additionalInfo || 'N/A'}`,
        formType: 'Application',
      });
      toast.success('Application submitted successfully! We will review and contact you soon.');
      form.reset();
      navigate('/student-mobility');
    } catch (error) {
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const fields = getStepFields(currentStep);
    const isValid = await form.trigger(fields);
    if (isValid) {
      setCurrentStep(Math.min(currentStep + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const getStepFields = (step) => {
    switch (step) {
      case 1:
        return ['firstName', 'lastName', 'email', 'phone', 'studentId'];
      case 2:
        return ['program', 'semester', 'cgpa'];
      case 3:
        return ['motivation'];
      default:
        return [];
    }
  };

  return (
    <>
      <Helmet>
        <title>Apply for Mobility | Student Mobility - OIA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Apply for Student Mobility</h1>
          <p className="text-xl text-slate-600 mb-8">
            Complete the application form to apply for student exchange programs.
          </p>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="relative mb-4 px-5 pt-1 pb-6">
              <div className="absolute left-5 right-5 top-12 h-1 bg-slate-300 rounded" />
              <div
                className="absolute left-5 top-12 h-1 bg-[#283887] rounded"
                style={{ width: `calc(${progressPercent}% * (100% - 2.5rem) / 100)` }}
              />

              <div className="grid grid-cols-3 items-center relative z-10">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center justify-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      step <= currentStep ? 'bg-[#283887] border-[#283887] text-white' : 'border-slate-300 text-slate-400'
                    }`}>
                      {step < currentStep ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <span>{step}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 text-sm text-slate-600 text-center">
              <span>Personal Info</span>
              <span>Program Details</span>
              <span>Motivation</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Step {currentStep} of {totalSteps}
                  </CardTitle>
                  <CardDescription>
                    {currentStep === 1 && 'Please provide your personal information'}
                    {currentStep === 2 && 'Select your program and academic details'}
                    {currentStep === 3 && 'Tell us why you want to participate'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <>
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
                    </>
                  )}

                  {/* Step 2: Program Details */}
                  {currentStep === 2 && (
                    <>
                      <FormField
                        control={form.control}
                        name="program"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Desired Program *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a program" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="semester-exchange">Semester Exchange</SelectItem>
                                <SelectItem value="short-term">Short-term Program</SelectItem>
                                <SelectItem value="internship">Internship</SelectItem>
                                <SelectItem value="summer-program">Summer Program</SelectItem>
                                <SelectItem value="winter-program">Winter Program</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="semester"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Semester *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select semester" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="fall-2025">Fall 2025</SelectItem>
                                <SelectItem value="spring-2026">Spring 2026</SelectItem>
                                <SelectItem value="fall-2026">Fall 2026</SelectItem>
                                <SelectItem value="spring-2027">Spring 2027</SelectItem>
                              </SelectContent>
                            </Select>
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
                            <FormDescription>Enter your current CGPA (out of 10)</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {/* Step 3: Motivation */}
                  {currentStep === 3 && (
                    <>
                      <FormField
                        control={form.control}
                        name="motivation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Motivation Statement *</FormLabel>
                            <FormControl>
                              <Textarea
                                rows={6}
                                placeholder="Explain why you want to participate in this exchange program, what you hope to gain, and how it aligns with your academic and career goals..."
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>Minimum 50 characters</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="previousExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Previous International Experience (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                rows={4}
                                placeholder="Describe any previous international experience, travel, or cultural exposure..."
                                {...field}
                              />
                            </FormControl>
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
                                rows={4}
                                placeholder="Any additional information you'd like to share..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                {currentStep < totalSteps ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting} className="bg-[#283887] hover:bg-[#283887]/90">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ApplyMobility;
