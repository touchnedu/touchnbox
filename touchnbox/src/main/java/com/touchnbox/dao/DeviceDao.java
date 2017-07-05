package com.touchnbox.dao;

import com.touchnbox.domain.Device;

public interface DeviceDao {
  Device existDevice(String id);
  int update(Device device);
  int delete(String id);
  int insert(Device device);
  
}
