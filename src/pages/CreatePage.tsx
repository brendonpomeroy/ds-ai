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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {remixId ? 'Remix Design System' : 'Create Design System'}
            </h1>
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Configure Your Design System</h2>
            
            {/* System Name */}
            <div className="mb-6">
              <label htmlFor="systemName" className="block text-sm font-medium text-gray-700 mb-2">
                System Name *
              </label>
              <input
                type="text"
                id="systemName"
                value={systemName}
                onChange={(e) => setSystemName(e.target.value)}
                placeholder="Enter a unique name for your design system"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Tag Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags * (Select up to 5)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PREDEFINED_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    disabled={!selectedTags.includes(tag) && selectedTags.length >= 5}
                    className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Selected: {selectedTags.length}/5
              </p>
            </div>

            {/* Creativity Scale */}
            <div className="mb-6">
              <label htmlFor="creativity" className="block text-sm font-medium text-gray-700 mb-2">
                Creativity Scale: {creativityScale}
              </label>
              <input
                type="range"
                id="creativity"
                min="0"
                max="100"
                value={creativityScale}
                onChange={(e) => setCreativityScale(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Conservative</span>
                <span>Experimental</span>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !systemName.trim() || selectedTags.length === 0}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? 'Generating...' : 'Generate Design System'}
            </button>

            {/* Rate Limit Info */}
            <p className="text-xs text-gray-500 mt-2 text-center">
              Generations remaining this month: {remainingGenerations}
            </p>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Live Preview</h2>
            
            {generatedTokens ? (
              <div className="space-y-6">
                <p className="text-green-600 font-medium">✓ Design system generated successfully!</p>
                
                {/* Mock preview components */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Buttons</h4>
                    <div className="flex gap-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Primary
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50">
                        Secondary
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Typography</h4>
                    <div className="space-y-2">
                      <h1 className="text-2xl font-bold">Heading 1</h1>
                      <h2 className="text-xl font-semibold">Heading 2</h2>
                      <p className="text-base">Body text example</p>
                      <p className="text-sm text-gray-600">Caption text</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Card</h4>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium">Sample Card</h5>
                      <p className="text-gray-600 text-sm mt-1">Generated with your design tokens</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Configure your design system and click "Generate" to see the live preview.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
