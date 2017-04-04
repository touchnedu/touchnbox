package com.touchnbox.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchnbox.dao.WrongDataDao;
import com.touchnbox.domain.WrongData;
import com.touchnbox.service.WrongDataService;

@Service
public class WrongDataServiceImpl implements WrongDataService {
  @Autowired WrongDataDao wrongDataDao;

  @Override
  public int exist(String qno) {
    return wrongDataDao.existQuiz(qno);
  }

  @Override
  public int insertWrongQuiz(int mno, String qno) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    paramMap.put("mno", mno);
    paramMap.put("qno", qno);
    
    return wrongDataDao.insertWrongQuiz(paramMap);
  }

  @Override
  public int countWrongQuiz() {
    return wrongDataDao.countWrongQuiz();
  }

  @Override
  public List<WrongData> listWrongQuiz(int pageNo, int pageSize) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    
    int startIndex = (pageNo - 1) * pageSize;
    if(startIndex < 0) {
      startIndex = 0;
    }
    
    paramMap.put("startIndex", startIndex);
    paramMap.put("pageSize", pageSize);
    
    return wrongDataDao.listWrongQuiz(paramMap);
  }

  @Override
  public int deleteWrongQuiz(int no) {
    return wrongDataDao.deleteWrongQuiz(no);
  }
}
