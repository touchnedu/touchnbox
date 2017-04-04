package com.touchnbox.domain;

import java.io.Serializable;

public class QuizData implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int no;
  /* - 파일 제목 생성 규칙 */
  protected long typeCode;
  protected int chapCode;
  protected int countryCode;
  protected int school;
  protected int grade;
  protected int term;
  protected int bigChapter;
  protected int midChapter;
  protected int smallChapter;
  protected int difficulty;
  protected int boxNumber;
  protected int quizNumber01;
  protected int quizNumber02;
  /* 파일 제목 생성 규칙 - */
  protected int mno;
  protected String title;
  protected String content;
  protected String createDate;
  
  /* getter, setter */
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public long getTypeCode() {
    return typeCode;
  }
  public void setTypeCode(long typeCode) {
    this.typeCode = typeCode;
  }
  public int getChapCode() {
    return chapCode;
  }
  public void setChapCode(int chapCode) {
    this.chapCode = chapCode;
  }
  public int getCountryCode() {
    return countryCode;
  }
  public void setCountryCode(int countryCode) {
    this.countryCode = countryCode;
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
  public int getDifficulty() {
    return difficulty;
  }
  public void setDifficulty(int difficulty) {
    this.difficulty = difficulty;
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
  public int getMno() {
    return mno;
  }
  public void setMno(int mno) {
    this.mno = mno;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
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
