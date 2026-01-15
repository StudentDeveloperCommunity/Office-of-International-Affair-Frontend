import React from 'react';
import { Helmet } from 'react-helmet-async';

const InboundMobility = () => {
  return (
    <>
      <Helmet>
        <title>Inbound Programs | Student Mobility - OIA</title>
      </Helmet>
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#283887] mb-4">Inbound Programs</h1>
          <p className="text-xl text-slate-600 mb-8">
            Information for international students coming to Medicaps University.
          </p>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <p className="text-slate-600">Content coming soon...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InboundMobility;


