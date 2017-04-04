package com.touchnbox.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.touchnbox.domain.QuizData;
import com.touchnbox.service.QuizDataService;

@Controller
@RequestMapping("/math")
public class QuizDataController {
  @Autowired QuizDataService quizDataService;
  
  @RequestMapping("/insert")
  private Object insert(QuizData quizData) {
    HashMap<String, Object> result = new HashMap<String, Object>(); 
    
    int count = quizDataService.insert(quizData);
    if(count > 0) {
      result.put("data", "success");
    } else {
      result.put("data", "fail");
    }
    
    return result;
  }
  
  @RequestMapping("/update")
  private Object update(QuizData quizData) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int count = quizDataService.update(quizData);
    if(count > 0) {
      result.put("data", "success");
    } else {
      result.put("data", "fail");
    }
    
    return result;
  }
  
  @RequestMapping("/list")
  private Object list(int no, 
                @RequestParam(required=false, defaultValue="1") int pageNo,
                @RequestParam(required=false, defaultValue="15") int pageSize) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int totalCount = quizDataService.countAll(no);
    int lastPageNo = totalCount / pageSize;
    
    /* 전체 카운트를 한 페이지에 표시되는 페이지 사이즈로 나눈 나머지가 0이 아닐 때
     * 마지막 페이지가 존재하도록 값을 증가 */
    if(totalCount % pageSize > 0) {
      lastPageNo++;
    }
    if(pageNo < lastPageNo) {
      result.put("isNextPage", true);
    } else {
      result.put("isNextPage", false);
    }
    
    result.put("pageNo", pageNo);
    result.put("pageSize", pageSize);
    
    result.put("data", quizDataService.list(no, pageNo, pageSize));
    
    return result;
  }
  
  @RequestMapping("/listByChapter")
  private Object listByChapter(int mno, int chapCode) {
    Map<String, Object> result = new HashMap<String, Object>();
    result.put("data", quizDataService.listByChapter(mno, chapCode));
    
    return result;
  }
  
  @RequestMapping("/detail")
  private Object detail(int no) {
    Map<String, Object> result = new HashMap<String, Object>();
    result.put("data", quizDataService.detail(no));
    
    return result;
  }
  
  @RequestMapping("/delete")
  private Object delete(@RequestParam(value="delArr[]") List<String> arrParams) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int count = quizDataService.delete(arrParams);
    if(count == 1) {
      result.put("data", "success");
    } else {
      result.put("data", "fail");
    }
    
    return result;
  }
  
  @RequestMapping("/load")
  private Object load(long code) {
    Map<String, Object> result = new HashMap<String, Object>();
    result.put("data", quizDataService.load(code));
    
    return result;
  }
  
  @RequestMapping("/validateCode")
  private Object validateCode(long typeCode) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int count = quizDataService.exist(typeCode);
    if(count > 0) {
      result.put("data", "yes");
    } else {
      result.put("data", "no");
    }
    
    return result;
  }
  
}
