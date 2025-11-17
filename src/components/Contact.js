// src/components/Contact.js
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

function Contact() {
  const [state, handleSubmit] = useForm("YOUR_FORM_ID"); // Make sure your Formspree ID is still here

  if (state.succeeded) {
    return (
      <section 
        id="contact" // 👈 ID ADDED HERE
        className="bg-blue-50 py-20 md:py-28
                   dark:bg-blue-950
                   transition-colors duration-300 ease-in-out">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Thank You!
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-blue-200">
            Your message has been sent. We'll get back to you soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="contact" // 👈 ID ADDED HERE
      className="bg-blue-50 py-20 md:py-28
                 dark:bg-blue-950
                 transition-colors duration-300 ease-in-out">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              Get In Touch
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-blue-200">
              Have a project in mind or just want to say hello? 
              Fill out the form and we'll get back to you as soon as possible.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="ml-3 text-gray-600 dark:text-blue-200">contact@nexus.com</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.212l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.212-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="ml-3 text-gray-600 dark:text-blue-200">+1 (234) 567-890</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ... (rest of your form is perfect) ... */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                             focus:border-blue-500 focus:ring-blue-500
                             dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                             focus:border-blue-500 focus:ring-blue-500
                             dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                             focus:border-blue-500 focus:ring-blue-500
                             dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ></textarea>
                <ValidationError 
                  errors={state.errors}
                  className="mt-1 text-sm text-red-500"
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm
                             text-lg font-medium rounded-lg text-white bg-blue-600
                             hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                             transition duration-300
                             disabled:bg-gray-400 dark:disabled:bg-gray-600"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;