package com.touchnbox.service;

import com.touchnbox.domain.Device;

public interface DeviceService {
  Device existDevice(String id);
  int insert(Device device);
  int update(Device device);
  int delete(String id);

}
