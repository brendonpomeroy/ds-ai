import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AuthDialog from '../components/AuthDialog';
import UserMenu from '../components/UserMenu';
import { useAuth } from '../contexts/useAuth';

interface DesignSystem {
  id: string;
  name: string;
  authorUsername: string;
  tags: string[];
  promptTags: string[];
  creativityScale: number;
  previewImageUrl?: string;
  createdAt: string;
  remixedFrom?: string;
}

export default function DesignSystemPage() {
  const { id } = useParams<{ id: string }>();
  const [designSystem, setDesignSystem] = useState<DesignSystem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Mock API call - replace with actual API
    const mockData: DesignSystem = {
      id: id || '1',
      name: 'Minimalist UI',
      authorUsername: 'designer123',
      tags: ['minimalist', 'sans serif', 'pastel tones'],
      promptTags: ['minimalist', 'sans serif', 'pastel tones'],
      creativityScale: 75,
      createdAt: '2025-10-01T00:00:00Z'
    };
    
    setTimeout(() => {
      setDesignSystem(mockData);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading design system...</p>
        </div>
      </div>
    );
  }

  if (!designSystem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Design System Not Found</h2>
          <p className="text-gray-600 mb-4">The design system you're looking for doesn't exist.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Explore
            </Link>
            <div className="flex items-center gap-3">
              {user && (
                <Link
                  to={`/create/${designSystem.id}`}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Remix
                </Link>
              )}
              {user ? (
                <UserMenu />
              ) : (
                <button 
                  onClick={() => setIsAuthDialogOpen(true)}
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                {designSystem.name}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">{designSystem.authorUsername}</span>
                <span className="mx-2">•</span>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(designSystem.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-2 rounded-xl border border-purple-100">
              <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-purple-700 font-medium">
                {designSystem.creativityScale}/100 Creativity
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {designSystem.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-sm px-4 py-2 rounded-xl font-medium border border-blue-100"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <Link
                to={`/create/${designSystem.id}`}
                className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Remix This Design
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthDialogOpen(true)}
                className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Sign In to Remix
              </button>
            )}
            
            <button className="inline-flex items-center text-gray-600 hover:text-gray-900 px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 font-medium transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Like
            </button>

            <button className="inline-flex items-center text-gray-600 hover:text-gray-900 px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 font-medium transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>

        {/* Component Preview */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Component Preview</h2>
            <p className="text-gray-600">Explore the design system components</p>
          </div>
          
          {user ? (
            <div className="p-8">
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <h3 className="text-lg font-bold text-gray-900">Interactive Preview</h3>
                  <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Live</span>
                </div>
                
                {/* Mock components - replace with actual token-based components */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Buttons</h4>
                      <div className="flex flex-wrap gap-3">
                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
                          Primary
                        </button>
                        <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                          Secondary
                        </button>
                        <button className="text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition-all duration-200">
                          Ghost
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Typography</h4>
                      <div className="space-y-3">
                        <h1 className="text-3xl font-bold text-gray-900">Heading 1</h1>
                        <h2 className="text-2xl font-semibold text-gray-800">Heading 2</h2>
                        <p className="text-base text-gray-700">Body text with perfect readability and spacing</p>
                        <p className="text-sm text-gray-600">Caption text for subtle information</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Card</h4>
                      <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <h5 className="text-lg font-bold text-gray-900 mb-2">Sample Card</h5>
                        <p className="text-gray-600 mb-4">Beautiful card component with hover effects and perfect spacing.</p>
                        <div className="flex gap-2">
                          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Design</span>
                          <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">System</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Input</h4>
                      <input
                        type="text"
                        placeholder="Enter your text here..."
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Preview Locked</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Sign in to unlock the interactive component preview and explore all the design tokens in action
                </p>
                <button 
                  onClick={() => setIsAuthDialogOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Sign In to Unlock
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Auth Dialog */}
      <AuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
        onAuthSuccess={() => setIsAuthDialogOpen(false)}
      />
    </div>
  );
}
