import React from 'react';
import Navbar from '@/components/global-comp/Navbar';

function About() {
  return (
    <div className="p-32 mx-auto max-w-6xl min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      <div className="container mx-auto p-8">
        {/* Heading Section */}
        <h1 className="text-5xl font-extrabold text-neutral-800 text-center mb-10">
          About Us
        </h1>
        
        {/* Mission Section */}
        <section className="bg-white shadow-lg rounded-lg p-8 mb-10">
          <h2 className="text-3xl font-bold text-purple-900 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At <span className="font-semibold text-purple-600">[Company Name]</span>, we strive to redefine market research with AI-driven solutions. Our tools help businesses and MBA professionals make smarter, faster, and more informed decisions based on precise data-driven insights.
          </p>
        </section>

        {/* What We Do */}
        <section className="bg-purple-100 shadow-md rounded-lg p-8 mb-10">
          <h2 className="text-3xl font-bold text-purple-900 mb-4">
            What We Do
          </h2>
          <p className="text-lg text-purple-700 leading-relaxed">
            Our AI-powered platforms simplify complex market analyses, provide customer behavior predictions, and streamline data interpretation. We cater to market researchers, MBAs, and decision-makers who need actionable insights to stay competitive.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white shadow-lg rounded-lg p-8 mb-10">
          <h2 className="text-3xl font-bold text-purple-900 mb-4">
            Why Choose Us?
          </h2>
          <ul className="space-y-4 text-lg text-gray-700">
            <li className="flex items-center">
              <span className="mr-3 text-purple-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              AI-Powered Research Automation
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-purple-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              Tailored Data Insights for Businesses
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-purple-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              Customized Market and Consumer Analysis
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-purple-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              Expert Team of Data Scientists
            </li>
          </ul>
        </section>

        {/* Vision Section */}
        <section className="bg-purple-100 shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-bold text-purple-900 mb-4">
            Our Vision
          </h2>
          <p className="text-lg text-purple-700 leading-relaxed">
            We envision a future where businesses leverage AI for smarter, faster, and more accurate market research, allowing them to innovate and excel in competitive landscapes.
          </p>
        </section>
        
        {/* Call to Action */}
        <div className="mt-10 text-center">
          <a href="/contact" className="bg-purple-600 text-white py-3 px-6 rounded-full shadow-md hover:bg-purple-700 transition duration-300">
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
