'use client';
import { motion } from 'framer-motion';
import { 
  getMatchDescription, 
  getMatchAdvice,
  type MatchFactors 
} from '../utils/matchCalculator';

interface ResultDisplayProps {
  score: number;
  factors: MatchFactors;
  onRetry: () => void;
  formData: any;
}

export default function ResultDisplay({ score, factors, onRetry, formData }: ResultDisplayProps) {
  const description = getMatchDescription(score);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h2 className="text-2xl font-bold mb-6">匹配结果</h2>
      
      {/* 分数展示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8 px-4 py-3 bg-pink-50 rounded-lg"
      >
        <div className="text-6xl font-bold text-pink-500 mb-4">
          {score}%
        </div>
        <p className="text-lg text-pink-800">
          {description}
        </p>
      </motion.div>

      {/* 匹配详情 */}
      <div className="space-y-6 text-left">
        <div>
          <h3 className="text-xl font-semibold mb-4">匹配分析</h3>
          <div className="space-y-4 mb-6">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.6 }}
              className="flex justify-between items-center"
            >
              <span>年龄匹配度</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(factors.ageDifference / 25) * 100}%` }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="bg-pink-500 h-2 rounded-full"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.7 }}
              className="flex justify-between items-center"
            >
              <span>共同兴趣</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(factors.commonInterests / 35) * 100}%` }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                  className="bg-pink-500 h-2 rounded-full"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8 }}
              className="flex justify-between items-center"
            >
              <span>相处时间</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(factors.timeKnown / 20) * 100}%` }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="bg-pink-500 h-2 rounded-full"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.9 }}
              className="flex justify-between items-center"
            >
              <span>性别匹配</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(factors.genderMatch / 20) * 100}%` }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="bg-pink-500 h-2 rounded-full"
                />
              </div>
            </motion.div>
          </div>

          {/* 建议 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <h4 className="font-semibold mb-3">建议：</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              {getMatchAdvice(factors).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 按钮区域 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex gap-4 justify-center mt-8"
        >
          <button
            type="button"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full transition-colors"
            onClick={onRetry}
          >
            重新测试
          </button>
          <button
            type="button"
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition-colors"
            onClick={() => {
              const text = `我和伴侣的契合度是${score}%！${description}`;
              if (navigator.share) {
                navigator.share({
                  title: 'AI Love Match 测试���果',
                  text: text,
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(text).then(() => {
                  alert('结果已复制到剪贴板！');
                });
              }
            }}
          >
            分享结果
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
} 