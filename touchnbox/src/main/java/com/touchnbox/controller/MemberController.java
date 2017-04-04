package com.touchnbox.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.touchnbox.domain.Member;
import com.touchnbox.service.MemberService;

@Controller
@RequestMapping("/member")
public class MemberController {
  @Autowired MemberService memberService;
  
  @RequestMapping("/insert")
  private Object insert(Member member) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    return result;
  }
  
  @RequestMapping("/quit")
  private Object quit(Member member) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    return result;
  }
  
  @RequestMapping("/update")
  private Object update(Member member) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    return result;
  }
  
  @RequestMapping("/stats")
  private Object stats(String today) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    result.put("total_mem", memberService.totalMemCount());   // 전체
    result.put("today_all", memberService.totalCount(today)); // 일별 전체
    
    result.put("naversm", memberService.naverStudentMale(today));   // 네이버 학생 & 남자
    result.put("naversf", memberService.naverStudentFemale(today)); // 네이버 학생 & 여자
    result.put("navercm", memberService.naverCommonMale(today));    // 네이버 일반 & 남자
    result.put("navercf", memberService.naverCommonFemale(today));  // 네이버 일반 & 여자
    
    result.put("directsm", memberService.directStudentMale(today));   // 직접 학생 & 남자
    result.put("directsf", memberService.directStudentFemale(today)); // 직접 학생 & 여자
    result.put("directcm", memberService.directCommonMale(today));    // 직접 일반 & 남자
    result.put("directcf", memberService.directCommonFemale(today));  // 직접 일반 & 여자
    
    result.put("totalquitnum", memberService.totalQuitNum());
    result.put("quittodaytotal", memberService.quitMemberTodayTotal(today));  // 조회일 이전 탈퇴
    result.put("quittoday", memberService.quitMemberToday(today));        // 조회일 탈퇴
    
    return result;
  }

}
