class Equipment {
  final String id;
  final String name;
  final String model;
  final String type;
  final String image;
  final String location;
  final String status;
  final double? fuelLevel;
  final double? batteryLevel;
  final String? nextService;
  final String? lastUsed;
  final double pricePerHour;
  final double pricePerDay;
  final String vehicleNumber;
  final String rcNumber;
  final bool verified;

  Equipment({
    required this.id,
    required this.name,
    required this.model,
    required this.type,
    required this.image,
    required this.location,
    required this.status,
    this.fuelLevel,
    this.batteryLevel,
    this.nextService,
    this.lastUsed,
    required this.pricePerHour,
    required this.pricePerDay,
    required this.vehicleNumber,
    required this.rcNumber,
    required this.verified,
  });

  factory Equipment.fromJson(Map<String, dynamic> json) {
    return Equipment(
      id: json['id'],
      name: json['name'],
      model: json['model'],
      type: json['type'],
      image: json['image'],
      location: json['location'],
      status: json['status'],
      fuelLevel: json['fuelLevel']?.toDouble(),
      batteryLevel: json['batteryLevel']?.toDouble(),
      nextService: json['nextService'],
      lastUsed: json['lastUsed'],
      pricePerHour: json['pricePerHour']?.toDouble() ?? 0.0,
      pricePerDay: json['pricePerDay']?.toDouble() ?? 0.0,
      vehicleNumber: json['vehicleNumber'],
      rcNumber: json['rcNumber'],
      verified: json['verified'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'model': model,
      'type': type,
      'image': image,
      'location': location,
      'status': status,
      if (fuelLevel != null) 'fuelLevel': fuelLevel,
      if (batteryLevel != null) 'batteryLevel': batteryLevel,
      if (nextService != null) 'nextService': nextService,
      if (lastUsed != null) 'lastUsed': lastUsed,
      'pricePerHour': pricePerHour,
      'pricePerDay': pricePerDay,
      'vehicleNumber': vehicleNumber,
      'rcNumber': rcNumber,
      'verified': verified,
    };
  }
  
  Equipment copyWith({
    String? id,
    String? name,
    String? model,
    String? type,
    String? image,
    String? location,
    String? status,
    double? fuelLevel,
    double? batteryLevel,
    String? nextService,
    String? lastUsed,
    double? pricePerHour,
    double? pricePerDay,
    String? vehicleNumber,
    String? rcNumber,
    bool? verified,
  }) {
    return Equipment(
      id: id ?? this.id,
      name: name ?? this.name,
      model: model ?? this.model,
      type: type ?? this.type,
      image: image ?? this.image,
      location: location ?? this.location,
      status: status ?? this.status,
      fuelLevel: fuelLevel ?? this.fuelLevel,
      batteryLevel: batteryLevel ?? this.batteryLevel,
      nextService: nextService ?? this.nextService,
      lastUsed: lastUsed ?? this.lastUsed,
      pricePerHour: pricePerHour ?? this.pricePerHour,
      pricePerDay: pricePerDay ?? this.pricePerDay,
      vehicleNumber: vehicleNumber ?? this.vehicleNumber,
      rcNumber: rcNumber ?? this.rcNumber,
      verified: verified ?? this.verified,
    );
  }
}
