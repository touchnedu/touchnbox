package com.touchnbox.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchnbox.dao.MathDataDao;
import com.touchnbox.domain.MathData;
import com.touchnbox.service.MathDataService;

@Service
public class MathDataServiceImpl implements MathDataService {
  @Autowired MathDataDao mathDataDao;
  
  @Override
  public int insert(MathData mathData) {
    return mathDataDao.insert(mathData);
  }

  @Override
  public int insertEx(MathData mathData) {
    return mathDataDao.insertEx(mathData);
  }
  
  @Override
  public int update(MathData mathData) {
    return mathDataDao.update(mathData);
  }
  
  @Override
  public int updateEx(MathData mathData) {
    return mathDataDao.updateEx(mathData);
  }
  
  @Override
  public int delete(List<String> arrParams) {
    int delCount = 0;
    for(int i = 0; i < arrParams.size(); i++) {
      if(mathDataDao.delete(Integer.parseInt(arrParams.get(i))) == 1) {
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
  public int deleteEx(List<String> arrParams) {
    int delCount = 0;
    for(int i = 0; i < arrParams.size(); i++) {
      if(mathDataDao.deleteEx(Integer.parseInt(arrParams.get(i))) == 1) {
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
  public String load(String no) {
    return mathDataDao.load(no);
  }
  
  @Override
  public String exLoad(String no) {
    return mathDataDao.exLoad(no);
  }
  
  @Override
  public int countAll(int no) {
    if(no == 1001 || no == 1005) {
      return mathDataDao.totalCount();
    } else {
      return mathDataDao.countAll(no);
    }
  }

  @Override
  public int countAllEx(int no) {
    if(no == 1001 || no == 1005) {
      return mathDataDao.totalExCount();
    } else {
      return mathDataDao.countAllEx(no);
    }
  }
  
  @Override
  public int countByChapter(int mno, int chapCode) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    paramMap.put("mno", mno);
    paramMap.put("chapCode", chapCode);
    
    if(mno == 1001 || mno == 1005) {
      return mathDataDao.countAllByChapter(chapCode);
    } else {
      return mathDataDao.countByChapter(paramMap);
    }
    
  }

  @Override
  public int countByExChapter(int mno, int chapCode) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    paramMap.put("mno", mno);
    paramMap.put("chapCode", chapCode);
    
    if(mno == 1001 || mno == 1005) {
      return mathDataDao.countAllByExChapter(chapCode);
    } else {
      return mathDataDao.countByExChapter(paramMap);
    }
    
  }
  
  @Override
  public List<MathData> list(int no, int pageNo, int pageSize) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    
    int startIndex = (pageNo - 1) * pageSize;
    if(startIndex < 0) {
      startIndex = 0;
    }
    
    paramMap.put("no", no);
    paramMap.put("startIndex", startIndex);
    paramMap.put("pageSize", pageSize);
    
    if(no == 1001 || no == 1005) {
      return mathDataDao.listAll(paramMap);
    } else {
      return mathDataDao.list(paramMap);
    }
  }
  
  @Override
  public List<MathData> exList(int no, int pageNo, int pageSize) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    
    int startIndex = (pageNo - 1) * pageSize;
    if(startIndex < 0) {
      startIndex = 0;
    }
    
    paramMap.put("no", no);
    paramMap.put("startIndex", startIndex);
    paramMap.put("pageSize", pageSize);
    
    if(no == 1001 || no == 1005) {
      return mathDataDao.exListAll(paramMap);
    } else {
      return mathDataDao.exLlist(paramMap);
    }
  }
  
  @Override
  public List<MathData> listByChapter(int mno, int chapCode, 
                                                    int pageNo, int pageSize) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    
    int startIndex = (pageNo - 1) * pageSize;
    if(startIndex < 0) {
      startIndex = 0;
    }
    
    paramMap.put("mno", mno);
    paramMap.put("chapCode", chapCode);
    paramMap.put("startIndex", startIndex);
    paramMap.put("pageSize", pageSize);
    
    if(mno == 1001 || mno == 1005) {
      return mathDataDao.listByChapterAll(paramMap);
    } else {
      return mathDataDao.listByChapter(paramMap);
    }
  }

  @Override
  public List<MathData> listByExChapter(int mno, int chapCode, 
                                                    int pageNo, int pageSize) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    
    int startIndex = (pageNo - 1) * pageSize;
    if(startIndex < 0) {
      startIndex = 0;
    }
    
    paramMap.put("mno", mno);
    paramMap.put("chapCode", chapCode);
    paramMap.put("startIndex", startIndex);
    paramMap.put("pageSize", pageSize);
    
    if(mno == 1001 || mno == 1005) {
      return mathDataDao.listByExChapterAll(paramMap);
    } else {
      return mathDataDao.listByExChapter(paramMap);
    }
  }
  
  @Override
  public int countByQuizNum(int mno, String mathCode) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    paramMap.put("mno", mno);
    paramMap.put("mathCode", mathCode);
    
