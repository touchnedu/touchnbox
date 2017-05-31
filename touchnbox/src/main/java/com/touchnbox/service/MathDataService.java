package com.touchnbox.service;

import java.util.List;

import com.touchnbox.domain.MathData;

public interface MathDataService {
  int insert(MathData mathData);
  int insertEx(MathData mathData);
  int update(MathData mathData);
  int updateEx(MathData mathData);
  int delete(List<String> arrParams);
  int deleteEx(List<String> arrParams);
  int countAll(int mno);
  int countAllEx(int no);
  int countByChapter(int mno, int chapterCode);
  int countByExChapter(int mno, int chapCode);
  int countByQuizNum(int mno, String mathCode);
  int countByExQuizNum(int mno, String mathCode);
  int countByBoxNum(int mno, int boxNumber);
  int countByExBoxNum(int mno, int boxNumber);
  
  int checkQuizNumber(String no);
  int checkExNumber(String no);
  List<MathData> list(int no, int pageNo, int pageSize);
  List<MathData> exList(int no, int pageNo, int pageSize);
  List<MathData> listByChapter(int mno, int chapterCode, int pageNo, int pageSize);
  List<MathData> listByExChapter(int mno, int chapCode, int pageNo, int pageSize);
  List<MathData> listByQuizNum(int mno, String mathCode, int pageNo, int pageSize);
  List<MathData> listByExQuizNum(int mno, String mathCode, int pageNo, int pageSize);
  List<MathData> listByBoxNum(int mno, int boxNumber, int pageNo, int pageSize);
  List<MathData> listByExBoxNum(int mno, int boxNumber, int pageNo, int pageSize);
  
  String load(String no);
  String exLoad(String no);
  MathData detail(int no);
  MathData exDetail(int no);
  int getQuizCount(String chapCode);
  int getExQuizCount(String chapCode);
//  int isNextChapter(String code);
  
}
