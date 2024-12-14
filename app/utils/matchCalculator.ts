export interface MatchFactors {
  ageDifference: number;
  commonInterests: number;
  timeKnown: number;
  genderMatch: number;
}

export interface MatchResult {
  score: number;
  factors: MatchFactors;
}

export const calculateMatchScore = (formData: any): MatchResult => {
  try {
    // 计算年龄差异分数 (满分25分)
    const ageDiff = Math.abs(Number(formData.self.age) - Number(formData.partner.age));
    const ageDifferenceScore = Math.max(25 - ageDiff * 1.5, 0);

    // 计算共同兴趣分数 (满分35分)
    const interestsCount = formData.additionalInfo.commonInterests.length;
    const commonInterestsScore = Math.round((interestsCount / 8) * 35);

    // 计算认识时间分数 (满分20分)
    const timeScores: { [key: string]: number } = {
      '0-3': 12,
      '3-6': 14,
      '6-12': 16,
      '1-3': 18,
      '3+': 20
    };
    const timeKnownScore = timeScores[formData.additionalInfo.meetingTime] || 0;

    // 计算性别匹配分数 (满分20分)
    const genderMatchScore = formData.self.gender !== formData.partner.gender ? 20 : 10;

    // 计算总分
    const totalScore = Math.min(
      Math.round(
        ageDifferenceScore +
        commonInterestsScore +
        timeKnownScore +
        genderMatchScore
      ),
      100
    );

    return {
      score: totalScore,
      factors: {
        ageDifference: ageDifferenceScore,
        commonInterests: commonInterestsScore,
        timeKnown: timeKnownScore,
        genderMatch: genderMatchScore
      }
    };
  } catch (error) {
    console.error('Error in calculateMatchScore:', error);
    // 返回默认值
    return {
      score: 60,
      factors: {
        ageDifference: 15,
        commonInterests: 20,
        timeKnown: 15,
        genderMatch: 10
      }
    };
  }
};

export const getMatchDescription = (score: number): string => {
  if (score >= 90) return '你们是天生一对！灵魂伴侣般的存在。';
  if (score >= 80) return '你们非常般配，有很大的发展潜力。';
  if (score >= 70) return '你们比较合适，需要更多的了解和沟通。';
  return '你们还算般配，但需要更多的努力来维护关系。';
};

export const getMatchAdvice = (factors: MatchFactors): string[] => {
  const advice: string[] = [];
  
  if (factors.ageDifference < 20) {
    advice.push('年龄差异较大，要多理解对方的想法和生活方式。');
  }
  
  if (factors.commonInterests < 25) {
    advice.push('可以尝试发展更多共同兴趣，增进感情。');
  }
  
  if (factors.timeKnown < 15) {
    advice.push('建议多花时间了解对方，慢慢培养感情。');
  }

  return advice;
}; 