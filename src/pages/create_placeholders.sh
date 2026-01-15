#!/bin/bash
# Create placeholder pages for remaining routes

create_placeholder() {
  local file=$1
  local title=$2
  local dir=$(dirname "$file")
  mkdir -p "$dir"
  cat > "$file" << EOF
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Component = () => {
  return (
    <>
      <Helmet>
        <title>${title} | OIA - Medi-Caps University</title>
      </Helmet>
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">${title}</h1>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <p className="text-slate-600">Content coming soon...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
EOF
}

# Faculty Mobility
create_placeholder "FacultyMobility/FacultyMobility.jsx" "Faculty Mobility & Research"
create_placeholder "FacultyMobility/VisitingFaculty.jsx" "Visiting Faculty"
create_placeholder "FacultyMobility/JointProjects.jsx" "Joint Projects"
create_placeholder "FacultyMobility/Grants.jsx" "Grants"
create_placeholder "FacultyMobility/FacultyAbroad.jsx" "Faculty Abroad"
create_placeholder "FacultyMobility/CallForProposals.jsx" "Call for Proposals"

# International Admissions
create_placeholder "InternationalAdmissions/InternationalAdmissions.jsx" "International Admissions"
create_placeholder "InternationalAdmissions/ProgramsOffered.jsx" "Programs Offered"
create_placeholder "InternationalAdmissions/AdmissionProcess.jsx" "Admission Process"
create_placeholder "InternationalAdmissions/FeesScholarships.jsx" "Fees & Scholarships"
create_placeholder "InternationalAdmissions/VisaFRRO.jsx" "Visa & FRRO"

# Higher Studies
create_placeholder "HigherStudies/HigherStudies.jsx" "Higher Studies & Global Opportunities"
create_placeholder "HigherStudies/Scholarships.jsx" "Scholarships"
create_placeholder "HigherStudies/LORSupport.jsx" "LOR Support"
create_placeholder "HigherStudies/ECTSConversion.jsx" "ECTS Conversion"
create_placeholder "HigherStudies/AlumniStories.jsx" "Alumni Stories"

# Student Support
create_placeholder "StudentSupport/StudentSupport.jsx" "International Student Support"
create_placeholder "StudentSupport/PreArrival.jsx" "Pre-arrival"
create_placeholder "StudentSupport/Orientation.jsx" "Orientation"
create_placeholder "StudentSupport/HousingDining.jsx" "Housing & Dining"
create_placeholder "StudentSupport/HealthInsurance.jsx" "Health & Insurance"
create_placeholder "StudentSupport/CulturalEngagement.jsx" "Cultural Engagement"

# Resources
create_placeholder "Resources/Resources.jsx" "Resources & Systems"
create_placeholder "Resources/SOPs.jsx" "OIA SOPs"
create_placeholder "Resources/FormsDownloads.jsx" "Forms & Downloads"
create_placeholder "Resources/FAQs.jsx" "FAQs"
create_placeholder "Resources/ContactDirectory.jsx" "Contact Directory"

# Global Partnerships sub-pages
create_placeholder "GlobalPartnerships/ResearchPartnerships.jsx" "Research Partnerships"
create_placeholder "GlobalPartnerships/DualDegrees.jsx" "Dual/Joint Degrees"
create_placeholder "GlobalPartnerships/IndustryPartnerships.jsx" "Industry/Embassy Partnerships"
create_placeholder "GlobalPartnerships/PartnerWithUs.jsx" "Partner with Us"

echo "Placeholder pages created successfully!"
