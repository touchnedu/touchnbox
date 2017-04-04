package com.touchnbox.service;

import java.util.List;

import com.touchnbox.domain.WrongData;

public interface WrongDataService {
  int exist(String qno);
  int insertWrongQuiz(int mno, String qno);
  int countWrongQuiz();
  List<WrongData> listWrongQuiz(int pageNo, int pageSize);
  int deleteWrongQuiz(int no);
  
}
