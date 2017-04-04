<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" 
         import="java.text.SimpleDateFormat" 
         import="java.util.Calendar "%>

<%

request.setCharacterEncoding("UTF-8");

String id = request.getParameter("id");
String pwd = request.getParameter("password");
String name = request.getParameter("name");

String nickname = request.getParameter("nickname");
String photo = request.getParameter("photo");
String sex = request.getParameter("sex");
String age = request.getParameter("age");
String job = request.getParameter("job"); 
String deviceId = request.getParameter("device_id");

/* out.print("id : " + id + "\n");
out.print("name : " + name + "\n");
out.print("nickname : " + nickname + "\n");
out.print("photo : " + photo + "\n");
out.print("sex : " + sex + "\n"); */

Calendar cal = Calendar.getInstance();
SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
String todayInfo = dateFormat.format(cal.getTime());

System.out.println("--------------------");
System.out.println("" + todayInfo);
System.out.println("id : " + id);
System.out.println("job : " + job);
System.out.println("=====================================");

Connection con = null;
Statement stmt = null;

try {
  Class.forName("com.mysql.jdbc.Driver");
  con = DriverManager.getConnection("jdbc:mysql://localhost/touchnbox", "touchnbox", "xjcl77!2");
  if(con == null)
    throw new Exception("데이터베이스에 연결할 수 없습니다.");
  
  stmt = con.createStatement();
  
  String selectQuery = String.format("select mno from MEMBER where id='%s'", id);
  String query = String.format("insert into MEMBER(id, password, name, nickname, photo, sex, age, job, device_id, cre_dt) " +
												       "values('%s', PASSWORD('%s'), '%s', '%s', '%s', '%s', '%s', '%s', '%s', now());", 
												       id, pwd, name, nickname, photo, sex, age, job, deviceId);
  
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