package com.touchnbox.service;

import java.util.List;

import com.touchnbox.domain.QuizData;

public interface QuizDataService {

  int insert(QuizData quizData);
  int update(QuizData quizData);
  int delete(List<String> arrParams);
  int exist(long typeCode);
  int countAll(int no);
  List<QuizData> list(int no, int pageNo, int pageSize);
  List<QuizData> listByChapter(int mno, int chapCode);
  QuizData load(long no);
  QuizData detail(int no);
  
}
