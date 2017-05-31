package com.touchnbox.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.touchnbox.domain.MathData;
import com.touchnbox.service.MathDataService;

@Controller
@RequestMapping("/mathdata")
public class MathDataController {
  @Autowired MathDataService mathDataService;
  
  @RequestMapping("/insert")
  private Object insert(MathData mathData) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int count = mathDataService.insert(mathData);
    
    if(count > 0) {
      result.put("data", "success");
    } else {
      result.put("data", "fail");
    }
    
    return result;
  }
  
  @RequestMapping("/insertex")
  private Object insertEx(MathData mathData) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int count = mathDataService.insertEx(mathData);
    
    if(count > 0) {
      result.put("data", "success");
    } else {
      result.put("data", "fail");
    }
    
    return result;
  }
  
  @RequestMapping("/load")
  private Object load(String no) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    String chapCode = no.substring(0, 7);
    int currentQuizNum = Integer.parseInt(no.substring(7, 10));
    int quizCount = mathDataService.getQuizCount(chapCode);
    
    if(currentQuizNum < quizCount) {
      result.put("isNext", true);
    } else {
      result.put("isNext", false);
    }
    
    result.put("data", mathDataService.load(no));
    
    return result;
  }
  
  @RequestMapping("/loadex")
  private Object loadEx(String no) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    String chapCode = no.substring(0, 7);
    int currentQuizNum = Integer.parseInt(no.substring(7, 10));
    int quizCount = mathDataService.getExQuizCount(chapCode);
    
    if(currentQuizNum < quizCount) {
      result.put("isNext", true);
    } else {
      result.put("isNext", false);
    }
    
    result.put("data", mathDataService.exLoad(no));
    
    return result;
  }
  
  @RequestMapping("/list")
  private Object list(int no,
                @RequestParam(required=false, defaultValue="1") int pageNo,
                @RequestParam(required=false, defaultValue="15") int pageSize) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int totalCount = mathDataService.countAll(no);
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
    
    result.put("data", mathDataService.list(no, pageNo, pageSize));
    
    return result;
  }
  
  @RequestMapping("/exlist")
  private Object exList(int no,
      @RequestParam(required=false, defaultValue="1") int pageNo,
      @RequestParam(required=false, defaultValue="15") int pageSize) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int totalCount = mathDataService.countAllEx(no);
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
    
    result.put("data", mathDataService.exList(no, pageNo, pageSize));
    
    return result;
  }
  
  @RequestMapping("/detail")
  private Object detail(int no) {
    Map<String, Object> result = new HashMap<String, Object>();
    result.put("data", mathDataService.detail(no));
    
    return result;
  }
  
  @RequestMapping("/exdetail")
  private Object exDetail(int no) {
    Map<String, Object> result = new HashMap<String, Object>();
    result.put("data", mathDataService.exDetail(no));
    
    return result;
  }
  
  @RequestMapping("/listByChapter")
  private Object listByChapter(int mno, int chapCode,
                @RequestParam(required=false, defaultValue="1") int pageNo,
                @RequestParam(required=false, defaultValue="15") int pageSize) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int totalCount = mathDataService.countByChapter(mno, chapCode);
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
    
    result.put("data", mathDataService.listByChapter(mno, chapCode, pageNo, pageSize));
    
    return result;
  }
  
  @RequestMapping("/listByExChapter")
  private Object listByExChapter(int mno, int chapCode,
                @RequestParam(required=false, defaultValue="1") int pageNo,
                @RequestParam(required=false, defaultValue="15") int pageSize) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int totalCount = mathDataService.countByExChapter(mno, chapCode);
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
    
    result.put("data", mathDataService.listByExChapter(mno, chapCode, pageNo, pageSize));
    
    return result;
  }
  
  @RequestMapping("/listByQuizNumber")
  private Object listByQuizNumber(int mno, String mathCode,
                @RequestParam(required=false, defaultValue="1") int pageNo,
                @RequestParam(required=false, defaultValue="15") int pageSize) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int totalCount = mathDataService.countByQuizNum(mno, mathCode);
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
    
    result.put("data", mathDataService.listByQuizNum(mno, mathCode, pageNo, pageSize));
    
    return result;
  }
  
  @RequestMapping("/listByExQuizNumber")
  private Object listByExQuizNumber(int mno, String mathCode,
      @RequestParam(required=false, defaultValue="1") int pageNo,
      @RequestParam(required=false, defaultValue="15") int pageSize) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int totalCount = mathDataService.countByExQuizNum(mno, mathCode);
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
    
    result.put("data", mathDataService.listByExQuizNum(mno, mathCode, pageNo, pageSize));
    
    return result;
  }
  
  @RequestMapping("/listByBoxNumber")
  private Object listByBoxNumber(int mno, int boxNumber,
                @RequestParam(required=false, defaultValue="1") int pageNo,
                @RequestParam(required=false, defaultValue="15") int pageSize) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int totalCount = mathDataService.countByBoxNum(mno, boxNumber);
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
    
    result.put("data", mathDataService.listByBoxNum(mno, boxNumber, pageNo, pageSize));
    
    return result;
  }
  
  @RequestMapping("/listByExBoxNumber")
  private Object listByExBoxNumber(int mno, int boxNumber,
                @RequestParam(required=false, defaultValue="1") int pageNo,
                @RequestParam(required=false, defaultValue="15") int pageSize) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int totalCount = mathDataService.countByExBoxNum(mno, boxNumber);
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
    
    result.put("data", mathDataService.listByExBoxNum(mno, boxNumber, pageNo, pageSize));
    
    return result;
  }
  
  @RequestMapping("/delete")
  private Object delete(@RequestParam(value="delArr[]") List<String> arrParams) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int count = mathDataService.delete(arrParams);
    
    if(count > 0) {
      result.put("data", "success");
    } else {
      result.put("data", "fail");
    }
    
    return result;
  }
  
  @RequestMapping("/deleteex")
  private Object deleteEx(@RequestParam(value="delArr[]") List<String> arrParams) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int count = mathDataService.deleteEx(arrParams);
    
    if(count > 0) {
      result.put("data", "success");
    } else {
      result.put("data", "fail");
    }
    
    return result;
  }
  
  @RequestMapping("/update")
  private Object update(MathData mathData) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int count = mathDataService.update(mathData);
    
    if(count > 0) {
      result.put("data", "success");
    } else {
      result.put("data", "fail");
    }
      
    return result;
  }
  
  @RequestMapping("/updateex")
  private Object updateEx(MathData mathData) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    int count = mathDataService.updateEx(mathData);
    
    if(count > 0) {
      result.put("data", "success");
    } else {
      result.put("data", "fail");
    }
    
    return result;
  }
  
  @RequestMapping("/checkQNumber")
  private Object checkQNumber(String no) {
    Map<String, Object> result = new HashMap<String, Object>();
    int count = mathDataService.checkQuizNumber(no);
    result.put("data", count > 0 ? "no" : "yes");
    
    return result;
  }
  
  @RequestMapping("/checkExNumber")
  private Object checkExNumber(String no) {
    Map<String, Object> result = new HashMap<String, Object>();
    int count = mathDataService.checkExNumber(no);
    result.put("data", count > 0 ? "no" : "yes");
    
    return result;
  }
  
  @RequestMapping("/getQuizCount")
  private Object getQuizCount(String chapCode) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    result.put("count", mathDataService.getQuizCount(chapCode));
    
    return result;
  }
  
//  @RequestMapping("/isNextChapter")
//  private Object isNextChapter(String code) {
//    Map<String, Object> result = new HashMap<String, Object>();
//    
//    int count = mathDataService.isNextChapter(code);
//    if(count > 0) {
//      result.put("data", true);
//    } else {
//      result.put("data", false);
//    }
//    
//    return result;
//  }

}
