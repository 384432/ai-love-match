'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-4 sm:px-6 md:px-8 py-8 md:py-12 bg-gradient-to-b from-white to-gray-50">
      {/* 顶部标题区域 */}
      <div className="w-full max-w-4xl mx-auto text-center pt-8 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-2 md:mb-4"
        >
          <span className="text-5xl md:text-7xl mb-6 md:mb-8 inline-block">❤️</span>
        </motion.div>
        
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          AI Love Match
        </motion.h1>

        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          探索你们的契合度，发现完美匹配
        </motion.p>
      </div>

      {/* 中间按钮区域 */}
      <motion.div
        className="flex flex-col items-center justify-center space-y-6 md:space-y-8 my-8 md:my-12 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="/test" className="w-full max-w-xs md:max-w-md">
          <button className="w-full apple-button apple-gradient text-base md:text-xl px-8 md:px-12 py-3 md:py-4 shadow-lg hover:shadow-xl">
            开始测试
          </button>
        </Link>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 text-gray-500 w-full max-w-xl md:max-w-2xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-center sm:justify-center space-x-2">
            <span className="text-xl md:text-2xl">⚡️</span>
            <span className="text-sm md:text-base">快速测试</span>
          </div>
          <div className="flex items-center justify-center sm:justify-center space-x-2">
            <span className="text-xl md:text-2xl">🎯</span>
            <span className="text-sm md:text-base">准确分析</span>
          </div>
          <div className="flex items-center justify-center sm:justify-center space-x-2">
            <span className="text-xl md:text-2xl">🔒</span>
            <span className="text-sm md:text-base">隐私保护</span>
          </div>
        </motion.div>
      </motion.div>

      {/* 底部信息区域 */}
      <motion.footer 
        className="w-full max-w-4xl mx-auto text-center space-y-4 md:space-y-6 mt-8 md:mt-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="text-gray-500 space-y-2 md:space-y-3 px-4">
          <p className="text-base md:text-lg font-medium">已有超过1000对情侣完成测试</p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm md:text-base">
            <span>AI智能分析</span>
            <span className="hidden sm:inline">•</span>
            <span>科学算法</span>
            <span className="hidden sm:inline">•</span>
            <span>专业建议</span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
