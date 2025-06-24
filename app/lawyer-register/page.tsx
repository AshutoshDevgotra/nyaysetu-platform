'use client'

import React, { useState } from 'react'
import { db } from '@/lib/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

const LawyerRegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    barCouncilId: '',
    experience: '',
    caseTypes: '',
    pricePerAppearance: '',
    court: '',
    state: '',
    image: null as File | null,
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: any) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      let imageUrl = ''
      if (formData.image) {
        const storage = getStorage()
        const imageRef = ref(storage, `lawyers/${uuidv4()}`)
        await uploadBytes(imageRef, formData.image)
        imageUrl = await getDownloadURL(imageRef)
      }

      await addDoc(collection(db, 'lawyers'), {
        ...formData,
        image: imageUrl,
        createdAt: new Date(),
      })

      setSuccess(true)
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        barCouncilId: '',
        experience: '',
        caseTypes: '',
        pricePerAppearance: '',
        court: '',
        state: '',
        image: null,
      })
    } catch (error) {
      console.error('Error submitting lawyer:', error)
    }
    setLoading(false)
  }

  return (
    <div className="bg-black min-h-screen py-12 px-4 sm:px-8 text-white">
      <div className="max-w-4xl mx-auto bg-[#111] p-8 rounded-xl shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-gold">Register as an Advocate</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input className="input" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
          <input className="input" name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" required />
          <input className="input" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
          <input className="input" name="barCouncilId" value={formData.barCouncilId} onChange={handleChange} placeholder="Bar Council ID" required />
          <input className="input" name="experience" value={formData.experience} onChange={handleChange} placeholder="Years of Experience" required />
          <input className="input" name="caseTypes" value={formData.caseTypes} onChange={handleChange} placeholder="Case Type Expertise (e.g., Civil, Family)" required />
          <input className="input" name="pricePerAppearance" value={formData.pricePerAppearance} onChange={handleChange} placeholder="Price per Court Appearance (INR)" required />
          <input className="input" name="court" value={formData.court} onChange={handleChange} placeholder="Court Name" required />
          <input className="input" name="state" value={formData.state} onChange={handleChange} placeholder="State" required />

          {/* Profile Photo Upload */}
          <div>
            <label className="block mb-1 text-sm">Profile Image</label>
            <input className="file-input text-white" type="file" name="image" accept="image/*" onChange={handleChange} required />
          </div>

          <div className="sm:col-span-2 flex justify-center">
            <button type="submit" disabled={loading} className="bg-gold hover:bg-yellow-500 transition px-6 py-3 text-black font-semibold rounded">
              {loading ? 'Submitting...' : 'Submit Profile'}
            </button>
          </div>

          {success && (
            <p className="sm:col-span-2 text-green-500 text-center mt-4">
              Profile submitted successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default LawyerRegisterPage
