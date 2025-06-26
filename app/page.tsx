"use client";
import React from 'react'
import Banner from './components/Banner'
import Filters from './components/Filters'
import Footer from './components/Footer'
import ExpertProfiles from './components/ExpertProfiles'


const page = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Banner />
      <Filters />
      <ExpertProfiles />
      <Footer />
    </div>
  )
}

export default page