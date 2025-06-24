"use client";
import React from 'react'
import Banner from './components/Banner'

import Filters from './components/Filters'

import Footer from './components/Footer'
import ExpertCard from './components/ExpertProfiles';

const page = () => {
  return (
    <div>

<div>
<Banner />
      <Filters />
      
</div>

<Footer />

    </div>
  )
}

export default page 