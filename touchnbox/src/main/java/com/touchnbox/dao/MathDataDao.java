package com.touchnbox.dao;

import java.util.List;
import java.util.Map;

import com.touchnbox.domain.MathData;

public interface MathDataDao {
  int insert(MathData mathData);
  int update(MathData mathData);
  int delete(int no);
  int checkQuizNumber(String no);
  String load(String no);
  MathData detail(int no);

  int totalCount();
  int countAll(int no);
  int countByChapter(Map<String, Object> paramMap);
  int countAllByChapter(int chapCode);
  int countByQuizNum(Map<String, Object> paramMap);
  int countAllByQuizNum(String mathCode);
  int countByBoxNum(Map<String, Object> paramMap);
  int countAllByBoxNum(int boxNumber);
  
  List<MathData> listAll(Map<String, Object> paramMap);
  List<MathData> list(Map<String, Object> paramMap);
  List<MathData> listByChapterAll(Map<String, Object> paramMap);
  List<MathData> listByChapter(Map<String, Object> paramMap);
  List<MathData> listByQuizNumAll(Map<String, Object> paramMap);
  List<MathData> listByQuizNum(Map<String, Object> paramMap);
  List<MathData> listByBoxNumAll(Map<String, Object> paramMap);
  List<MathData> listByBoxNum(Map<String, Object> paramMap);
  
  int existQuiz(String qno);
  int insertWrongQuiz(Map<String, Object> paramMap);
  int countWrongQuiz();
  List<MathData> listWrongQuiz(Map<String, Object> paramMap);
  int deleteWrongQuiz(int no);
  
  int getQuizCount(String chapCode);
//  int isNextChapter(String nextChapterCode);

}
