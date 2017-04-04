package com.touchnbox.dao;

import java.util.Map;

import com.touchnbox.domain.Member;

public interface MemberDao {
  Member exist(Map<String, String> map);

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
  int quitMemToday(String today);
  int quitMemTodayTotal(String today);

}
