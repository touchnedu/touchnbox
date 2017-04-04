package com.touchnbox.service;

import com.touchnbox.domain.Member;

public interface MemberService {
  Member getMemberInfo(String mno, String password);

  int totalMemCount();
  int totalCount(String today);
  
  int naverStudentMale(String today);
  int naverStudentFemale(String today);
  int naverCommonMale(String today);
  int naverCommonFemale(String today);
  
  int directStudentMale(String today);
  int directStudentFemale(String today);
  int directCommonMale(String today);
  int directCommonFemale(String today);

  int totalQuitNum();
  int quitMemberToday(String today);
  int quitMemberTodayTotal(String today);
  
}
