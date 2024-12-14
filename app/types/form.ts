// 定义表单数据类型
export interface PersonalInfo {
  name: string;
  age: string;
  gender: string;
}

export interface FormData {
  self: PersonalInfo;
  partner: PersonalInfo;
  additionalInfo: {
    meetingTime: string;
    commonInterests: string[];
  };
} 