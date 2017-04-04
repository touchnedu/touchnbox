package com.touchnbox.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.touchnbox.service.WrongDataService;

@Controller
@RequestMapping("/wrongdata")
public class WrongDataController {
  @Autowired WrongDataService wrongDataService;
  
  @RequestMapping("/insertWrongQuiz")
  private Object insertWrongQuiz(int mno, String qno) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int exist = wrongDataService.exist(qno);
    if(exist > 0) {
      result.put("data", "no");
    } else {
      int count = wrongDataService.insertWrongQuiz(mno, qno);
      if(count > 0) {
        result.put("data", "success");
      } else {
        result.put("data", "fail");
      }
    }
    
    return result;
  }
  
  @RequestMapping("/listWrongQuiz")
  private Object listWrongQuiz(
                @RequestParam(required=false, defaultValue="1") int pageNo,
                @RequestParam(required=false, defaultValue="15") int pageSize) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int totalCount = wrongDataService.countWrongQuiz();
    int lastPageNo = totalCount / pageSize;
    
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
    
    result.put("data", wrongDataService.listWrongQuiz(pageNo, pageSize));
    
    return result;
  }
  
  @RequestMapping("/deleteWrongQuiz")
  private Object deleteWrongQuiz(int no) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int count = wrongDataService.deleteWrongQuiz(no);
    
    if(count > 0) {
      result.put("data", "success");
    } else {
      result.put("data", "fail");
    }
    
    return result;
  }
  

}
