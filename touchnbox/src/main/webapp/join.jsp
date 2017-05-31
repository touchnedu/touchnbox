<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" 
         import="java.text.SimpleDateFormat" 
         import="java.util.Calendar "%>

<%

request.setCharacterEncoding("UTF-8");

String id = request.getParameter("id");
String os = request.getParameter("os");

Connection con = null;
Statement stmt = null;

try {
  Class.forName("com.mysql.jdbc.Driver");
  con = DriverManager.getConnection("jdbc:mysql://localhost/touchnbox", "touchnbox", "xjcl77!2");
  if(con == null)
    throw new Exception("데이터베이스에 연결할 수 없습니다.");
  
  stmt = con.createStatement();
  
  String selectQuery = String.format("select mno from MEMB where account='%s'", id);
  String query = String.format("insert into MEMB(account, os, cre_dt) values('%s', '%s', now());", id, os);
  
  ResultSet rs = stmt.executeQuery(selectQuery);
  int rowCount = 0;
  if(rs.next())
    rowCount = rs.getInt(1);
  
  if(rowCount > 0) { 
    out.print("exist");
  } else { 
    int rowNum = stmt.executeUpdate(query);
    if(rowNum > 0) {
      out.print("success");
    } else {
      out.print("fail");
      throw new Exception("데이터를 DB에 입력할 수 없습니다.");
    }
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