import React from 'react';
import { useStaticContentByKey } from '../../hooks/useOIAData';
import { Helmet } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const VisionMission = () => {
  const { data: content, isLoading } = useStaticContentByKey('vision_mission');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#283887]" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Vision & Mission | About OIA - Medicaps University</title>
      </Helmet>
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div>
              <h1 className="text-3xl font-bold text-[#283887] mb-6">Our Vision (OIA)</h1>
              <div className="space-y-6">
                <section>
                  <p className="text-slate-600">
                    As the world continues to grow, so do the international opportunities for our students at Medicaps
                    University. Through the OlA we care for relationships that drive innovation, fuel globally recognized
                    academic research, and create life-changing opportunities for students, faculty, and staff.
                    These international connections are not just partnerships, they are pathways to a future where our
                    students can dream bigger, explore farther, and grow in ways that only global exposure can offer. Our
                    vision extends beyond academics, Medicaps is committed to fostering a culture of diversity and new
                    opportunities to celebrate new avenues of inclusion, collaboration, and interaction.
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Support</h2>
                  <p className="text-slate-600 mb-4">Here's how OlA helps you on your global trip</p>
                  <ul className="list-disc list-inside space-y-3 text-slate-600">
                    <li><strong>Pre-Departure Guidance:</strong> We provide extensive information and preparation for students
                    traveling overseas. Our pre-departure orientations address important issues including travel
                    plans, cultural adjustment, academic expectations, and visa procedures, ensuring that
                    students are fully prepared for their worldwide adventure.</li>
                    <li><strong>Academic and Career Guidance:</strong> Our staff assists students in aligning their worldwide
                    experiences with their academic and career objectives. Whether it's choosing the right
                    exchange program, arranging a research project, or locating overseas internships, we offer
                    personalized help to ensure that their global experience adds value to their education and
                    future jobs.</li>
                    <li><strong>Visa and Documentation Assistance:</strong> Navigating the visa and documentation process can be
                    difficult, but with our specialized support team, students can get help with visa applications,
                    necessary paperwork, and understanding the legal requirements for studying or working
                    overseas.</li>
                    <li><strong>Cultural Integration Support:</strong> Adjusting to life in a new country can be intimidating which is
                    why we offer ongoing assistance to make students feel comfortable and integrated. From
                    language support to social events, we make sure students have everything they need to
                    flourish in a new cultural environment.</li>
                    <li><strong>On-Site Support:</strong> For students studying abroad through exchange programs or internships, we
                    maintain strong connections with our partner institutions to provide on-the-ground support.
                    Our network of contacts at international universities helps ensure students have the resources
                    they need while overseas, from academic support to personal guidance.</li>
                    <li><strong>Post-Return Counseling and Networking:</strong> Our assistance does not finish after students return
                    home. We provide counseling to help students integrate their worldwide experiences into their
                    academic and professional life. We also enable alumni networks, allowing returning
                    students to maintain contact with friends and mentors they met throughout their abroad
                    adventures.</li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Dual Degree Programs</h2>
                  <p className="text-slate-600">
                    What if you could earn two degrees, one from Medicaps University and another from a prestigious
                    international institution? With our dual degree programs, that's exactly what you can do. We've
                    teamed up with world-class institutions like Southern Methodist University (USA), Alma College
                    (USA), and DPU (Thailand) to offer you the chance to explore different academic worlds, gain a
                    broader perspective, and graduate with credentials that will open doors anywhere.
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Student Exchange Programs</h2>
                  <p className="text-slate-600">
                    Imagine learning in a classroom with students from different countries and cultures. Our exchange
                    programs provide semester and year-long opportunities with colleges worldwide and are designed to provide
                    you with an intensive cultural and intellectual experience that will last a lifetime.
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Study Abroad Programs</h2>
                  <p className="text-slate-600">
                    Your dream of studying abroad can become a reality. Through partnerships with international
                    organizations like IDP and ETS India, we provide our students with the chance to pursue higher
                    education opportunities abroad. This is more than just a chance to study in a new country—it's
                    a journey of self-discovery, where you'll grow not just as a student, but as a global citizen, ready to
                    take on the challenges of a connected world.
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Workshops and Seminars</h2>
                  <p className="text-slate-600">
                    Global education is not just about the classroom, it's about experiencing the world through different
                    perspectives. We organize workshops, seminars, and guest lectures that focus on cultural
                    diversity and international opportunities. These events are designed to help you gain new insights,
                    learn from global experts, and prepare for a world that thrives on cross-cultural understanding. It's
                    about more than just knowledge, it's about embracing the richness of the world around you.
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Research and Development Collaboration</h2>
                  <p className="text-slate-600">
                    Innovation doesn't have borders. Our research collaborations with international institutions push the
                    boundaries of academic excellence. Through joint research programs, we aim to make a
                    meaningful impact on the world, developing solutions to global challenges and fostering
                    innovation that goes beyond the traditional classroom. When you join Medicaps, you're not just
                    contributing to academic progress, you're part of a global movement to create change.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisionMission;


