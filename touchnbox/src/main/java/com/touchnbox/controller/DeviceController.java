package com.touchnbox.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.touchnbox.domain.Device;
import com.touchnbox.service.DeviceService;

@Controller
public class DeviceController {
  @Autowired DeviceService deviceService;
  
  @RequestMapping("/existDevice")
  private Object existDevice(String id) {
    Map<String, Object> result = new HashMap<String, Object>();

    result.put("data", deviceService.existDevice(id));
    
    return result;
  }
  
  @RequestMapping("/insertDevice")
  private Object insert(Device device) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    result.put("data", deviceService.insert(device) > 0 ? "success" : "fail");
    
    return result;
  }
  
  @RequestMapping("/updateDevice")
  private Object update(Device device) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    result.put("data", deviceService.update(device) > 0 ? "success" : "fail");
    
    return result;
  }
  
  @RequestMapping("/deleteDevice")
  private Object delete(String id) {
    Map<String, Object> result = new HashMap<String, Object>();
    
    result.put("data", deviceService.delete(id) > 0 ? "success" : "fail");
    
    return result;
  }

}
