// pages/lawyer-register.tsx
'use client';

import React, { useState } from 'react';
import { db, storage } from '../../lib/firebaseConfig'; // Adjusted path to firebaseConfig
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function LawyerRegister() {
  const [formData, setFormData] = useState({
    name: '',
    barCouncilId: '',
    experience: '',
    casesFought: '',
    expertise: '',
    price: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (imageFile) {
        const imageRef = ref(storage, `lawyers/${formData.barCouncilId}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, 'lawyers'), {
        ...formData,
        experience: Number(formData.experience),
        casesFought: Number(formData.casesFought),
        price: Number(formData.price),
        image: imageUrl,
      });

      alert('Registered successfully!');
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto">
      <input placeholder="Name" onChange={e => setFormData({ ...formData, name: e.target.value })} required />
      <input placeholder="Bar Council ID" onChange={e => setFormData({ ...formData, barCouncilId: e.target.value })} required />
      <input placeholder="Experience" type="number" onChange={e => setFormData({ ...formData, experience: e.target.value })} required />
      <input placeholder="Cases Fought" type="number" onChange={e => setFormData({ ...formData, casesFought: e.target.value })} required />
      <input placeholder="Expertise" onChange={e => setFormData({ ...formData, expertise: e.target.value })} required />
      <input placeholder="Price" type="number" onChange={e => setFormData({ ...formData, price: e.target.value })} required />
      <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
      <button type="submit" className="bg-blue-600 text-white p-2 mt-4">Submit</button>
    </form>
  );
}
