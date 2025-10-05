import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// No props needed for this component

const PREDEFINED_TAGS = [
  'pastel tones',
  'fluid grid',
  'sans serif',
  'neumorphic cards',
  'hover effects',
  'modern minimalist',
  'dark mode',
  'rounded corners',
  'vibrant colors',
  'glassmorphism',
  'monospace',
  'serif',
  'bold typography',
  'subtle shadows',
  'gradient backgrounds'
];

export default function CreatePage() {
  const { remixId } = useParams<{ remixId: string }>();
  const navigate = useNavigate();
  
  const [systemName, setSystemName] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [creativityScale, setCreativityScale] = useState(50);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTokens, setGeneratedTokens] = useState<object | null>(null);
  const [remainingGenerations, setRemainingGenerations] = useState(10);

  // Load remix data if remixId is provided
  useEffect(() => {
    if (remixId) {
      // Mock loading remix data - replace with actual API call
      const mockRemixData = {
        promptTags: ['minimalist', 'sans serif', 'pastel tones']
      };
      setSelectedTags(mockRemixData.promptTags);
      setCreativityScale(50); // Reset to default
      // systemName stays empty for remix
    }
  }, [remixId]);

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleGenerate = async () => {
    if (!systemName.trim() || selectedTags.length === 0) {
      alert('Please provide a system name and select at least one tag.');
      return;
    }

    if (remainingGenerations <= 0) {
      alert('You have reached your monthly generation limit.');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Mock API call - replace with actual generation logic
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockTokens = {
        schemaVersion: '1.0',
        colors: {
          primary: '#3B82F6',
          secondary: '#64748B',
          background: '#FFFFFF',
          surface: '#F8FAFC',
          text: {
            primary: '#1E293B',
            secondary: '#64748B',
            disabled: '#CBD5E1'
          }
        }
        // ... more tokens
      };
      
      setGeneratedTokens(mockTokens);
      setRemainingGenerations(prev => prev - 1);
      
      // In real implementation, navigate to the generated system page
      // navigate(`/system/${generatedSystemId}`);
      
    } catch {
      alert('Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {remixId ? 'Remix Design System' : 'Create Design System'}
              </h1>
              <p className="text-gray-600 mt-1">
                {remixId ? 'Build upon an existing design system' : 'Generate a new design system with AI'}
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 h-fit">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Configuration</h2>
            </div>
            
            {/* System Name */}
            <div className="mb-8">
              <label htmlFor="systemName" className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                System Name *
              </label>
              <input
                type="text"
                id="systemName"
                value={systemName}
                onChange={(e) => setSystemName(e.target.value)}
                placeholder="Enter a unique name for your design system"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
              />
            </div>

            {/* Tag Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-bold text-gray-800 uppercase tracking-wide">
                  Style Tags *
                </label>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  selectedTags.length === 5 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {selectedTags.length}/5
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {PREDEFINED_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    disabled={!selectedTags.includes(tag) && selectedTags.length >= 5}
                    className={`px-4 py-3 text-sm rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedTags.includes(tag)
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-300 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed'
                    }`}
                  >
                    <span className="font-medium">{tag}</span>
                    {selectedTags.includes(tag) && (
                      <svg className="w-4 h-4 float-right mt-0.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Creativity Scale */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="creativity" className="block text-sm font-bold text-gray-800 uppercase tracking-wide">
                  Creativity Scale
                </label>
                <span className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full font-bold">
                  {creativityScale}
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  id="creativity"
                  min="0"
                  max="100"
                  value={creativityScale}
                  onChange={(e) => setCreativityScale(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3B82F6 0%, #8B5CF6 ${creativityScale}%, #E5E7EB ${creativityScale}%, #E5E7EB 100%)`
                  }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-3">
                <span className="font-medium">Conservative</span>
                <span className="font-medium">Experimental</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Higher values produce more unique and experimental designs
              </p>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !systemName.trim() || selectedTags.length === 0}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-200 flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Magic...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Design System
                </>
              )}
            </button>

            {/* Rate Limit Info */}
            <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                <span className="font-semibold text-blue-600">{remainingGenerations}</span> generations remaining this month
              </p>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Live Preview</h2>
                {generatedTokens && (
                  <span className="ml-3 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold">Generated</span>
                )}
              </div>
            </div>
            
            {generatedTokens ? (
              <div className="p-8">
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200">
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <p className="text-green-700 font-bold">✨ Design system generated successfully!</p>
                  </div>
                  
                  {/* Mock preview components */}
                  <div className="grid grid-cols-1 gap-8">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Buttons</h4>
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
                      <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Typography</h4>
                      <div className="space-y-3">
                        <h1 className="text-3xl font-bold text-gray-900">Beautiful Heading</h1>
                        <h2 className="text-2xl font-semibold text-gray-800">Subheading Style</h2>
                        <p className="text-base text-gray-700">Perfect body text with excellent readability and spacing for your content.</p>
                        <p className="text-sm text-gray-600">Caption text for additional information</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Card Component</h4>
                      <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
                        <h5 className="text-lg font-bold text-gray-900 mb-2">Generated Card</h5>
                        <p className="text-gray-600 mb-4">This card uses your generated design tokens for consistent styling.</p>
                        <div className="flex gap-2">
                          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">AI Generated</span>
                          <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">Design System</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Preview Coming Soon</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Configure your design system settings and click "Generate" to see your components come to life
                  </p>
                  <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Waiting for generation
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
