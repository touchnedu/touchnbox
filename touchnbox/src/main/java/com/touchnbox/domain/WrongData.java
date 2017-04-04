package com.touchnbox.domain;

import java.io.Serializable;

public class WrongData implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int no;
  protected int mno;
  protected String qno;
  protected String name;
  protected String createDate;
  
  /* getter, setter */
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getMno() {
    return mno;
  }
  public void setMno(int mno) {
    this.mno = mno;
  }
  public String getQno() {
    return qno;
  }
  public void setQno(String qno) {
    this.qno = qno;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getCreateDate() {
    return createDate;
  }
  public void setCreateDate(String createDate) {
    this.createDate = createDate;
  }
  
}
