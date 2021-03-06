<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" 
         import="java.text.SimpleDateFormat" 
         import="java.util.Calendar "%>

<%

request.setCharacterEncoding("UTF-8");

String account = request.getParameter("account");
String productId = request.getParameter("productId");
String orderId = request.getParameter("orderId");

Connection con = null;
Statement stmt = null;

try {
  Class.forName("com.mysql.jdbc.Driver");
  con = DriverManager.getConnection("jdbc:mysql://localhost/touchnbox", "touchnbox", "xjcl77!2");
  if(con == null)
    throw new Exception("데이터베이스에 연결할 수 없습니다.");
  
  stmt = con.createStatement();
  String query = String.format("insert into PURCHASEINFO(account, order_id, product_id, cre_dt) " +
												       "values('%s', '%s', '%s', now());", 
												       account, orderId, productId);
  
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
  } catch(Exception ignored) { }
  try {
    con.close();
  } catch(Exception ignored) { }
} 

%>