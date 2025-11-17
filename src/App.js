// src/App.js
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css'; 

// Import components (these load normally)
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// LAZY-LOAD YOUR PAGES
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));         // 👈 1. IMPORT BLOG
const SinglePostPage = lazy(() => import('./pages/SinglePostPage')); // 👈 1. IMPORT SINGLE POST

// A SIMPLE LOADING FALLBACK COMPONENT
function LoadingFallback() {
  return (
    // We have dark mode classes here
    <div className="flex justify-center items-center h-screen 
                    bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
        Loading...
      </h1>
    </div>
  );
}

// This is our Layout component
function Layout() {
  return (
    // We have dark mode classes here
    <div className="bg-white text-gray-800 
                    dark:bg-gray-900 dark:text-gray-200
                    transition-colors duration-300 ease-in-out">
      <Navbar />
      <main>
        {/* WRAP THE OUTLET IN SUSPENSE */}
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

// This is your main App component
function App() {
  return (
    <Routes>
      {/* This "Route" uses the Layout. All other pages
          will be "children" of this route. */}
      <Route path="/" element={<Layout />}>
        
        {/* index={true} means this is the default page for "/" */}
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        
        {/* 👇 2. ADD THE BLOG ROUTES */}
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<SinglePostPage />} />
      
      </Route>
    </Routes>
  );
}

export default App;