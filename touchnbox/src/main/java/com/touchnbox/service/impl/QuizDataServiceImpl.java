package com.touchnbox.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchnbox.dao.QuizDataDao;
import com.touchnbox.domain.QuizData;
import com.touchnbox.service.QuizDataService;

@Service
public class QuizDataServiceImpl implements QuizDataService {
  @Autowired QuizDataDao quizDataDao;
  
  @Override
  public int insert(QuizData quizData) {
    return quizDataDao.insert(quizData);
  }

  @Override
  public int update(QuizData quizData) {
    return quizDataDao.update(quizData);
  }
  
  @Override
  public List<QuizData> list(int no, int pageNo, int pageSize) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    
    int startIndex = (pageNo - 1) * pageSize;
    if(startIndex < 0) {
      startIndex = 0;
    }
    
    paramMap.put("no", no);
    paramMap.put("startIndex", startIndex);
    paramMap.put("pageSize", pageSize);
    if(no == 1001 || no == 1005) {
      System.out.println("no : " + no);
      return quizDataDao.listAll(paramMap);
    } else {
      return quizDataDao.list(paramMap);
    }
    
  }

  @Override
  public List<QuizData> listByChapter(int mno, int chapCode) {
    HashMap<String, Integer> chapterInfo = new HashMap<String, Integer>();
    chapterInfo.put("mno", mno);
    chapterInfo.put("chapCode", chapCode);

    if(mno == 1001 || mno == 1005) {
      return quizDataDao.listByChapterAll(chapCode);
    } else {
      return quizDataDao.listByChapter(chapterInfo);
    }
    
  }

  @Override
  public QuizData detail(int no) {
    return quizDataDao.detail(no);
  }
  
  @Override
  public QuizData load(long no) {
    return quizDataDao.load(no);
  }

  @Override
  public int delete(List<String> arrParams) {
    int delCount = 0;
    for(int i = 0; i < arrParams.size(); i++) {
      if(quizDataDao.delete(Integer.parseInt(arrParams.get(i))) == 1) {
        System.out.println("번호 : " + arrParams.get(i));
        ++delCount;
      }
    }
    if(delCount == arrParams.size()) {
      return 1;
    } else {
      return 0;
    }
  }

  @Override
  public int exist(long typeCode) {
    return quizDataDao.exist(typeCode);
  }

  @Override
  public int countAll(int no) {
    if(no == 1001 || no == 1005) {
      return quizDataDao.totalCount();
    } else {
      return quizDataDao.countAll(no);
    }
  }


}
