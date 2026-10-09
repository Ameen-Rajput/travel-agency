import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What should I bring?',
      answer: 'Just water, a hat, and light clothes — mornings are cool, afternoons warm. We provide everything else you need for a comfortable experience.'
    },
    {
      question: 'Is pickup/drop-off included?',
      answer: 'Yes! Private pick-up and drop-off from your location is included in all our tour packages.'
    },
    {
      question: 'Are tours suitable for children?',
      answer: 'Absolutely! Our tours are family-friendly and suitable for children of all ages. We adjust the pace based on your group.'
    },
    {
      question: 'What about bad weather?',
      answer: 'Safety first! If weather conditions are unsafe, we will reschedule your tour or provide a full refund.'
    },
    {
      question: 'How to book or cancel?',
      answer: 'You can book through our contact form or email us at info@marwa.com. Cancellations are free up to 24 hours before your tour.'
    }
  ];

  return (
    <section className="faq">
      <div className="container">
        <div className="faq-header">
          <h2>Plan your visit with confidence</h2>
        </div>

        <div className="faq-content">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${openIndex === index ? 'active' : ''}`}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  {faq.question}
                  <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
                </button>
                {openIndex === index && (
                  <div className="faq-answer">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>

          <div className="faq-tips">
            <h3>Quick Tips</h3>
            <ul>
              <li>Light clothes for temperature changes</li>
              <li>Bring water, hat, sunscreen</li>
              <li>Private pick-up available</li>
            </ul>
            <div className="contact-info">
              <p>Need more help?</p>
              <a href="mailto:info@marwa.com">info@marwa.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
