package com.touchnbox.domain;

import java.io.Serializable;

public class MathData implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int no;
  protected int mno;
  protected String name;
  /* - 파일 제목 생성 규칙 */
  protected String imgCode;
  protected String mathCode;
  protected String chapCode;
  protected int school;
  protected int grade;
  protected int term;
  protected int bigChapter;
  protected int midChapter;
  protected int smallChapter;
  protected int boxNumber;
  protected int quizNumber01;
  protected int quizNumber02;
  /* 파일 제목 생성 규칙 - */
  protected String content;
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
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getImgCode() {
    return imgCode;
  }
  public void setImgCode(String imgCode) {
    this.imgCode = imgCode;
  }
  public String getMathCode() {
    return mathCode;
  }
  public void setMathCode(String mathCode) {
    this.mathCode = mathCode;
  }
  public String getChapCode() {
    return chapCode;
  }
  public void setChapCode(String chapCode) {
    this.chapCode = chapCode;
  }
  public int getSchool() {
    return school;
  }
  public void setSchool(int school) {
    this.school = school;
  }
  public int getGrade() {
    return grade;
  }
  public void setGrade(int grade) {
    this.grade = grade;
  }
  public int getTerm() {
    return term;
  }
  public void setTerm(int term) {
    this.term = term;
  }
  public int getBigChapter() {
    return bigChapter;
  }
  public void setBigChapter(int bigChapter) {
    this.bigChapter = bigChapter;
  }
  public int getMidChapter() {
    return midChapter;
  }
  public void setMidChapter(int midChapter) {
    this.midChapter = midChapter;
  }
  public int getSmallChapter() {
    return smallChapter;
  }
  public void setSmallChapter(int smallChapter) {
    this.smallChapter = smallChapter;
  }
  public int getBoxNumber() {
    return boxNumber;
  }
  public void setBoxNumber(int boxNumber) {
    this.boxNumber = boxNumber;
  }
  public int getQuizNumber01() {
    return quizNumber01;
  }
  public void setQuizNumber01(int quizNumber01) {
    this.quizNumber01 = quizNumber01;
  }
  public int getQuizNumber02() {
    return quizNumber02;
  }
  public void setQuizNumber02(int quizNumber02) {
    this.quizNumber02 = quizNumber02;
  }
  public String getContent() {
    return content;
  }
  public void setContent(String content) {
    this.content = content;
  }
  public String getCreateDate() {
    return createDate;
  }
  public void setCreateDate(String createDate) {
    this.createDate = createDate;
  }
  
}
