<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" 
         import="java.text.SimpleDateFormat" 
         import="java.util.Calendar "%>

<%

request.setCharacterEncoding("UTF-8");

String msg = request.getParameter("error");

Calendar cal = Calendar.getInstance();
SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
String todayInfo = dateFormat.format(cal.getTime());

System.out.println("==========================================================");
System.out.println("날짜 : " + todayInfo);
System.out.println("에러 내용");
System.out.println("----------------------------------------------------------");
System.out.println(msg);
System.out.println("----------------------------------------------------------");

%>