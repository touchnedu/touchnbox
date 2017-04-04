package com.touchnbox.service.impl;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchnbox.dao.MemberDao;
import com.touchnbox.domain.Member;
import com.touchnbox.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {
  @Autowired MemberDao memberDao;
  
  @Override
  public Member getMemberInfo(String id, String password) {
    HashMap<String, String> map = new HashMap<String, String>();
    map.put("id", id);
    map.put("password", password);
    
    return memberDao.exist(map);
  }
  
  @Override
  public int totalMemCount() {
    return memberDao.totalMemCount();
  }

  @Override
  public int totalCount(String today) {
    return memberDao.totalCount(today);
  }

  @Override
  public int naverStudentMale(String today) {
    return memberDao.naverStudentMale(today);
  }

  @Override
  public int naverStudentFemale(String today) {
    return memberDao.naverStudentFemale(today);
  }

  @Override
  public int naverCommonMale(String today) {
    return memberDao.naverCommonMale(today);
  }

  @Override
  public int naverCommonFemale(String today) {
    return memberDao.naverCommonFemale(today);
  }

  @Override
  public int directStudentMale(String today) {
    return memberDao.directStudentMale(today);
  }

  @Override
  public int directStudentFemale(String today) {
    return memberDao.directStudentFemale(today);
  }

  @Override
  public int directCommonMale(String today) {
    return memberDao.directCommonMale(today);
  }

  @Override
  public int directCommonFemale(String today) {
    return memberDao.directCommonFemale(today);
  }
  
  @Override
  public int totalQuitNum() {
    return memberDao.totalQuitNum();
  }

  @Override
  public int quitMemberToday(String today) {
    return memberDao.quitMemToday(today);
  }

  @Override
  public int quitMemberTodayTotal(String today) {
    return memberDao.quitMemTodayTotal(today);
  }

}
