package com.touchnbox.dao;

import java.util.List;
import java.util.Map;

import com.touchnbox.domain.WrongData;

public interface WrongDataDao {
  int existQuiz(String qno);
  int insertWrongQuiz(Map<String, Object> paramMap);
  int countWrongQuiz();
  List<WrongData> listWrongQuiz(Map<String, Object> paramMap);
  int deleteWrongQuiz(int no);

}
