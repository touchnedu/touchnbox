<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>

<%

request.setCharacterEncoding("UTF-8");

String no = request.getParameter("no");

Connection con = null;
Statement stmt = null;

try {
  Class.forName("com.mysql.jdbc.Driver");
  con = DriverManager.getConnection("jdbc:mysql://localhost/touchnbox", "touchnbox", "xjcl77!2");
  if(con == null)
    throw new Exception("데이터베이스에 연결할 수 없습니다.");
  
  stmt = con.createStatement();
  String updateQuitDate = String.format("update MEMBER set quit_dt=now() where mno=%s", no);
  String copyQuery = String.format(
      "insert into QUITMEMBER(mno, id, password, name, nickname, photo, sex, age, job, device_id, cre_dt, quit_dt) " +
      "(SELECT mno, id, password, name, nickname, photo, sex, age, job, device_id, cre_dt, quit_dt from MEMBER where mno='%s');", 
      no);
  String deleteQuery = String.format("delete from MEMBER where mno=%s", no);
  
  int updateNum = stmt.executeUpdate(updateQuitDate);
  if(updateNum > 0) {
	  int rowNum = stmt.executeUpdate(copyQuery);
	  if(rowNum > 0) {
	    int delNum = stmt.executeUpdate(deleteQuery);
	    if(delNum > 0)
	      out.print("success");
	    else
	      out.print("fail");
	  } else {
	    out.print("fail");
	    throw new Exception("데이터를 DB에 입력할 수 없습니다.");
	  }
  }
  
} finally {
  try {
    stmt.close();
  } catch(Exception ignored) { }
  try {
    con.close();
  } catch(Exception ignored) { }
} 

%>
