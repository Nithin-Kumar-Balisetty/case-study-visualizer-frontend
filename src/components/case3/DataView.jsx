import React, { useEffect, useState } from "react";

const DataView = ({darkMode}) => {
 
  return (
    <div className="container mx-auto w-19/20 font-sans leading-relaxed">
      <h1 className="text-3xl mb-5 font-bold pb-2 border-b-1">Data Types, Text Mining, and SMS Spam Classification</h1>
      
      {/* Data Section */}
      <section className="mb-8">
        <h2 className="text-2xl mb-2 font-semibold">Data</h2>
        <p>Data refers to raw facts, figures, or information collected for analysis, processing, or reference. It can exist in various forms, including text, images, audio, or numerical values.</p>
        <div className={(darkMode ? 'bg-gray-800' : 'bg-gray-200') + " p-4 rounded-md my-4"}>
          <p><strong>Example:</strong> The data below illustrates the monthly retail store sales trend in the USA.</p>
          <img src="/case-studies/case3/retail_sales_trend.jpg" alt="Monthly Retail Store Sales Trend" className="my-4 w-3/4" />
        </div>
        <div className={(darkMode ? 'bg-gray-800' : 'bg-gray-200') + " p-4 rounded-md my-4"}>
          <p><strong>Example:</strong> This data represents a customer's review of an iPad.</p>
          <img src="/case-studies/case3/ipad_review.jpg" alt="iPad Customer Review" className="my-4 w-3/4" />
        </div>
      </section>
      
      {/* Structured Data Section */}
      <section className="mb-8">
        <h2 className="text-2xl mb-2 font-semibold">Structured Data</h2>
        <p>Structured data refers to information that is systematically organized in a predefined format, typically in rows and columns. This format ensures ease of storage, searchability, and analysis. Structured data is commonly stored in relational databases, spreadsheets, and structured file formats such as CSV and JSON.</p>
        <div className={(darkMode ? 'bg-gray-800' : 'bg-gray-200') + " p-4 rounded-md my-4"}>
          <p><strong>Example:</strong> The <code>Boston.csv</code> dataset, which contains structured tabular data used for housing price analysis.</p>
          <img src="/case-studies/case3/boston_csv_example.jpg" alt="Boston CSV Dataset" className="my-4 w-3/4" />
        </div>
        <div className={(darkMode ? 'bg-gray-800' : 'bg-gray-200') + " p-4 rounded-md my-4"}>
          <p><strong>Example:</strong> An employee database with fields like id, name, month_of_birth, and address stored in a relational database is an example of structured data.</p>
          <img src="/case-studies/case3/employee_database_example.jpg" alt="Employee Database" className="my-4 w-3/4" />
        </div>
      </section>
      
      {/* Unstructured Data Section */}
      <section className="mb-8">
        <h2 className="text-2xl mb-2 font-semibold">Unstructured Data</h2>
        <p>Unstructured data is information that doesn’t have a predefined format or organized structure. Some examples are customer reviews, Tweets X, social media texts with hashtag texts, etc.</p>
        <div className={(darkMode ? 'bg-gray-800' : 'bg-gray-200') + " p-4 rounded-md my-4"}>
          <p><strong>Example:</strong> The email is unstructured because it has no formal format, lists, or clear sections. The information is free-form and conversational.</p>
          <img src="/case-studies/case3/unstructured_email_example.jpg" alt="Unstructured Email" className="my-4 w-3/4" />
        </div>

        <div className={(darkMode ? 'bg-gray-800' : 'bg-gray-200') + " p-4 rounded-md my-4"}>
          <p><strong>Example:</strong> Photos without any metadata, such as when a photo is displayed and questions are asked about it. From the image, we can deduce titles like "Mountain Sunrise," "Mountain Sunset," "Morning Light," and "Golden Hour in the Highlan</p>
          <img src="/case-studies/case3/mountain_photos_example.jpg" alt="Mountain Sunrise and Sunset Photos" className="my-4 w-3/4"/>
        </div>
      </section>
      
      {/* Text Mining Section */}
      <section className="mb-8">
        <h2 className="text-2xl mb-2 font-semibold">Text Mining</h2>
        <p>Text mining is a part of data mining that focuses on analyzing unstructured text data. It uses natural language processing (NLP) to extract useful information and insights from large text datasets. Text mining can be used on its own or as a preprocessing step for data mining.</p>
        <div className={(darkMode ? 'bg-gray-800' : 'bg-gray-200') + " p-4 rounded-md my-4"}>
          <p><strong>Example:</strong> An example is spam classification, where text mining can be used to distinguish between spam and non-spam messages.</p>
        </div>
      </section>
      
      {/* SMS Spam Classification Section */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-6">SMS Spam Classification</h1>
        <p>SMS Spam Classification involves distinguishing between unwanted or irrelevant messages (spam) and useful messages (ham). It forms a binary classification problem.</p>
        
        <h3 className="font-semibold mt-3 mb-3 text-lg">Spam Example</h3>
        <div className={(darkMode ? 'bg-gray-800' : 'bg-gray-200') + " p-4 rounded-md my-4"}>
          <p>"Congratulations! You've won a $1,000 gift card! Click here to claim your gift card."</p>
        </div>

        <div className="text-center mt-6">
          <h3 className="text-lg font-semibold mb-2">Word Cloud (Spam Message)</h3>
          <img src="/case-studies/case3/spam_wordcloud.png" alt="Word Cloud for Spam Message" className="mx-auto w-3/4 rounded-md" />
          <p className="mt-2">Word cloud visualizing the spam message based on frequent words.</p>
        </div>

        <div className="text-center mt-6">
            <h3 className="text-lg font-semibold mb-2">Frequency Bar Chart (Spam Message)</h3>
            <img src="/case-studies/case3/spam_bar_chart.png" alt="Frequency Bar Chart for Spam Message" className="mx-auto w-3/4 rounded-md" />
            <p className="mt-2">Frequency bar chart showing the word frequencies in the spam message.</p>
        </div>

        <h3 className="font-semibold mt-3 mb-3 text-lg">Spam Message Examples</h3>
        <div className="pl-4 my-4 ml-2">
          <ol className="list-decimal">
            <li>"Congratulations! You've won a $1,000 gift card! Click here to claim your gift card."</li>
            <li>"You have an unclaimed lottery prize of $10,000. Contact us at winner@lottery.com."</li>
          </ol>
        </div>

        <h3 className="font-semibold mt-3 mb-3 text-lg">Ham Example</h3>
        <div className={(darkMode ? 'bg-gray-800' : 'bg-gray-200') + " p-4 rounded-md my-4"}>
          <p>"Welcome to our monthly newsletter! Here are some updates on our latest products."</p>
        </div>

        <div className="text-center mt-6">
            <h3 className="text-lg font-semibold mb-2">Word Cloud (Ham Message)</h3>
            <img src="/case-studies/case3/ham_wordcloud.png" alt="Word Cloud for Ham Message" className="mx-auto w-3/4 rounded-md" />
            <p className="mt-2">Word cloud visualizing the ham message based on frequent words.</p>
        </div>

        <div className="text-center mt-6">
            <h3 className="text-lg font-semibold mb-2">Frequency Bar Chart (Ham Message)</h3>
            <img src="/case-studies/case3/ham_bar_chart.png" alt="Frequency Bar Chart for Ham Message" className="mx-auto w-3/4 rounded-md" />
            <p className="mt-2">Frequency bar chart showing the word frequencies in the ham message.</p>
        </div>

        <h3 className="font-semibold mt-3 mb-3 text-lg">Ham Message Examples</h3>
        <div className="pl-4 my-4 ml-2">
          <ol className="list-decimal">
            <li>"Hey! Just wanted to check in and see how you’re doing."</li>
            <li>"Thank you for reaching out! We’ve received your request and will get back to you shortly."</li>
          </ol>
        </div>

      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Example Message Comparison</h2>
        <div className={(darkMode ? 'bg-gray-800' : 'bg-gray-200') + " p-4 rounded-md my-4"}>
          <p><strong>Spam:</strong> "Congratulations! You've won a $1,000 gift card! Click here to claim your gift card."</p>
          <p><strong>Ham:</strong> "Hey! Just wanted to check in and see how you’re doing."</p>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Try It Yourself!</h2>
        <p>Test your own text messages to see if they are spam or ham!</p>
      </section>
    </div>
  );
};

export default DataView;