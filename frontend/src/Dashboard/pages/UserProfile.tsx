import React, { useState, useEffect } from 'react';
import { User, Lock, CreditCard, FileText, Camera, Save, Eye, EyeOff, Upload, Check, X } from 'lucide-react';
import { useFormStorage } from '../hooks/useFormStorage';
import { AutoFillButton } from '../components/AutoFillButton';
import { FormSaveIndicator } from '../components/FormSaveIndicator';

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  profilePhoto?: string;
}

interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
}

interface PANDetails {
  panNumber: string;
  panHolderName: string;
  fatherName: string;
  dateOfBirth: string;
  panCardImage?: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState<'personal' | 'password' | 'bank' | 'pan'>('personal');
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | undefined>();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Form storage hooks for different sections
  const personalFormStorage = useFormStorage('user-profile-personal');
  const bankFormStorage = useFormStorage('user-profile-bank');
  const panFormStorage = useFormStorage('user-profile-pan');

  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: 'Pintu',
    lastName: 'Kumar',
    email: 'pintu.kumar@example.com',
    phone: '+91 9876543210',
    dateOfBirth: '1990-01-15',
    address: '123 Main Street, Sector 15',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountHolderName: 'Pintu Kumar',
    accountNumber: '1234567890123456',
    ifscCode: 'SBIN0001234',
    bankName: 'State Bank of India',
    branchName: 'Connaught Place Branch'
  });

  const [panDetails, setPANDetails] = useState<PANDetails>({
    panNumber: 'ABCDE1234F',
    panHolderName: 'Pintu Kumar',
    fatherName: 'Ram Kumar',
    dateOfBirth: '1990-01-15',
    panCardImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop'
  });

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Load saved data on component mount
  useEffect(() => {
    const savedPersonalData = personalFormStorage.getAutoFillData();
    const savedBankData = bankFormStorage.getAutoFillData();
    const savedPanData = panFormStorage.getAutoFillData();

    if (Object.keys(savedPersonalData).length > 0) {
      setUserInfo(prev => ({ ...prev, ...savedPersonalData }));
    }
    if (Object.keys(savedBankData).length > 0) {
      setBankDetails(prev => ({ ...prev, ...savedBankData }));
    }
    if (Object.keys(savedPanData).length > 0) {
      setPANDetails(prev => ({ ...prev, ...savedPanData }));
    }
  }, []);

  // Auto-save when data changes
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timeoutId = setTimeout(() => {
        setIsSaving(true);
        
        // Save to appropriate storage based on active tab with proper titles
        switch (activeTab) {
          case 'personal':
            personalFormStorage.saveFormData(userInfo, 'User Personal Information Form');
            break;
          case 'bank':
            bankFormStorage.saveFormData(bankDetails, 'Bank Account Details Form');
            break;
          case 'pan':
            panFormStorage.saveFormData(panDetails, 'PAN Card Information Form');
            break;
        }
        
        setTimeout(() => {
          setIsSaving(false);
          setLastSaved(new Date());
          setHasUnsavedChanges(false);
        }, 500);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [userInfo, bankDetails, panDetails, hasUnsavedChanges, activeTab]);

  const handleSave = async (section: string) => {
    setSaveStatus('saving');
    
    // Save to localStorage based on section with proper form titles
    switch (section) {
      case 'personal':
        personalFormStorage.submitForm(userInfo, 'completed', 'User Personal Information Form');
        break;
      case 'bank':
        bankFormStorage.submitForm(bankDetails, 'completed', 'Bank Account Details Form');
        break;
      case 'pan':
        panFormStorage.submitForm(panDetails, 'completed', 'PAN Card Information Form');
        break;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSaveStatus('saved');
    setIsEditing(false);
    
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    setSaveStatus('saving');
    
    // Save password change data
    const passwordFormStorage = useFormStorage('user-password-change');
    passwordFormStorage.submitForm({
      passwordChangeDate: new Date().toISOString(),
      passwordStrength: passwordData.newPassword.length >= 12 ? 'Strong' : 'Medium',
      hasSpecialChars: /[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword),
      hasNumbers: /\d/.test(passwordData.newPassword),
      hasUppercase: /[A-Z]/.test(passwordData.newPassword),
      hasLowercase: /[a-z]/.test(passwordData.newPassword)
    }, 'completed', 'Password Change Form');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSaveStatus('saved');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserInfo({ ...userInfo, profilePhoto: e.target?.result as string });
        setHasUnsavedChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePANImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPANDetails({ ...panDetails, panCardImage: e.target?.result as string });
        setHasUnsavedChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAutoFillPersonal = (autoFillData: any) => {
    setUserInfo(prev => ({ ...prev, ...autoFillData }));
    setHasUnsavedChanges(true);
  };

  const handleAutoFillBank = (autoFillData: any) => {
    setBankDetails(prev => ({ ...prev, ...autoFillData }));
    setHasUnsavedChanges(true);
  };

  const handleAutoFillPAN = (autoFillData: any) => {
    setPANDetails(prev => ({ ...prev, ...autoFillData }));
    setHasUnsavedChanges(true);
  };

  const getSaveButtonContent = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Saving...
          </>
        );
      case 'saved':
        return (
          <>
            <Check className="w-4 h-4" />
            Saved!
          </>
        );
      case 'error':
        return (
          <>
            <X className="w-4 h-4" />
            Error
          </>
        );
      default:
        return (
          <>
            <Save className="w-4 h-4" />
            Save Changes
          </>
        );
    }
  };

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold dark:text-white">User Profile</h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              All changes are automatically saved to Form Data Manager
            </p>
          </div>
          <div className="flex items-center gap-4">
            <FormSaveIndicator 
              isSaving={isSaving}
              lastSaved={lastSaved}
              hasUnsavedChanges={hasUnsavedChanges}
            />
            {saveStatus === 'saved' && (
              <span className="text-green-600 dark:text-green-400 text-sm flex items-center gap-1">
                <Check className="w-4 h-4" />
                Changes saved successfully
              </span>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'personal', label: 'Personal Info', icon: User },
            { id: 'password', label: 'Password', icon: Lock },
            { id: 'bank', label: 'Bank Details', icon: CreditCard },
            { id: 'pan', label: 'PAN Card', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Personal Information Tab */}
        {activeTab === 'personal' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold dark:text-white">Personal Information</h2>
              <div className="flex items-center gap-2">
                <AutoFillButton 
                  onAutoFill={handleAutoFillPersonal}
                  formType="user-profile-personal"
                />
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>
            </div>

            {/* Profile Photo Section */}
            <div className="flex items-center gap-6 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="relative">
                <img
                  src={userInfo.profilePhoto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-lg"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium dark:text-white">{userInfo.firstName} {userInfo.lastName}</h3>
                <p className="text-gray-600 dark:text-gray-400">{userInfo.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">All data automatically saved to Form Manager</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={userInfo.firstName}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, firstName: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={userInfo.lastName}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, lastName: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, email: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, phone: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={userInfo.dateOfBirth}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, dateOfBirth: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={userInfo.address}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, address: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={userInfo.city}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, city: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={userInfo.state}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, state: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  PIN Code
                </label>
                <input
                  type="text"
                  value={userInfo.pincode}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, pincode: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => handleSave('personal')}
                  disabled={saveStatus === 'saving'}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
                >
                  {getSaveButtonContent()}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-6 dark:text-white">Change Password</h2>
            
            <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.current ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-10 dark:bg-gray-700 dark:text-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.new ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-10 dark:bg-gray-700 dark:text-white"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirm ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-10 dark:bg-gray-700 dark:text-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={saveStatus === 'saving'}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
              >
                {getSaveButtonContent()}
              </button>
              
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Password change details will be saved to Form Data Manager
              </p>
            </form>
          </div>
        )}

        {/* Bank Details Tab */}
        {activeTab === 'bank' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold dark:text-white">Bank Account Details</h2>
              <div className="flex items-center gap-2">
                <AutoFillButton 
                  onAutoFill={handleAutoFillBank}
                  formType="user-profile-bank"
                />
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={bankDetails.accountHolderName}
                  onChange={(e) => {
                    setBankDetails({ ...bankDetails, accountHolderName: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) => {
                    setBankDetails({ ...bankDetails, accountNumber: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={bankDetails.ifscCode}
                  onChange={(e) => {
                    setBankDetails({ ...bankDetails, ifscCode: e.target.value.toUpperCase() });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={bankDetails.bankName}
                  onChange={(e) => {
                    setBankDetails({ ...bankDetails, bankName: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Branch Name
                </label>
                <input
                  type="text"
                  value={bankDetails.branchName}
                  onChange={(e) => {
                    setBankDetails({ ...bankDetails, branchName: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => handleSave('bank')}
                  disabled={saveStatus === 'saving'}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
                >
                  {getSaveButtonContent()}
                </button>
              </div>
            )}
          </div>
        )}

        {/* PAN Card Tab */}
        {activeTab === 'pan' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold dark:text-white">PAN Card Details</h2>
              <div className="flex items-center gap-2">
                <AutoFillButton 
                  onAutoFill={handleAutoFillPAN}
                  formType="user-profile-pan"
                />
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>
            </div>

            {/* PAN Card Image Section */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">PAN Card Image</h3>
              <div className="flex items-center gap-4">
                {panDetails.panCardImage && (
                  <img
                    src={panDetails.panCardImage}
                    alt="PAN Card"
                    className="w-48 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                )}
                {isEditing && (
                  <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload PAN Card
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePANImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  PAN Number
                </label>
                <input
                  type="text"
                  value={panDetails.panNumber}
                  onChange={(e) => {
                    setPANDetails({ ...panDetails, panNumber: e.target.value.toUpperCase() });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  maxLength={10}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Format: ABCDE1234F
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  PAN Holder Name
                </label>
                <input
                  type="text"
                  value={panDetails.panHolderName}
                  onChange={(e) => {
                    setPANDetails({ ...panDetails, panHolderName: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Father's Name
                </label>
                <input
                  type="text"
                  value={panDetails.fatherName}
                  onChange={(e) => {
                    setPANDetails({ ...panDetails, fatherName: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date of Birth (as per PAN)
                </label>
                <input
                  type="date"
                  value={panDetails.dateOfBirth}
                  onChange={(e) => {
                    setPANDetails({ ...panDetails, dateOfBirth: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => handleSave('pan')}
                  disabled={saveStatus === 'saving'}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
                >
                  {getSaveButtonContent()}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}