package com.touchnbox.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchnbox.dao.DeviceDao;
import com.touchnbox.domain.Device;
import com.touchnbox.service.DeviceService;

@Service
public class DeviceServiceImpl implements DeviceService {
  @Autowired DeviceDao deviceDao;

  @Override
  public Device existDevice(String id) {
    return deviceDao.existDevice(id);
  }

  @Override
  public int insert(Device device) {
    return deviceDao.insert(device);
  }

  @Override
  public int update(Device device) {
    return deviceDao.update(device);
  }

  @Override
  public int delete(String id) {
    return deviceDao.delete(id);
  }

}