    if(mno == 1001 || mno == 1005) {
      return mathDataDao.countAllByQuizNum(mathCode);
    } else {
      return mathDataDao.countByQuizNum(paramMap);
    }
  }

  @Override
  public int countByExQuizNum(int mno, String mathCode) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    paramMap.put("mno", mno);
    paramMap.put("mathCode", mathCode);
    
    if(mno == 1001 || mno == 1005) {
      return mathDataDao.countAllByExQuizNum(mathCode);
    } else {
      return mathDataDao.countByExQuizNum(paramMap);
    }
  }
  
  @Override
  public int countByBoxNum(int mno, int boxNumber) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    paramMap.put("mno", mno);
    paramMap.put("boxNumber", boxNumber);
    
    if(mno == 1001 || mno == 1005) {
      return mathDataDao.countAllByBoxNum(boxNumber);
    } else {
      return mathDataDao.countByBoxNum(paramMap);
    }
  }

  @Override
  public int countByExBoxNum(int mno, int boxNumber) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    paramMap.put("mno", mno);
    paramMap.put("boxNumber", boxNumber);
    
    if(mno == 1001 || mno == 1005) {
      return mathDataDao.countAllExByBoxNum(boxNumber);
    } else {
      return mathDataDao.countByExBoxNum(paramMap);
    }
  }
  
  @Override
  public List<MathData> listByQuizNum(int mno, String mathCode, 
                                                    int pageNo, int pageSize) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    
    int startIndex = (pageNo - 1) * pageSize;
    if(startIndex < 0) {
      startIndex = 0;
    }
    
    paramMap.put("mno", mno);
    paramMap.put("mathCode", mathCode);
    paramMap.put("startIndex", startIndex);
    paramMap.put("pageSize", pageSize);
    
    if(mno == 1001 || mno == 1005) {
      return mathDataDao.listByQuizNumAll(paramMap);
    } else {
      return mathDataDao.listByQuizNum(paramMap);
    }
  }

  @Override
  public List<MathData> listByExQuizNum(int mno, String mathCode, 
                                                    int pageNo, int pageSize) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    
    int startIndex = (pageNo - 1) * pageSize;
    if(startIndex < 0) {
      startIndex = 0;
    }
    
    paramMap.put("mno", mno);
    paramMap.put("mathCode", mathCode);
    paramMap.put("startIndex", startIndex);
    paramMap.put("pageSize", pageSize);
    
    if(mno == 1001 || mno == 1005) {
      return mathDataDao.listByExQuizNumAll(paramMap);
    } else {
      return mathDataDao.listByExQuizNum(paramMap);
    }
  }
  
  @Override
  public List<MathData> listByBoxNum(int mno, int boxNumber, 
                                                    int pageNo, int pageSize) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    
    int startIndex = (pageNo - 1) * pageSize;
    if(startIndex < 0) {
      startIndex = 0;
    }
    
    paramMap.put("mno", mno);
    paramMap.put("boxNumber", boxNumber);
    paramMap.put("startIndex", startIndex);
    paramMap.put("pageSize", pageSize);
    
    if(mno == 1001 || mno == 1005) {
      return mathDataDao.listByBoxNumAll(paramMap);
    } else {
      return mathDataDao.listByBoxNum(paramMap);
    }
  }

  @Override
  public List<MathData> listByExBoxNum(int mno, int boxNumber, 
                                                    int pageNo, int pageSize) {
    Map<String, Object> paramMap = new HashMap<String, Object>();
    
    int startIndex = (pageNo - 1) * pageSize;
    if(startIndex < 0) {
      startIndex = 0;
    }
    
    paramMap.put("mno", mno);
    paramMap.put("boxNumber", boxNumber);
    paramMap.put("startIndex", startIndex);
    paramMap.put("pageSize", pageSize);
    
    if(mno == 1001 || mno == 1005) {
      return mathDataDao.listByExBoxNumAll(paramMap);
    } else {
      return mathDataDao.listByExBoxNum(paramMap);
    }
  }
  
  @Override
  public MathData detail(int no) {
    return mathDataDao.detail(no);
  }

  @Override
  public MathData exDetail(int no) {
    return mathDataDao.exDetail(no);
  }
  
  @Override
  public int checkQuizNumber(String no) {
    return mathDataDao.checkQuizNumber(no);
  }
  
  @Override
  public int checkExNumber(String no) {
    return mathDataDao.checkExNumber(no);
  }

  @Override
  public int getQuizCount(String chapCode) {
    return mathDataDao.getQuizCount(chapCode);
  }
  
  @Override
  public int getExQuizCount(String chapCode) {
    return mathDataDao.getExQuizCount(chapCode);
  }

//  @Override
//  public int isNextChapter(String code) {
//    int nextChapter = Integer.parseInt(code.substring(5)) + 1;
//    String nextChapterCode;
//    if(nextChapter < 10) {
//      nextChapterCode = code.substring(0, 5) + "0" + nextChapter; 
//    } else {
//      nextChapterCode = code.substring(0, 5) + nextChapter;
//    }
//    
//    return mathDataDao.isNextChapter(nextChapterCode);
//  }

}
