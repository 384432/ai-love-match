'use client';
import { useState } from 'react';
import type { FormData } from '../types/form';
import { calculateMatchScore, getMatchDescription, getMatchAdvice, type MatchFactors } from '../utils/matchCalculator';
import ResultDisplay from '../components/ResultDisplay';
import { motion, AnimatePresence } from 'framer-motion';

// 添加错误状态类型
interface FormErrors {
  self: {
    name?: string;
    age?: string;
    gender?: string;
  };
  partner: {
    name?: string;
    age?: string;
    gender?: string;
  };
  additionalInfo: {
    meetingTime?: string;
  };
}

export default function TestPage() {
  const [step, setStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [matchScore, setMatchScore] = useState(0);
  const [matchFactors, setMatchFactors] = useState<MatchFactors | null>(null);
  
  // 修改初始状态
  const [formData, setFormData] = useState<FormData>({
    self: {
      name: '',
      age: '',
      gender: ''
    },
    partner: {
      name: '',
      age: '',
      gender: ''
    },
    additionalInfo: {
      meetingTime: '',
      commonInterests: []
    }
  });

  // 添加错误状态
  const [errors, setErrors] = useState<FormErrors>({
    self: {},
    partner: {},
    additionalInfo: {}
  });

  // 添加加载状态
  const [isLoading, setIsLoading] = useState(false);

  // 修改表单验证函数
  const validateForm = (step: number): boolean => {
    console.log('Validating step:', step); // 调试日志
    console.log('Current form data:', formData); // 调试日志

    const newErrors: FormErrors = {
      self: {},
      partner: {},
      additionalInfo: {}
    };
    
    let isValid = true;

    if (step === 1) {
      if (!formData.self.name.trim()) {
        newErrors.self.name = '请输入您的姓名';
        isValid = false;
      }
      if (!formData.self.age) {
        newErrors.self.age = '请输入您的年龄';
        isValid = false;
      } else if (Number(formData.self.age) < 18 || Number(formData.self.age) > 100) {
        newErrors.self.age = '年龄必须在18-100岁之间';
        isValid = false;
      }
      if (!formData.self.gender) {
        newErrors.self.gender = '请选择您的性别';
        isValid = false;
      }
    }

    if (step === 2) {
      if (!formData.partner.name.trim()) {
        newErrors.partner.name = '请输入伴侣姓名';
        isValid = false;
      }
      if (!formData.partner.age) {
        newErrors.partner.age = '请输入伴侣年龄';
        isValid = false;
      } else if (Number(formData.partner.age) < 18 || Number(formData.partner.age) > 100) {
        newErrors.partner.age = '年龄必须在18-100岁之间';
        isValid = false;
      }
      if (!formData.partner.gender) {
        newErrors.partner.gender = '请选择伴侣性别';
        isValid = false;
      }
    }

    if (step === 3) {
      // 第三步只验证认识时间，共同兴趣是可选的
      if (!formData.additionalInfo.meetingTime) {
        newErrors.additionalInfo.meetingTime = '请选择认识时间';
        isValid = false;
      }
    }

    console.log('Validation result:', isValid); // 调试日志
    console.log('Validation errors:', newErrors); // 调试日志

    setErrors(newErrors);
    return isValid;
  };

  // 修改handleNextStep函数
  const handleNextStep = async () => {
    console.log('Current step before validation:', step); // 调试日志

    if (!validateForm(step)) {
      console.log('Form validation failed'); // 调试日志
      return;
    }

    if (step === 3) {
      setIsLoading(true);
      try {
        console.log('Calculating match score...'); // 调试日志
        const result = calculateMatchScore(formData);
        console.log('Match score result:', result); // 调试日志
        setMatchScore(result.score);
        setMatchFactors(result.factors);
        setShowResult(true);
      } catch (error) {
        console.error('Error in analysis:', error);
        alert('计算匹配度时出错，请重试');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    console.log('Moving to next step:', step + 1); // 调试日志
    setStep(prev => prev + 1);
  };

  // 修改表单输入处理函数
  const handleFormChange = (
    section: 'self' | 'partner' | 'additionalInfo',
    field: string,
    value: string
  ) => {
    console.log('Form change:', { section, field, value }); // 调试日志
    setFormData(prev => {
      const newData = {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
      console.log('Updated form data:', newData); // 调试日志
      return newData;
    });
  };

  // 添加回上一步功能
  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  // 修改输入字段的错误显示
  const renderInput = (
    section: 'self' | 'partner',
    field: 'name' | 'age' | 'gender',
    label: string,
    type: 'text' | 'number' | 'select' = 'text',
    options?: { value: string; label: string }[]
  ) => {
    const value = formData[section][field];
    const error = errors[section][field];
    
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        {type === 'select' ? (
          <select
            value={value}
            onChange={(e) => handleFormChange(section, field, e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              error ? 'border-red-500' : ''
            }`}
          >
            <option value="">{`请选择${label}`}</option>
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => handleFormChange(section, field, e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              error ? 'border-red-500' : ''
            }`}
            placeholder={`请输入${label}`}
          />
        )}
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  };

  // 修改表单渲染，使用新的renderInput函数
  const renderFormStep = () => {
    if (showResult && matchFactors) {
      return (
        <ResultDisplay
          score={matchScore}
          factors={matchFactors}
          formData={formData}
          onRetry={() => {
            setStep(1);
            setShowResult(false);
            setMatchFactors(null);
            setFormData({
              self: { name: '', age: '', gender: '' },
              partner: { name: '', age: '', gender: '' },
              additionalInfo: { meetingTime: '', commonInterests: [] }
            });
          }}
        />
      );
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* 原有的switch语句内容 */}
          {(() => {
            switch (step) {
              case 1:
                return (
                  <>
                    <h2 className="text-2xl font-bold mb-6 text-center">
                      您的基本信息
                    </h2>
                    <div className="space-y-6">
                      {renderInput('self', 'name', '您的姓名')}
                      {renderInput('self', 'age', '您的年龄', 'number')}
                      {renderInput('self', 'gender', '您的性别', 'select', [
                        { value: 'male', label: '男' },
                        { value: 'female', label: '女' }
                      ])}
                    </div>
                  </>
                );
              case 2:
                return (
                  <>
                    <h2 className="text-2xl font-bold mb-6 text-center">
                      伴侣的基本信息
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          伴侣姓名
                        </label>
                        <input
                          type="text"
                          value={formData.partner.name}
                          onChange={(e) => handleFormChange('partner', 'name', e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="请输入伴侣姓名"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          伴侣年龄
                        </label>
                        <input
                          type="number"
                          value={formData.partner.age}
                          onChange={(e) => handleFormChange('partner', 'age', e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="请输入伴侣年龄"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          伴侣性别
                        </label>
                        <select
                          value={formData.partner.gender}
                          onChange={(e) => handleFormChange('partner', 'gender', e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          <option value="">请选择性别</option>
                          <option value="male">男</option>
                          <option value="female">女</option>
                        </select>
                      </div>
                    </div>
                  </>
                );
              case 3:
                return (
                  <>
                    <h2 className="text-2xl font-bold mb-6 text-center">
                      更多信息
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          认识时间
                        </label>
                        <select
                          name="meetingTime"
                          value={formData.additionalInfo.meetingTime}
                          onChange={e => setFormData(prev => ({
                            ...prev,
                            additionalInfo: {
                              ...prev.additionalInfo,
                              meetingTime: e.target.value
                            }
                          }))}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          <option value="">请选择认识时间</option>
                          <option value="0-3">0-3个月</option>
                          <option value="3-6">3-6个月</option>
                          <option value="6-12">6-12个月</option>
                          <option value="1-3">1-3年</option>
                          <option value="3+">3年以上</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          共同兴趣（可多选）
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {['运动', '音乐', '电影', '美食', '旅行', '阅读', '游戏', '摄影'].map(interest => (
                            <label key={interest} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={formData.additionalInfo.commonInterests.includes(interest)}
                                onChange={e => {
                                  const interests = e.target.checked
                                    ? [...formData.additionalInfo.commonInterests, interest]
                                    : formData.additionalInfo.commonInterests.filter(i => i !== interest);
                                  setFormData(prev => ({
                                    ...prev,
                                    additionalInfo: {
                                      ...prev.additionalInfo,
                                      commonInterests: interests
                                    }
                                  }));
                                }}
                                className="rounded text-pink-500 focus:ring-pink-500"
                              />
                              <span>{interest}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                );
              default:
                return null;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  // 修改进度条，添加动画
  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center bg-[#fbfbfd]">
      <main className="w-full max-w-2xl mx-auto">
        {/* 进度指示器 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-[#86868b]">
              第 {step} 步 / 共 3 步
            </span>
            <span className="text-sm text-[#86868b]">
              {step === 1 ? '个人信息' : step === 2 ? '伴侣信息' : '更多信息'}
            </span>
          </div>
          <div className="w-full bg-[#f5f5f7] rounded-full h-1">
            <motion.div
              className="bg-black h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* 表单区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="apple-card p-8"
        >
          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            {renderFormStep()}
            
            {/* 按钮区域 */}
            <div className="flex gap-4">
              <AnimatePresence>
                {step > 1 && (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    type="button"
                    className="flex-1 bg-[#f5f5f7] text-black font-normal py-3 px-6 rounded-full"
                    onClick={handlePrevStep}
                  >
                    返回
                  </motion.button>
                )}
              </AnimatePresence>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="flex-1 apple-button apple-gradient"
                onClick={handleNextStep}
              >
                {step === 3 ? '完成' : '下一步'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
} 