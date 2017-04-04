package com.touchnbox.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.touchnbox.domain.QuizData;

public interface QuizDataDao {
  int insert(QuizData quizData);
  int update(QuizData quizData);
  int delete(int no);
  int exist(long typeCode);
  int totalCount();
  int countAll(int no);
  List<QuizData> list(Map<String, Object> paramMap);
  List<QuizData> listAll(Map<String, Object> paramMap);
  List<QuizData> listByChapter(HashMap<String, Integer> chapterInfo);
  List<QuizData> listByChapterAll(int chapCode);
  QuizData load(long no);
  QuizData detail(int no);

}
