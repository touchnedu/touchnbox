<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>

<%

String id = request.getParameter("id");
String password = request.getParameter("password");

Connection con = null;
Statement stmt = null;

try {
  Class.forName("com.mysql.jdbc.Driver");
  con = DriverManager.getConnection("jdbc:mysql://localhost/touchnbox", "touchnbox", "xjcl77!2");
  if(con == null)
    throw new Exception("데이터베이스에 연결할 수 없습니다.");
  
  stmt = con.createStatement();
  String query = String.format("select mno from MEMBER where id='%s' and password=PASSWORD('%s')", id, password);
  
  ResultSet rs = stmt.executeQuery(query);
  int rowCount = 0;
  if(rs.next())
    rowCount = rs.getInt(1);
  
  if(rowCount > 0) 
    out.print(rowCount);
  else 
    out.print("0");
  rs.close();
    
} finally {
  try {
    stmt.close();
    con.close();
  } catch(Exception ignored) { }
}

%>