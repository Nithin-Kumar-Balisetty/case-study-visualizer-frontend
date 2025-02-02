import React from "react";
import { Link } from "react-router-dom";

const CaseCard = ({ study }) => {
  return (
    <Link
      to={`/case-study/${study.id}`}
      className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-all duration-300 flex flex-col items-center"
    >
      <img
        src={study.thumbnail_url}
        alt={study.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800">{study.title}</h2>
      <p className="text-gray-600 text-sm text-center">{study.summary}</p>
    </Link>
  );
};

export default CaseCard;