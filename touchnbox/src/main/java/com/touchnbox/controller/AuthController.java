package com.touchnbox.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.touchnbox.domain.Member;
import com.touchnbox.service.MemberService;

@Controller
@RequestMapping("/auth")
public class AuthController {
  @Autowired MemberService memberService;
  
  @RequestMapping("/login")
  private Object login(String id, String password, 
                              HttpSession session, HttpServletRequest request) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    HashMap<String, Object> memberInfo = new HashMap<String, Object>();
    memberInfo.put("id", id);
    memberInfo.put("password", password);
    
    Member member = memberService.getMemberInfo(id, password);
    
    String getIp = getClientIpAddr(request);
    result.put("ip", getIp);
    
    if(member != null) {
      result.put("data", "success");
      session.setAttribute("member", member);
      /* 10 시간 동안 클라이언트 요청이 없으면 세션 소멸 */
      session.setMaxInactiveInterval(36000);
      
    } else {
      session.invalidate();
      result.put("data", "fail");
    }
    return result;
    
  }
  
  @RequestMapping("/logout")
  private Object logout(HttpSession session) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    session.invalidate();
    result.put("data", "success");
    
    return result;
  }
  
  @RequestMapping("/loginInfo")
  private Object sessionInfo(HttpSession session) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    Member member = (Member)session.getAttribute("member");
    if(member == null) {
      result.put("state", "no");
    } else {
      result.put("state", "yes");
      result.put("member", member);
    }
    
    return result;
  }
  
  private String getClientIpAddr(HttpServletRequest request) {
    String currentIp = request.getHeader("X-FORWARDED-FOR");
    
    if(currentIp == null || currentIp.length() == 0) {
      currentIp = request.getHeader("Proxy-Client-IP");
    }
    if(currentIp == null || currentIp.length() == 0) {
      currentIp = request.getHeader("WL-Proxy-Client-IP");
    }
    if(currentIp == null || currentIp.length() == 0) {
      currentIp = request.getRemoteAddr();
    }
    
    return currentIp;
  }

}
