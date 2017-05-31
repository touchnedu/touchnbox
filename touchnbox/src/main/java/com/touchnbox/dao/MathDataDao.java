package com.touchnbox.dao;

import java.util.List;
import java.util.Map;

import com.touchnbox.domain.MathData;

public interface MathDataDao {
  int insert(MathData mathData);  
  int insertEx(MathData mathData);
  int update(MathData mathData);
  int updateEx(MathData mathData);
  int delete(int no);
  int deleteEx(int no);
  int checkQuizNumber(String no);
  int checkExNumber(String no);
  String load(String no);
  String exLoad(String no);
  MathData detail(int no);
  MathData exDetail(int no);

  int totalCount();
  int totalExCount();
  int countAll(int no);
  int countAllEx(int no);
  int countByChapter(Map<String, Object> paramMap);
  int countByExChapter(Map<String, Object> paramMap);
  int countAllByChapter(int chapCode);
  int countAllByExChapter(int chapCode);
  int countByQuizNum(Map<String, Object> paramMap);
  int countByExQuizNum(Map<String, Object> paramMap);
  int countAllByQuizNum(String mathCode);
  int countAllByExQuizNum(String mathCode);
  int countByBoxNum(Map<String, Object> paramMap);
  int countByExBoxNum(Map<String, Object> paramMap);
  int countAllByBoxNum(int boxNumber);
  int countAllExByBoxNum(int boxNumber);
  
  List<MathData> listAll(Map<String, Object> paramMap);
  List<MathData> exListAll(Map<String, Object> paramMap);
  List<MathData> list(Map<String, Object> paramMap);
  List<MathData> exLlist(Map<String, Object> paramMap);
  List<MathData> listByChapterAll(Map<String, Object> paramMap);
  List<MathData> listByExChapterAll(Map<String, Object> paramMap);
  List<MathData> listByChapter(Map<String, Object> paramMap);
  List<MathData> listByExChapter(Map<String, Object> paramMap);
  List<MathData> listByQuizNumAll(Map<String, Object> paramMap);
  List<MathData> listByExQuizNumAll(Map<String, Object> paramMap);
  List<MathData> listByQuizNum(Map<String, Object> paramMap);
  List<MathData> listByExQuizNum(Map<String, Object> paramMap);
  List<MathData> listByBoxNumAll(Map<String, Object> paramMap);
  List<MathData> listByExBoxNumAll(Map<String, Object> paramMap);
  List<MathData> listByBoxNum(Map<String, Object> paramMap);
  List<MathData> listByExBoxNum(Map<String, Object> paramMap);
  
  int existQuiz(String qno);
  int insertWrongQuiz(Map<String, Object> paramMap);
  int countWrongQuiz();
  List<MathData> listWrongQuiz(Map<String, Object> paramMap);
  int deleteWrongQuiz(int no);
  
  int getQuizCount(String chapCode);
  int getExQuizCount(String chapCode);

}
