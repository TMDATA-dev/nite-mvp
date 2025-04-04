import React, { useState, useEffect } from 'react';
import { X, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { generateContentSuggestion } from '../lib/openai';
import { connectInstagram, isInstagramConnected } from '../lib/instagram';
import type { Post } from '../lib/posts';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) => void;
}

export function NewPostModal({ isOpen, onClose, onSave }: NewPostModalProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [platform, setPlatform] = useState<Post['platform']>('twitter');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isInstagramAuth, setIsInstagramAuth] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  useEffect(() => {
    const checkInstagramAuth = async () => {
      if (platform === 'instagram') {
        setIsCheckingAuth(true);
        try {
          const isConnected = await isInstagramConnected();
          setIsInstagramAuth(isConnected);
        } catch (err) {
          console.error('Error checking Instagram auth:', err);
        } finally {
          setIsCheckingAuth(false);
        }
      }
    };

    if (isOpen) {
      checkInstagramAuth();
    }
  }, [isOpen, platform]);

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    setError('');
    try {
      const prompt = `Generate a creative and engaging ${platform} post about: ${title || 'my business'}`;
      const suggestion = await generateContentSuggestion(prompt);
      setTitle(suggestion);
    } catch (err: any) {
      setError(err.message || 'Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    if (platform === 'instagram') {
      if (!isInstagramAuth) {
        connectInstagram();
        return;
      }
      
      if (!imageUrl) {
        setError('Image URL is required for Instagram posts');
        return;
      }
    }

    onSave({
      title: platform === 'instagram' ? 
        `${title}\n\nImage: ${imageUrl}` : 
        title,
      post_date: new Date(date),
      platform
    });

    // Reset form
    setTitle('');
    setDate('');
    setPlatform('twitter');
    setImageUrl('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-nite-gray-400 hover:text-nite-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Schedule New Post</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-nite-gray-700 mb-1">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Post['platform'])}
              className="w-full rounded-md border-nite-gray-300 shadow-sm focus:border-nite-yellow focus:ring focus:ring-nite-yellow/20"
            >
              <option value="twitter">Twitter</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
            </select>
          </div>

          {platform === 'instagram' && !isCheckingAuth && (
            <>
              {!isInstagramAuth ? (
                <div className="p-4 bg-nite-gray-50 rounded-lg">
                  <p className="text-sm text-nite-gray-600 mb-3">
                    Connect your Instagram account to schedule posts
                  </p>
                  <button
                    type="button"
                    onClick={() => connectInstagram()}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-nite-gray-900 rounded-md hover:bg-nite-gray-800"
                  >
                    Connect Instagram
                  </button>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-nite-gray-700 mb-1">
                    Image URL
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 rounded-md border-nite-gray-300 shadow-sm focus:border-nite-yellow focus:ring focus:ring-nite-yellow/20"
                    />
                    <div className="flex-shrink-0">
                      {imageUrl && (
                        <div className="w-10 h-10 rounded border border-nite-gray-200 flex items-center justify-center">
                          <img
                            src={imageUrl}
                            alt="Preview"
                            className="max-w-full max-h-full object-cover rounded"
                            onError={() => setError('Invalid image URL')}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-nite-gray-500">
                    Provide a direct link to your image
                  </p>
                </div>
              )}
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-nite-gray-700 mb-1">
              {platform === 'instagram' ? 'Caption' : 'Content'}
            </label>
            <div className="relative">
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border-nite-gray-300 shadow-sm focus:border-nite-yellow focus:ring focus:ring-nite-yellow/20"
                rows={3}
                placeholder={platform === 'instagram' ? 
                  "Write your caption here (don't forget hashtags!)" : 
                  "What's on your mind?"
                }
              />
              <button
                type="button"
                onClick={handleGenerateContent}
                disabled={isGenerating}
                className="absolute bottom-2 right-2 inline-flex items-center px-2 py-1 text-sm rounded-md text-nite-gray-600 hover:text-nite-gray-900 disabled:opacity-50"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                <span className="ml-1">AI Suggest</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-nite-gray-700 mb-1">
              Schedule Date & Time
            </label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border-nite-gray-300 shadow-sm focus:border-nite-yellow focus:ring focus:ring-nite-yellow/20"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-nite-gray-700 hover:text-nite-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-nite-gray-900 rounded-md hover:bg-nite-gray-800"
            >
              Schedule Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}