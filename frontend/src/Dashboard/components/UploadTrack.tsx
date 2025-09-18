import React, { useState, useEffect } from 'react';
import { Upload, Music, Image, Check, AlertCircle, X } from 'lucide-react';
import { AnimatedLogoCarousel } from './AnimatedLogoCarousel';
import { useFormStorage } from '../hooks/useFormStorage';
import { AutoFillButton } from './AutoFillButton';
import { FormSaveIndicator } from './FormSaveIndicator';

interface FormData {
  title: string;
  label: string;
  upcEan: string;
  primaryArtist: string;
  featuring: string;
  lyricist: string;
  composer: string;
  arranger: string;
  producer: string;
  genre: string;
  lyricsLanguage: string;
  pLine: string;
  cLine: string;
  titleLanguage: string;
  productionYear: string;
  releaseDate: string;
  instrumental: boolean;
  parentalAdvisory: boolean;
  isrcGeneration: boolean;
  crbtCut: boolean;
  audioFile: File | null;
  coverArt: File | null;
  agreeToTerms: boolean;
}

interface UploadTrackProps {
  onClose: () => void;
}

export function UploadTrack({ onClose }: UploadTrackProps) {
  const { saveFormData, submitForm, getAutoFillData } = useFormStorage('upload-track');
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    label: '',
    upcEan: '',
    primaryArtist: '',
    featuring: '',
    lyricist: '',
    composer: '',
    arranger: '',
    producer: '',
    genre: '',
    lyricsLanguage: '',
    pLine: '',
    cLine: '',
    titleLanguage: '',
    productionYear: '',
    releaseDate: '',
    instrumental: false,
    parentalAdvisory: false,
    isrcGeneration: false,
    crbtCut: false,
    audioFile: null,
    coverArt: null,
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | undefined>();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load saved data on component mount
  useEffect(() => {
    const savedData = getAutoFillData();
    if (Object.keys(savedData).length > 0) {
      setFormData(prev => ({ ...prev, ...savedData }));
    }
  }, []);

  // Auto-save form data when it changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (hasUnsavedChanges) {
        setIsSaving(true);
        // Save with form title for better tracking
        saveFormData(formData, 'Music Track Upload Form');
        setTimeout(() => {
          setIsSaving(false);
          setLastSaved(new Date());
          setHasUnsavedChanges(false);
        }, 500);
      }
    }, 1000); // Save after 1 second of inactivity

    return () => clearTimeout(timeoutId);
  }, [formData, hasUnsavedChanges, saveFormData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    setHasUnsavedChanges(true);
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'audioFile' | 'coverArt') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [fileType]: file }));
    setHasUnsavedChanges(true);
    
    if (errors[fileType]) {
      setErrors(prev => ({ ...prev, [fileType]: '' }));
    }
  };

  const handleAutoFill = (autoFillData: any) => {
    setFormData(prev => ({ ...prev, ...autoFillData }));
    setHasUnsavedChanges(true);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.label.trim()) newErrors.label = 'Label is required';
    if (!formData.primaryArtist.trim()) newErrors.primaryArtist = 'Primary Artist is required';
    if (!formData.lyricist.trim()) newErrors.lyricist = 'Lyricist is required';
    if (!formData.composer.trim()) newErrors.composer = 'Composer is required';
    if (!formData.genre.trim()) newErrors.genre = 'Genre is required';
    if (!formData.lyricsLanguage.trim()) newErrors.lyricsLanguage = 'Lyrics Language is required';
    if (!formData.pLine.trim()) newErrors.pLine = 'Ⓟ Line is required';
    if (!formData.cLine.trim()) newErrors.cLine = 'Ⓒ Line is required';
    if (!formData.titleLanguage.trim()) newErrors.titleLanguage = 'Title Language is required';
    if (!formData.productionYear.trim()) newErrors.productionYear = 'Production Year is required';
    if (!formData.releaseDate.trim()) newErrors.releaseDate = 'Release Date is required';
    
    // File validations
    if (!formData.audioFile) {
      newErrors.audioFile = 'Audio file is required';
    } else {
      const audioFormats = ['audio/wav', 'audio/mpeg', 'audio/mp3'];
      if (!audioFormats.includes(formData.audioFile.type)) {
        newErrors.audioFile = 'Audio file must be WAV or MP3 format';
      }
    }
    
    if (!formData.coverArt) {
      newErrors.coverArt = 'Cover art is required';
    } else {
      const imageFormats = ['image/jpeg', 'image/png'];
      if (!imageFormats.includes(formData.coverArt.type)) {
        newErrors.coverArt = 'Cover art must be JPEG or PNG format';
      }
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms & Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit form with complete data capture and proper title
      const submissionId = submitForm(formData, 'submitted', 'Music Track Upload Form');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted with ID:', submissionId);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Electronic', 'Jazz', 'Classical',
    'Folk', 'Blues', 'Reggae', 'Punk', 'Metal', 'Alternative', 'Indie', 'World'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese',
    'Korean', 'Chinese', 'Hindi', 'Arabic', 'Russian', 'Other'
  ];

  if (submitSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <Check className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">Upload Successful!</h2>
            <p className="text-green-700 dark:text-green-300">
              Your track has been submitted successfully and all data has been saved to your form manager. We'll review it and distribute it to all major platforms.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-6xl mx-4 my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Upload New Track</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Distribute your music to all major platforms - All data automatically saved
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FormSaveIndicator 
              isSaving={isSaving}
              lastSaved={lastSaved}
              hasUnsavedChanges={hasUnsavedChanges}
            />
            <AutoFillButton 
              onAutoFill={handleAutoFill}
              formType="upload-track"
            />
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Logo Carousel */}
        <AnimatedLogoCarousel />

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Track Details */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                Track Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter track title"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Label *
                  </label>
                  <input
                    type="text"
                    name="label"
                    value={formData.label}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.label ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter record label"
                  />
                  {errors.label && <p className="text-red-500 text-sm mt-1">{errors.label}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    UPC/EAN
                  </label>
                  <input
                    type="text"
                    name="upcEan"
                    value={formData.upcEan}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter UPC/EAN code (optional)"
                  />
                </div>
              </div>
            </section>

            {/* Artists & Credits */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                Artists & Credits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Artist *
                  </label>
                  <input
                    type="text"
                    name="primaryArtist"
                    value={formData.primaryArtist}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.primaryArtist ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter primary artist name"
                  />
                  {errors.primaryArtist && <p className="text-red-500 text-sm mt-1">{errors.primaryArtist}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Featuring
                  </label>
                  <input
                    type="text"
                    name="featuring"
                    value={formData.featuring}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Featured artists (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lyricist *
                  </label>
                  <input
                    type="text"
                    name="lyricist"
                    value={formData.lyricist}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.lyricist ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter lyricist name"
                  />
                  {errors.lyricist && <p className="text-red-500 text-sm mt-1">{errors.lyricist}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Composer *
                  </label>
                  <input
                    type="text"
                    name="composer"
                    value={formData.composer}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.composer ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter composer name"
                  />
                  {errors.composer && <p className="text-red-500 text-sm mt-1">{errors.composer}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Arranger
                  </label>
                  <input
                    type="text"
                    name="arranger"
                    value={formData.arranger}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter arranger name (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Producer
                  </label>
                  <input
                    type="text"
                    name="producer"
                    value={formData.producer}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter producer name (optional)"
                  />
                </div>
              </div>
            </section>

            {/* Track Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                Track Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Genre *
                  </label>
                  <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.genre ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select genre</option>
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                  {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lyrics Language *
                  </label>
                  <select
                    name="lyricsLanguage"
                    value={formData.lyricsLanguage}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.lyricsLanguage ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select language</option>
                    {languages.map(language => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                  </select>
                  {errors.lyricsLanguage && <p className="text-red-500 text-sm mt-1">{errors.lyricsLanguage}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ⓟ Line *
                  </label>
                  <input
                    type="text"
                    name="pLine"
                    value={formData.pLine}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.pLine ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., ℗ 2024 Record Label"
                  />
                  {errors.pLine && <p className="text-red-500 text-sm mt-1">{errors.pLine}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ⓒ Line *
                  </label>
                  <input
                    type="text"
                    name="cLine"
                    value={formData.cLine}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.cLine ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., © 2024 Artist Name"
                  />
                  {errors.cLine && <p className="text-red-500 text-sm mt-1">{errors.cLine}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title Language *
                  </label>
                  <select
                    name="titleLanguage"
                    value={formData.titleLanguage}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.titleLanguage ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select title language</option>
                    {languages.map(language => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                  </select>
                  {errors.titleLanguage && <p className="text-red-500 text-sm mt-1">{errors.titleLanguage}</p>}
                </div>
              </div>
            </section>

            {/* Release Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                Release Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Production Year *
                  </label>
                  <input
                    type="number"
                    name="productionYear"
                    value={formData.productionYear}
                    onChange={handleInputChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.productionYear ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 2024"
                  />
                  {errors.productionYear && <p className="text-red-500 text-sm mt-1">{errors.productionYear}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Release Date *
                  </label>
                  <input
                    type="date"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.releaseDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.releaseDate && <p className="text-red-500 text-sm mt-1">{errors.releaseDate}</p>}
                </div>

                <div className="md:col-span-2 flex flex-wrap gap-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="instrumental"
                      checked={formData.instrumental}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Instrumental</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="parentalAdvisory"
                      checked={formData.parentalAdvisory}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Parental Advisory</span>
                  </label>
                </div>
              </div>
            </section>

            {/* Upload Files */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                Upload Your Files
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Upload Audio File
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    errors.audioFile ? 'border-red-300 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 hover:border-blue-400 dark:border-gray-600 dark:hover:border-blue-500'
                  }`}>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept=".wav,.mp3,audio/wav,audio/mpeg"
                      onChange={(e) => handleFileChange(e, 'audioFile')}
                      className="hidden"
                      id="audioFile"
                    />
                    <label htmlFor="audioFile" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 font-medium">
                        Choose audio file
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        WAV or MP3 format (High quality required)
                      </p>
                    </label>
                    {formData.audioFile && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {formData.audioFile.name}
                      </p>
                    )}
                  </div>
                  {errors.audioFile && <p className="text-red-500 text-sm mt-1">{errors.audioFile}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Upload Cover Art
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    errors.coverArt ? 'border-red-300 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 hover:border-blue-400 dark:border-gray-600 dark:hover:border-blue-500'
                  }`}>
                    <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                      onChange={(e) => handleFileChange(e, 'coverArt')}
                      className="hidden"
                      id="coverArt"
                    />
                    <label htmlFor="coverArt" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 font-medium">
                        Choose cover art
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        JPEG or PNG (3000x3000 pixels required)
                      </p>
                    </label>
                    {formData.coverArt && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {formData.coverArt.name}
                      </p>
                    )}
                  </div>
                  {errors.coverArt && <p className="text-red-500 text-sm mt-1">{errors.coverArt}</p>}
                </div>
              </div>
            </section>

            {/* Additional Options */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                Additional Options
              </h2>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isrcGeneration"
                    checked={formData.isrcGeneration}
                    onChange={handleInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">ISRC Generation</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="crbtCut"
                    checked={formData.crbtCut}
                    onChange={handleInputChange}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">CRBT Cut</span>
                </label>
              </div>
            </section>

            {/* Terms Agreement */}
            <section>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className={`mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1 ${
                      errors.agreeToTerms ? 'border-red-500' : ''
                    }`}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    By submitting, you agree to our{' '}
                    <a href="/terms-and-conditions" className="text-blue-600 hover:text-blue-700 underline">
                      Terms & Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                      Privacy Policy
                    </a>. All form data will be automatically saved to your Form Data Manager.
                  </span>
                </label>
                {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
              </div>
            </section>

            {/* Submit Button */}
            <div className="text-center pb-6">
              {errors.submit && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-red-700 dark:text-red-400">{errors.submit}</span>
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-md font-semibold text-white transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105 active:scale-95'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Uploading & Saving All Data...
                  </div>
                ) : (
                  'Submit Track & Save Data'
                )}
              </button>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                All form data is automatically saved and will be available in Form Data Manager
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}