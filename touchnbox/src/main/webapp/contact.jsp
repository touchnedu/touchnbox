<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>

<%

String mno = request.getParameter("mno");
String title = request.getParameter("title");
String content = request.getParameter("content");

Connection con = null;
Statement stmt = null;

try {
  Class.forName("com.mysql.jdbc.Driver");
  con = DriverManager.getConnection("jdbc:mysql://localhost/touchnbox", "touchnbox", "xjcl77!2");
  if(con == null)
    throw new Exception("데이터베이스에 연결할 수 없습니다.");
  
  stmt = con.createStatement();
  String query = String.format("insert into CONTACT(mno, title, content, cre_dt)" 
                               + " values('%s', '%s', '%s', now());", 
                               mno, title, content);
  
  int rowNum = stmt.executeUpdate(query);
  if(rowNum > 0) {
    out.print("success");
  } else {
    out.print("fail");
    throw new Exception("데이터를 DB에 입력할 수 없습니다.");
  }
    
} finally {
  try {
    stmt.close();
    con.close();
  } catch(Exception ignored) { }
}

%>