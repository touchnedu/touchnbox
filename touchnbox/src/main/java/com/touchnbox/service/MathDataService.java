package com.touchnbox.service;

import java.util.List;

import com.touchnbox.domain.MathData;

public interface MathDataService {
  int insert(MathData mathData);
  int update(MathData mathData);
  int delete(List<String> arrParams);
  int countAll(int mno);
  int countByChapter(int mno, int chapterCode);
  int countByQuizNum(int mno, String mathCode);
  int countByBoxNum(int mno, int boxNumber);
  int checkQuizNumber(String no);
  List<MathData> list(int no, int pageNo, int pageSize);
  List<MathData> listByChapter(int mno, int chapterCode, int pageNo, int pageSize);
  List<MathData> listByQuizNum(int mno, String mathCode, int pageNo, int pageSize);
  List<MathData> listByBoxNum(int mno, int boxNumber, int pageNo, int pageSize);
  String load(String no);
  MathData detail(int no);
  int getQuizCount(String chapCode);
//  int isNextChapter(String code);
  
}
