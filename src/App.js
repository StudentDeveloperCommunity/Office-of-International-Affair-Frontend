import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";
import ScrollToTop from "./components/ScrollToTop";
import { Loader2 } from "lucide-react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// react-query devtools is optional; load dynamically to avoid build error when not installed
import ErrorBoundary from './components/ErrorBoundary';

// Admin routes (not lazy loaded for faster access)
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ContactMessages from "./pages/ContactMessages";
import ProgramFormPage from "./pages/ProgramFormPage";
import NewsFormPage from "./pages/NewsFormPage";
import PartnershipFormPage from "./pages/PartnershipFormPage";
import EventFormPage from "./pages/EventFormPage";
import TeamMemberFormPage from "./pages/TeamMemberFormPage";
import FAQFormPage from "./pages/FAQFormPage";
import GalleryFormPage from "./pages/GalleryFormPage";
import ContactFormPage from "./pages/ContactFormPage";

// Public routes - lazy loaded for code splitting
const Home = lazy(() => import("./pages/Home"));
const Programs = lazy(() => import("./pages/Programs"));
const ProgramDetail = lazy(() => import("./pages/ProgramDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const DevTeam = lazy(() => import("./pages/DevTeam"));

// About OIA pages
const AboutOIA = lazy(() => import("./pages/AboutOIA/AboutOIA"));
const VisionMission = lazy(() => import("./pages/AboutOIA/VisionMission"));
const OIAStrategy = lazy(() => import("./pages/AboutOIA/OIAStrategy"));
const OIATeam = lazy(() => import("./pages/AboutOIA/OIATeam"));
const Policies = lazy(() => import("./pages/AboutOIA/Policies"));

// Global Partnerships pages
const GlobalPartnerships = lazy(() => import("./pages/GlobalPartnerships/GlobalPartnerships"));
const ResearchPartnerships = lazy(() => import("./pages/GlobalPartnerships/ResearchPartnerships"));
const DualDegrees = lazy(() => import("./pages/GlobalPartnerships/DualDegrees"));
const IndustryPartnerships = lazy(() => import("./pages/GlobalPartnerships/IndustryPartnerships"));
const PartnerWithUs = lazy(() => import("./pages/GlobalPartnerships/PartnerWithUs"));
const PartnershipDetail = lazy(() => import("./pages/GlobalPartnerships/PartnershipDetail"));

// Student Mobility pages
const StudentMobility = lazy(() => import("./pages/StudentMobility/StudentMobility"));
const OutboundMobility = lazy(() => import("./pages/StudentMobility/OutboundMobility"));
const InboundMobility = lazy(() => import("./pages/StudentMobility/InboundMobility"));
const EligibilitySelection = lazy(() => import("./pages/StudentMobility/EligibilitySelection"));
const CreditTransfer = lazy(() => import("./pages/StudentMobility/CreditTransfer"));
const ApplyMobility = lazy(() => import("./pages/StudentMobility/ApplyMobility"));

// Faculty Mobility & Research pages
const FacultyMobility = lazy(() => import("./pages/FacultyMobility/FacultyMobility"));
const VisitingFaculty = lazy(() => import("./pages/FacultyMobility/VisitingFaculty"));
const JointProjects = lazy(() => import("./pages/FacultyMobility/JointProjects"));
const Grants = lazy(() => import("./pages/FacultyMobility/Grants"));
const FacultyAbroad = lazy(() => import("./pages/FacultyMobility/FacultyAbroad"));
const CallForProposals = lazy(() => import("./pages/FacultyMobility/CallForProposals"));

// International Admissions pages
const InternationalAdmissions = lazy(() => import("./pages/InternationalAdmissions/InternationalAdmissions"));
const ProgramsOffered = lazy(() => import("./pages/InternationalAdmissions/ProgramsOffered"));
const AdmissionProcess = lazy(() => import("./pages/InternationalAdmissions/AdmissionProcess"));
const FeesScholarships = lazy(() => import("./pages/InternationalAdmissions/FeesScholarships"));
const VisaFRRO = lazy(() => import("./pages/InternationalAdmissions/VisaFRRO"));

// Higher Studies & Global Opportunities pages
const HigherStudies = lazy(() => import("./pages/HigherStudies/HigherStudies"));
const Scholarships = lazy(() => import("./pages/HigherStudies/Scholarships"));
const LORSupport = lazy(() => import("./pages/HigherStudies/LORSupport"));
const ECTSConversion = lazy(() => import("./pages/HigherStudies/ECTSConversion"));
const AlumniStories = lazy(() => import("./pages/HigherStudies/AlumniStories"));

// International Student Support pages
const StudentSupport = lazy(() => import("./pages/StudentSupport/StudentSupport"));
const PreArrival = lazy(() => import("./pages/StudentSupport/PreArrival"));
const Orientation = lazy(() => import("./pages/StudentSupport/Orientation"));
const HousingDining = lazy(() => import("./pages/StudentSupport/HousingDining"));
const HealthInsurance = lazy(() => import("./pages/StudentSupport/HealthInsurance"));
const CulturalEngagement = lazy(() => import("./pages/StudentSupport/CulturalEngagement"));

// Visits, Delegations & Events pages
const Events = lazy(() => import("./pages/Events/Events"));
const EventDetail = lazy(() => import("./pages/Events/EventDetail"));
const Gallery = lazy(() => import("./pages/Events/Gallery"));

// Resources & Systems pages
const Resources = lazy(() => import("./pages/Resources/Resources"));
const SOPs = lazy(() => import("./pages/Resources/SOPs"));
const FormsDownloads = lazy(() => import("./pages/Resources/FormsDownloads"));
const FAQs = lazy(() => import("./pages/Resources/FAQs"));
const ContactDirectory = lazy(() => import("./pages/Resources/ContactDirectory"));

// News & Media pages
const NewsMedia = lazy(() => import("./pages/NewsMedia/NewsMedia"));
const NewsDetail = lazy(() => import("./pages/NewsMedia/NewsDetail"));

// Search page
const Search = lazy(() => import("./pages/Search"));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#283887]" />
      <p className="text-slate-600">Loading...</p>
    </div>
  </div>
);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
      },
      mutations: {
        retry: false,
      }
    }
  });

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Admin Routes - No Header/Footer */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/contacts" element={<ContactMessages />} />
              {/* Program Routes */}
              <Route path="/admin/programs/new" element={<ProgramFormPage />} />
              <Route path="/admin/programs/edit/:id" element={<ProgramFormPage />} />
              
              {/* News Routes */}
              <Route path="/admin/news/new" element={<NewsFormPage />} />
              <Route path="/admin/news/edit/:id" element={<NewsFormPage />} />
              
              {/* Partnership Routes */}
              <Route path="/admin/partnerships/new" element={<PartnershipFormPage />} />
              <Route path="/admin/partnerships/edit/:id" element={<PartnershipFormPage />} />
              
              {/* Event Routes */}
              <Route path="/admin/events/new" element={<EventFormPage />} />
              <Route path="/admin/events/edit/:id" element={<EventFormPage />} />
              
              {/* Team Member Routes */}
              <Route path="/admin/team/new" element={<TeamMemberFormPage />} />
              <Route path="/admin/team/edit/:id" element={<TeamMemberFormPage />} />
              
              {/* FAQ Routes */}
              <Route path="/admin/faqs/new" element={<FAQFormPage />} />
              <Route path="/admin/faqs/edit/:id" element={<FAQFormPage />} />
              
              {/* Gallery Routes */}
              <Route path="/admin/gallery/new" element={<GalleryFormPage />} />
              <Route path="/admin/gallery/edit/:id" element={<GalleryFormPage />} />
              
              {/* Contact Routes */}
              <Route path="/admin/contacts/new" element={<ContactFormPage />} />
              <Route path="/admin/contacts/edit/:id" element={<ContactFormPage />} />

              {/* Public Routes - With Header, Breadcrumbs, and Footer */}
              <Route
                path="/*"
                element={
                  <>
                    <Header />
                    <Breadcrumbs />
                    <main className="min-h-screen">
                      <Suspense fallback={<LoadingFallback />}>
                        <Routes>
                          {/* Home */}
                          <Route path="/" element={<Home />} />

                          {/* Legacy routes (redirect or keep for compatibility) */}
                          <Route path="/programs" element={<Programs />} />
                          <Route path="/program/:id" element={<ProgramDetail />} />
                          <Route path="/how-it-works" element={<HowItWorks />} />

                          {/* About OIA */}
                          <Route path="/about-oia" element={<AboutOIA />} />
                          <Route path="/about-oia/vision-mission" element={<VisionMission />} />
                          <Route path="/about-oia/strategy" element={<OIAStrategy />} />
                          <Route path="/about-oia/team" element={<OIATeam />} />
                          <Route path="/about-oia/policies" element={<Policies />} />

                          {/* Global Partnerships */}
                          <Route path="/global-partnerships" element={<GlobalPartnerships />} />
                          <Route path="/global-partnerships/research" element={<ResearchPartnerships />} />
                          <Route path="/global-partnerships/dual-degrees" element={<DualDegrees />} />
                          <Route path="/global-partnerships/industry" element={<IndustryPartnerships />} />
                          <Route path="/global-partnerships/partner" element={<PartnerWithUs />} />
                          <Route path="/global-partnerships/:id" element={<PartnershipDetail />} />

                          {/* Student Mobility */}
                          <Route path="/student-mobility" element={<StudentMobility />} />
                          <Route path="/student-mobility/outbound" element={<OutboundMobility />} />
                          <Route path="/student-mobility/inbound" element={<InboundMobility />} />
                          <Route path="/student-mobility/eligibility" element={<EligibilitySelection />} />
                          <Route path="/student-mobility/credit-transfer" element={<CreditTransfer />} />
                          <Route path="/student-mobility/apply" element={<ApplyMobility />} />

                          {/* Faculty Mobility & Research */}
                          <Route path="/faculty-mobility-research" element={<FacultyMobility />} />
                          <Route path="/faculty-mobility-research/visiting" element={<VisitingFaculty />} />
                          <Route path="/faculty-mobility-research/projects" element={<JointProjects />} />
                          <Route path="/faculty-mobility-research/grants" element={<Grants />} />
                          <Route path="/faculty-mobility-research/abroad" element={<FacultyAbroad />} />
                          <Route path="/faculty-mobility-research/proposals" element={<CallForProposals />} />

                          {/* International Admissions */}
                          <Route path="/international-admissions" element={<InternationalAdmissions />} />
                          <Route path="/international-admissions/programs" element={<ProgramsOffered />} />
                          <Route path="/international-admissions/process" element={<AdmissionProcess />} />
                          <Route path="/international-admissions/fees" element={<FeesScholarships />} />
                          <Route path="/international-admissions/visa" element={<VisaFRRO />} />

                          {/* Higher Studies & Global Opportunities */}
                          <Route path="/higher-studies-opportunities" element={<HigherStudies />} />
                          <Route path="/higher-studies-opportunities/scholarships" element={<Scholarships />} />
                          <Route path="/higher-studies-opportunities/lor" element={<LORSupport />} />
                          <Route path="/higher-studies-opportunities/ects" element={<ECTSConversion />} />
                          <Route path="/higher-studies-opportunities/alumni" element={<AlumniStories />} />

                          {/* International Student Support */}
                          <Route path="/international-student-support" element={<StudentSupport />} />
                          <Route path="/international-student-support/pre-arrival" element={<PreArrival />} />
                          <Route path="/international-student-support/orientation" element={<Orientation />} />
                          <Route path="/international-student-support/housing" element={<HousingDining />} />
                          <Route path="/international-student-support/health" element={<HealthInsurance />} />
                          <Route path="/international-student-support/cultural" element={<CulturalEngagement />} />

                          {/* Visits, Delegations & Events */}
                          <Route path="/visits-delegations-events" element={<Events />} />
                          <Route path="/visits-delegations-events/gallery" element={<Gallery />} />
                          <Route path="/visits-delegations-events/:id" element={<EventDetail />} />

                          {/* Resources & Systems */}
                          <Route path="/resources-systems" element={<Resources />} />
                          <Route path="/resources-systems/sops" element={<SOPs />} />
                          <Route path="/resources-systems/forms" element={<FormsDownloads />} />
                          <Route path="/resources-systems/faqs" element={<FAQs />} />
                          <Route path="/resources-systems/contacts" element={<ContactDirectory />} />

                          {/* News & Media */}
                          <Route path="/news-media" element={<NewsMedia />} />
                          <Route path="/news-media/:id" element={<NewsDetail />} />

                          {/* Contact */}
                          <Route path="/contact" element={<Contact />} />

                          {/* Search */}
                          <Route path="/search" element={<Search />} />

                          {/* Dev Team */}
                          <Route path="/dev-team" element={<DevTeam />} />

                          {/* 404 - Redirect to home with search */}
                          <Route
                            path="*"
                            element={
                              <div className="min-h-screen flex items-center justify-center px-4">
                                <div className="text-center max-w-md">
                                  <h1 className="text-4xl font-bold text-[#283887] mb-4">404</h1>
                                  <p className="text-slate-600 mb-6">Page not found. The page you're looking for doesn't exist.</p>
                                  <a href="/" className="inline-block px-6 py-3 bg-[#283887] text-white rounded-lg hover:bg-[#283887]/90 transition-colors">
                                    Return to Home
                                  </a>
                                </div>
                              </div>
                            }
                          />
                        </Routes>
                      </Suspense>
                    </main>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
        {/* Load React Query Devtools dynamically if available (optional dependency) */}
        <ReactQueryDevtoolsLoader />
      </QueryClientProvider>
    </div>
  );
}

export default App;

// Optional dynamic loader for react-query devtools to avoid hard dependency
function ReactQueryDevtoolsLoader() {
  const [Devtools, setDevtools] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    // Only attempt to load the React Query Devtools in development.
    // This avoids runtime/compile problems when the optional package is not installed
    // (and keeps production bundles free of devtools).
    if (process.env.NODE_ENV === 'development') {
      import('@tanstack/react-query-devtools')
        .then((mod) => {
          const Comp = mod.ReactQueryDevtools || mod.default;
          if (mounted && Comp) setDevtools(() => Comp);
        })
        .catch(() => {
          // devtools not installed; silently ignore
        });
    }
    return () => {
      mounted = false;
    };
  }, []);

  if (!Devtools) return null;
  return <Devtools initialIsOpen={false} />;
}
