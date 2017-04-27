package com.touchnbox.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

@Controller
public class SheduleController {
  
  @Scheduled(cron="0 0 0 * * ?")
  public void doScheduleCheckDevice() {
    SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.KOREA);
    Date currentTime = new Date();
    String time = date.format(currentTime);
    System.out.println(time + " Schedule Start ...");
  }
  
}
