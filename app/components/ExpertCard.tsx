import React from 'react';

interface ExpertCardProps {
  name: string;
  image: string;
  barCouncilId: string;
  experience: number;
  casesFought: number;
  expertise: string;
  price: number;
}

const ExpertCard: React.FC<ExpertCardProps> = ({
  name,
  image,
  barCouncilId,
  experience,
  casesFought,
  expertise,
  price,
}) => {
  return (
    <div className="border rounded-lg shadow-md p-4 w-full max-w-sm">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-xl font-semibold mt-2">{name}</h2>
      <p className="text-gray-600">Bar Council ID: {barCouncilId}</p>
      <p className="text-gray-600">Experience: {experience} years</p>
      <p className="text-gray-600">Cases Fought: {casesFought}</p>
      <p className="text-gray-600">Expertise: {expertise}</p>
      <p className="text-green-700 font-bold mt-2">₹{price}</p>
    </div>
  );
};

export default ExpertCard;
