<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>

<%

request.setCharacterEncoding("UTF-8");

String email = request.getParameter("email");
String curPwd = request.getParameter("curPwd");
String newPwd = request.getParameter("newPwd");

Connection con = null;
Statement stmt = null;

try {
  Class.forName("com.mysql.jdbc.Driver");
  con = DriverManager.getConnection("jdbc:mysql://localhost/touchnbox", "touchnbox", "xjcl77!2");
  if(con == null)
    throw new Exception("데이터베이스에 연결할 수 없습니다.");
  
  stmt = con.createStatement();
  String selectQuery = String.format("select mno from MEMBER where id='%s' and password=PASSWORD('%s')", email, curPwd);
  String updateQuery = String.format("update MEMBER set password=PASSWORD('%s') " +
												       "where id='%s' and password=PASSWORD('%s');", 
												       newPwd, email, curPwd);
  
  ResultSet rs = stmt.executeQuery(selectQuery);
  int rowCount = 0;
  if(rs.next())
    rowCount = rs.getInt(1);
  if(rowCount > 0) { 
    int rowNum = stmt.executeUpdate(updateQuery);
    if(rowNum > 0) {
      out.print("success");
    } else {
      out.print("fail");
      throw new Exception("데이터를 DB에 입력할 수 없습니다.");
    }
  } else { 
    out.print("fail");
  }
  rs.close();
  
} finally {
  try {
    stmt.close();
  } catch(Exception ignored) { }
  try {
    con.close();
  } catch(Exception ignored) { }
} 


%>