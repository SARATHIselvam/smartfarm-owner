import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/equipment.dart';
import '../models/request.dart';
import '../data/mock_data.dart';

class AppStateProvider with ChangeNotifier {
  List<Equipment> _machinery = [];
  List<FarmerRequest> _requests = [];
  bool _isInit = false;

  List<Equipment> get machinery => _machinery;
  List<FarmerRequest> get requests => _requests;

  Future<void> init() async {
    if (_isInit) return;
    
    final prefs = await SharedPreferences.getInstance();
    
    final machineryString = prefs.getString('smartfarm_machinery');
    if (machineryString != null) {
      final List<dynamic> jsonList = json.decode(machineryString);
      _machinery = jsonList.map((e) => Equipment.fromJson(e)).toList();
    } else {
      _machinery = MockData.initialEquipment;
      _saveMachinery(prefs);
    }

    final requestsString = prefs.getString('smartfarm_requests');
    if (requestsString != null) {
      final List<dynamic> jsonList = json.decode(requestsString);
      _requests = jsonList.map((e) => FarmerRequest.fromJson(e)).toList();
    } else {
      _requests = MockData.mockRequests;
      _saveRequests(prefs);
    }
    
    _isInit = true;
    notifyListeners();
  }

  Future<void> _saveMachinery(SharedPreferences prefs) async {
    final String encoded = json.encode(_machinery.map((e) => e.toJson()).toList());
    await prefs.setString('smartfarm_machinery', encoded);
  }

  Future<void> _saveRequests(SharedPreferences prefs) async {
    final String encoded = json.encode(_requests.map((e) => e.toJson()).toList());
    await prefs.setString('smartfarm_requests', encoded);
  }

  void addVehicle(Equipment vehicle) async {
    _machinery.insert(0, vehicle);
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    _saveMachinery(prefs);
  }

  void updateVehicle(Equipment updated) async {
    final index = _machinery.indexWhere((v) => v.id == updated.id);
    if (index >= 0) {
      _machinery[index] = updated;
      notifyListeners();
      final prefs = await SharedPreferences.getInstance();
      _saveMachinery(prefs);
    }
  }

  void updateRequestStatus(String id, String status) async {
    final index = _requests.indexWhere((r) => r.id == id);
    if (index >= 0) {
      _requests[index] = _requests[index].copyWith(status: status);
      notifyListeners();
      final prefs = await SharedPreferences.getInstance();
      _saveRequests(prefs);
    }
  }
}
