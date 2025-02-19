import React, { useEffect, useState } from "react";

const DataView = ({darkMode}) => {
 
  const intents = [
    { 
      name: "Cancel Order (cancel_order)",
      purpose: "Recognize when a customer wants to cancel an order.",
      examples: [
        "I need to cancel my order immediately.",
        "Can you help me with canceling my recent purchase?"
      ],
      response: "Sure, I can assist you with canceling your order. Please let me know the order details or reference number for smoother processing."
    },
    { 
      name: "Change Order (change_order)",
      purpose: "Identify when a customer wants to modify an existing order.",
      examples: [
        "I ordered the wrong product. Can I change it?",
        "How do I update my order details?"
      ],
      response: "Absolutely, I can help you adjust your order. Could you please specify which items you'd like to add or remove?"
    },
    { 
      name: "Change Shipping Address (change_shipping_address)",
      purpose: "Detect when a user wants to update their delivery address.",
      examples: [
        "I need to update my shipping address before my order is dispatched.",
        "Can I change the delivery location for my package?"
      ],
      response: "I can certainly guide you through changing your shipping address. Could you please provide me with your current and desired shipping addresses for accuracy?"
    },
    { 
      name: "Check Cancellation Fee (check_cancellation_fee)",
      purpose: "Inform customers about potential cancellation fees.",
      examples: [
        "Will I be charged if I cancel my order?",
        "What’s the cancellation policy for my purchase?"
      ],
      response: "I can definitely assist you with understanding the cancellation fees. Could you please provide me with the details of your transaction or service for accurate guidance?"
    },
    { 
      name: "Check Invoice (check_invoice)",
      purpose: "Assist customers in retrieving their invoice.",
      examples: [
        "How can I download my invoice?",
        "Can you send me a copy of my purchase receipt?"
      ],
      response: "I can certainly assist you with locating your invoice. Could you please provide me with the details of your purchase, such as the date or order number, for accurate guidance?"
    },
    { 
      name: "Get Refund (get_refund)",
      purpose: "Help customers initiate a refund request.",
      examples: [
        "I need a refund for my order.",
        "How do I get my money back?"
      ],
      response: "The refund policy is clearly mentioned in our company portal. Please have a look at our home page."
    },
    {
      "name": "newsletter_subscription",
      purpose: "Managing newsletter sign-ups and subscriptions.",
      "examples": [],
      "response": ""
    },
    {
      "name": "payment_issue",
      purpose: "Addressing issues related to payments and transactions.",
      "examples": [],
      "response": ""
    },
    {
      "name": "place_order",
      purpose: "Assisting users with placing an order.",
      "examples": [],
      "response": ""
    },
    {
      "name": "recover_password",
      purpose: "Helping customers recover or reset their passwords.",
      "examples": [],
      "response": ""
    },
    {
      "name": "registration_problems",
      purpose: "Assisting users with registration issues.",
      "examples": [],
      "response": ""
    },
    {
      "name": "review",
      purpose: "Handling customer reviews and feedback submissions.",
      "examples": [],
      "response": ""
    },
    {
      "name": "set_up_shipping_address",
      purpose: "Assisting in adding or updating a shipping address.",
      "examples": [],
      "response": ""
    },
    {
      "name": "switch_account",
      purpose: "Helping users switch between different accounts.",
      "examples": [],
      "response": ""
    },
    {
      "name": "track_order",
      purpose: "Providing order tracking details.",
      "examples": [],
      "response": ""
    },
    {
      "name": "track_refund",
      purpose: "Allowing users to track the status of their refund.",
      "examples": [],
      "response": ""
    }
  ];

  return (
    <div className="container mx-auto w-19/20 mb-4 font-sans leading-relaxed">
      <h1 className="text-3xl mb-5 font-bold pb-2 border-b-1">Text Classification</h1>
      <p className="mb-3">Text classification is a Natural Language Processing (NLP) technique used to categorize text data into predefined labels based on its content. This is useful for organizing and sorting large volumes of text data.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">How to Do It:</h2>
      <ol className="list-decimal ml-2 pl-4">
        <li><strong>Define Categories:</strong> Determine the categories you want to classify text into.</li>
        <li><strong>Train a Model:</strong> Use machine learning algorithms to train a model on labeled data.</li>
        <li><strong>Classify Text:</strong> Apply the trained model to new text data to classify it into the predefined categories.</li>
      </ol>
      
      <p className="mt-4 mb-4"><strong>Example: &nbsp;</strong>Classifying customer feedback into categories like product complaints, service praise, and feature requests. A customer support classifier uses intent classification to automate responses by interpreting user messages and mapping them to predefined replies.</p>

      <h2 className="text-2xl font-semibold mt-6">Text Classification</h2>
      <h3 className="text-xl font-semibold mt-4 mb-4">List of Inputs We Can Categorize</h3>
     
        {intents.map((intent, index) => (
           <div className={(darkMode ? 'bg-gray-800' : 'bg-white') + " list-none mt-2 mb-2 p-2 rounded-md"}>
              <li key={index} className="p-2">
                <span className="font-bold">{intent.name.split(' ').pop().replace('(','').replace(')','')+": "}</span>
                <span>{intent.purpose}</span>
              </li>
            </div>
        ))}
      

      <h2 className="text-2xl font-semibold mt-6">Intent Meanings and Example Inputs</h2>
      {intents.slice(0,6).map((intent, index) => (
        <div key={index} className={(darkMode ? 'bg-gray-800' : 'bg-white') +" p-4 mt-4 shadow-md rounded-md"}>
          <h3 className="text-xl font-semibold mb-2">{intent.name}</h3>
          <p><strong>Purpose:</strong> {intent.purpose}</p>
          <div className={(darkMode ? 'bg-gray-700' : 'bg-gray-100') +" p-3 mt-3"}>
            <p className="font-semibold">Example Inputs:</p>
            {intent.examples.map((example, idx) => (
              <p key={idx} className="ml-4">{example}</p>
            ))}
          </div>
          <div className={(darkMode ? 'bg-blue-900' : 'bg-blue-100') + "  border-l-4 border-blue-500 p-3 mt-3"}>
            <p><strong>Response:</strong> {intent.response}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataView;