import React, { useEffect, useState } from "react";

const DataView = ({darkMode}) => {
 
  return (
    <div className="container mx-auto w-19/20 font-sans leading-relaxed">
      <h1 className="text-3xl font-bold pb-2 border-b-2 mb-5">Sentiment Analysis in NLP</h1>
      <p className="mb-4">
        Sentiment Analysis, or opinion mining, is an NLP technique used to identify the emotional tone within text. It involves categorizing sentiments as either positive or negative.
      </p>

      {/* Positive Sentiment Example */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Positive Sentiment Example</h2>
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} p-4 rounded-md my-4`}>
          <p>
          "I absolutely love the XYZ Smartwatch! The smartwatch is stylish and easy to use. The fitness tracking features are fantastic, and I love that the battery lasts over a week. The customer service was also very helpful when I had questions. I highly recommend this smartwatch!"
          </p>
        </div>
        <div className="text-center mt-4">
          <h3 className="text-lg font-semibold mb-3">Word Cloud (Positive Sentiment)</h3>
          <img src="/case-studies/case4/positive_wordcloud.png" alt="Word Cloud for Positive Sentiment" className="mx-auto w-3/4 rounded-md" />
          <p className="mt-2">Word cloud visualizing the positive sentiment from the review.</p>
        </div>
        <div className="text-center mt-6">
          <h3 className="text-lg font-semibold mb-2">Frequency Bar Chart (Positive Sentiment)</h3>
          <img src="/case-studies/case4/positive_bar_chart.png" alt="Frequency Bar Chart for Positive Sentiment" className="mx-auto w-3/4 rounded-md" />
          <p className="mt-2">Frequency bar chart showing word frequencies from the positive review.</p>
        </div>
      </div>

      {/* Positive Movie Review Examples */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Positive Movie Review Examples</h2>

        
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} p-4 rounded-md my-4`}>
        <p>"I absolutely loved the movie Incredible Adventures! The storyline was engaging, and the characters were well-developed. The visuals were stunning, and I loved the soundtrack. Overall, it's a movie I highly recommend to anyone looking for an exciting experience!"</p>
        </div>
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} p-4 rounded-md my-4`}>
        <p>"I truly enjoyed Epic Journey! The storytelling was captivating, and I loved the performances by the cast. The visuals were breathtaking, and the soundtrack really enhanced the emotional moments. This is definitely a movie I would recommend to friends!"</p>
        </div>
      </div>

      {/* Negative Sentiment Example */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Negative Sentiment Example</h2>
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} p-4 rounded-md my-4`}>
          <p>
          "I was really disappointed with my visit to ABC Restaurant. We waited too long to be seated, and then the food took forever to arrive. My pasta was cold, and the service was poor. The manager didn’t address our concerns, which was frustrating. I won’t be coming back to this restaurant."
          </p>
        </div>
        <div className="text-center mt-4">
          <h3 className="text-lg font-semibold mb-2">Word Cloud (Negative Sentiment)</h3>
          <img src="/case-studies/case4/negative_wordcloud.png" alt="Word Cloud for Negative Sentiment" className="mx-auto w-3/4 rounded-md" />
          <p className="mt-2">Word cloud visualizing the negative sentiment from the review.</p>
        </div>
        <div className="text-center mt-6">
          <h3 className="text-lg font-semibold mb-2">Frequency Bar Chart (Negative Sentiment)</h3>
          <img src="/case-studies/case4/negative_bar_chart.png" alt="Frequency Bar Chart for Negative Sentiment" className="mx-auto w-3/4 rounded-md" />
          <p className="mt-2">Frequency bar chart showing word frequencies from the Negative review.</p>
        </div>
      </div>

      {/* Negative Movie Review Examples */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Negative Movie Review Examples</h2>
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} p-4 rounded-md my-4`}>
          <p>"I was really disappointed with Mystery Unraveled. The plot was slow, and the characters felt flat. I found myself losing interest halfway through the movie. The ending was predictable, and I won't be recommending this film to anyone."</p>
        </div>
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} p-4 rounded-md my-4`}>
          <p>"I was quite let down by Chasing Shadows. The pacing was slow, and the plot was confusing. I didn’t connect with the characters at all, and the ending felt rushed. I can't recommend this movie to anyone looking for a good experience."</p>
        </div>
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} p-4 rounded-md my-4`}>
          <p>"The movie is no good!"</p>
        </div>
      </div>

      {/* Example Sentiment Comparison */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Example Sentiment Comparison</h2>
        <p><strong>Positive:</strong> "Overall, the movie was good and did leave a lasting impression."</p>
        <p><strong>Negative:</strong> "Overall, the movie was good and didn't leave a lasting impression."</p>
      </div>

      {/* Try It Yourself Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Try It Yourself!</h2>
        <p>Feel free to play around with a few examples and explore how sentiment analysis works on different types of reviews or texts!</p>
      </div>
    </div>
  );
};

export default DataView;