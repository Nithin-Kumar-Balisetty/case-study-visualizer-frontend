import React, { useEffect, useState } from "react";

const DataView = ({darkMode}) => {
 
  return (
    <div className="container mx-auto w-19/20 font-sans leading-relaxed">
      <h1 className="text-3xl mb-5 font-bold pb-2 border-b-1">Automatic Text Summarization in NLP</h1>
      <p className="mb-4">
        Automatic text summarization in NLP condenses long texts while preserving key information. Though less discussed than other ML advancements, it continues to improve, aiding industries like banking, law, and healthcare. There are two main types: Extractive and Abstractive Summarization.
      </p>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-3">Extractive Summarization</h2>
        <p>
          Extractive summarization is a natural language processing technique that involves selecting and extracting key sentences or phrases from a text to create a concise summary. It focuses on identifying the most important parts of the original content without altering the wording.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Abstractive Summarization</h2>
        <p>
          Abstractive summarization is a natural language processing approach that generates a concise summary by rephrasing and synthesizing the main ideas from the original text. Unlike extractive summarization, which selects existing sentences, abstractive summarization creates new sentences that capture the essence of the content.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Example to Showcase Abstractive and Extractive Summarization</h2>
        <h3 className="font-semibold mb-3 text-lg">Sample Text (114 words)</h3>
        <div className={(darkMode ? 'bg-gray-800' : 'bg-gray-200' ) + " p-4 rounded-md my-4"}>
          <p>
            Our company has seen a 25% growth in customer engagement over the past quarter, primarily due to targeted email campaigns. Social media interactions increased by 30%, and our paid ad campaigns on Google have contributed to a 15% boost in website traffic. We’ve also expanded our product offerings, introducing a new line that has been well-received by customers. Customer satisfaction ratings have improved by 10%, and our retention rate has reached an all-time high of 85%. Additionally, partnerships with influencers have enhanced brand visibility and credibility. The next quarter will focus on further expanding our digital marketing strategies and optimizing user experience on mobile platforms. We expect continued growth as we implement these strategies.
          </p>
        </div>

        <h3 className="font-semibold text-lg">Extracted Summary (76 words)</h3>
        <div className={(darkMode ? 'bg-gray-800' : 'bg-gray-200' ) + " p-4 rounded-md my-4"}>
          <p>
            Our company has seen a 25% growth in customer engagement over the past quarter, primarily due to targeted email campaigns. Customer satisfaction ratings have improved by 10%, and our retention rate has reached an all-time high of 85%. Additionally, partnerships with influencers have enhanced brand visibility and credibility. The next quarter will focus on further expanding our digital marketing strategies and optimizing user experience on mobile platforms. We expect continued growth as we implement these strategies.
          </p>
        </div>

        <h3 className="font-semibold text-lg">Abstracted Summary (56 words)</h3>
        <div className={(darkMode ? 'bg-gray-800' : 'bg-gray-200' ) + " p-4 rounded-md my-4"}>
          <p>
            Our company has seen a 25% growth in customer engagement over the past quarter. Social media interactions increased by 30%, and our paid ad campaigns on Google have contributed to a 15% boost in website traffic. Customer satisfaction ratings have improved by 10%, and retention rate has reached an all-time high of 85%.
          </p>
        </div>

        <h3 className="font-semibold text-lg">Similarity Score</h3>
          <div className={(darkMode ? 'bg-gray-800' : 'bg-gray-200' ) + " p-4 my-4"}>
            <p>Similarity score for Extracted summary and Abstracted summary – <span className="font-semibold text-lg">73.70%</span></p>
          </div>
      </div>
    </div>
  );
};

export default DataView;