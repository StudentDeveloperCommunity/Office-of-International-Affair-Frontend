import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { publicAPI } from '../services/api';
import { toast } from 'sonner';

const Contact = () => {
  const [formType, setFormType] = useState('Enquiry');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    country: '',
    institution: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const contactInfo = {
    office: "Office of International Affairs",
    address: "A.B. Road Pigdamber, Rau, Indore, Madhya Pradesh 453331",
    phone: "+91 731 3111500",
    email: "international@medicaps.ac.in",
    hours: "Monday - Friday: 9:00 AM - 5:00 PM"
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Use typed form submission for specific types, otherwise use regular contact
      if (formType !== 'Enquiry') {
        const response = await publicAPI.submitTypedForm(formType, {
          ...formData,
          formType: formType
        });
        toast.success(response.message || 'Form submitted successfully!');
      } else {
        const response = await publicAPI.submitContact({
          ...formData,
          formType: 'Enquiry'
        });
        toast.success(response.message || 'Message sent successfully!');
      }
      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        country: '',
        institution: ''
      });
    } catch (err) {
      const errorMsg = err.message || 'Failed to submit form. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-8 pb-8">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-900 mb-2">Message Sent Successfully!</h2>
                <p className="text-green-700 mb-6">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
                <Button 
                  onClick={() => setSuccess(false)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Send Another Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get in touch with our International Affairs team for guidance on exchange programs, 
            application assistance, or any questions about studying abroad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">Get in Touch</CardTitle>
                <CardDescription>
                  We're here to help you navigate your international education journey.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Office Address</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {contactInfo.office}<br />
                      {contactInfo.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                    <p className="text-slate-600">{contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600">{contactInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Office Hours</h3>
                    <p className="text-slate-600">{contactInfo.hours}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Quick Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a 
                  href="https://www.medicaps.ac.in/internationalism-collaboration/internationalism-overview" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  <MessageSquare className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-slate-700 group-hover:text-blue-600">International Collaborations</span>
                </a>
                <a 
                  href="https://admission.medicaps.ac.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  <MessageSquare className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-slate-700 group-hover:text-blue-600">University Admissions</span>
                </a>
                <a 
                  href="https://www.medicaps.ac.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  <MessageSquare className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-slate-700 group-hover:text-blue-600">Medicaps University</span>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="formType" className="block text-sm font-medium text-slate-700 mb-2">
                      Form Type *
                    </label>
                    <Select value={formType} onValueChange={setFormType}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Enquiry">General Enquiry</SelectItem>
                        <SelectItem value="Proposal">Partnership Proposal</SelectItem>
                        <SelectItem value="LOR Request">LOR (Letter of Recommendation) Request</SelectItem>
                        <SelectItem value="Application">Application Inquiry</SelectItem>
                        <SelectItem value="Partnership">Partnership Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                        First Name *
                      </label>
                      <Input 
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required 
                        className="border-slate-300 focus:border-blue-500" 
                        placeholder="Your first name"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                        Last Name *
                      </label>
                      <Input 
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required 
                        className="border-slate-300 focus:border-blue-500" 
                        placeholder="Your last name"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <Input 
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      className="border-slate-300 focus:border-blue-500" 
                      placeholder="your.email@example.com"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <Input 
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-slate-300 focus:border-blue-500" 
                      placeholder="+91 XXXXX XXXXX"
                      disabled={loading}
                    />
                  </div>

                  {(formType === 'Proposal' || formType === 'Partnership' || formType === 'Application') && (
                    <>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-slate-700 mb-2">
                          Country
                        </label>
                        <Input 
                          id="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="border-slate-300 focus:border-blue-500" 
                          placeholder="Your country"
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <label htmlFor="institution" className="block text-sm font-medium text-slate-700 mb-2">
                          Institution/Organization
                        </label>
                        <Input 
                          id="institution"
                          value={formData.institution}
                          onChange={handleChange}
                          className="border-slate-300 focus:border-blue-500" 
                          placeholder="Your institution or organization"
                          disabled={loading}
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                      Subject *
                    </label>
                    <Input 
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required 
                      className="border-slate-300 focus:border-blue-500" 
                      placeholder="What is this regarding?"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message *
                    </label>
                    <Textarea 
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      required 
                      rows={5}
                      className="border-slate-300 focus:border-blue-500" 
                      placeholder="Please describe your inquiry or questions about exchange programs..."
                      disabled={loading}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;