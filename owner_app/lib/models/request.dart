class RequestBreakdown {
  final double rentalFee;
  final double insurance;
  final double platformFee;
  final double total;

  RequestBreakdown({
    required this.rentalFee,
    required this.insurance,
    required this.platformFee,
    required this.total,
  });

  factory RequestBreakdown.fromJson(Map<String, dynamic> json) {
    return RequestBreakdown(
      rentalFee: json['rentalFee']?.toDouble() ?? 0.0,
      insurance: json['insurance']?.toDouble() ?? 0.0,
      platformFee: json['platformFee']?.toDouble() ?? 0.0,
      total: json['total']?.toDouble() ?? 0.0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'rentalFee': rentalFee,
      'insurance': insurance,
      'platformFee': platformFee,
      'total': total,
    };
  }
}

class FarmerRequest {
  final String id;
  final String farmerName;
  final String? farmerAvatar;
  final String farmerType;
  final double rating;
  final int reviewsCount;
  final String memberSince;
  final String location;
  final String equipmentName;
  final String duration;
  final String distance;
  final String? note;
  final bool? isUrgent;
  final String? status;
  final RequestBreakdown? breakdown;

  FarmerRequest({
    required this.id,
    required this.farmerName,
    this.farmerAvatar,
    required this.farmerType,
    required this.rating,
    required this.reviewsCount,
    required this.memberSince,
    required this.location,
    required this.equipmentName,
    required this.duration,
    required this.distance,
    this.note,
    this.isUrgent,
    this.status,
    this.breakdown,
  });

  factory FarmerRequest.fromJson(Map<String, dynamic> json) {
    return FarmerRequest(
      id: json['id'],
      farmerName: json['farmerName'],
      farmerAvatar: json['farmerAvatar'],
      farmerType: json['farmerType'],
      rating: json['rating']?.toDouble() ?? 0.0,
      reviewsCount: json['reviewsCount']?.toInt() ?? 0,
      memberSince: json['memberSince'],
      location: json['location'],
      equipmentName: json['equipmentName'],
      duration: json['duration'],
      distance: json['distance'],
      note: json['note'],
      isUrgent: json['isUrgent'],
      status: json['status'] ?? 'pending',
      breakdown: json['breakdown'] != null 
          ? RequestBreakdown.fromJson(json['breakdown']) 
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'farmerName': farmerName,
      'farmerAvatar': farmerAvatar,
      'farmerType': farmerType,
      'rating': rating,
      'reviewsCount': reviewsCount,
      'memberSince': memberSince,
      'location': location,
      'equipmentName': equipmentName,
      'duration': duration,
      'distance': distance,
      if (note != null) 'note': note,
      if (isUrgent != null) 'isUrgent': isUrgent,
      if (status != null) 'status': status,
      if (breakdown != null) 'breakdown': breakdown!.toJson(),
    };
  }

  FarmerRequest copyWith({
    String? id,
    String? farmerName,
    String? farmerAvatar,
    String? farmerType,
    double? rating,
    int? reviewsCount,
    String? memberSince,
    String? location,
    String? equipmentName,
    String? duration,
    String? distance,
    String? note,
    bool? isUrgent,
    String? status,
    RequestBreakdown? breakdown,
  }) {
    return FarmerRequest(
      id: id ?? this.id,
      farmerName: farmerName ?? this.farmerName,
      farmerAvatar: farmerAvatar ?? this.farmerAvatar,
      farmerType: farmerType ?? this.farmerType,
      rating: rating ?? this.rating,
      reviewsCount: reviewsCount ?? this.reviewsCount,
      memberSince: memberSince ?? this.memberSince,
      location: location ?? this.location,
      equipmentName: equipmentName ?? this.equipmentName,
      duration: duration ?? this.duration,
      distance: distance ?? this.distance,
      note: note ?? this.note,
      isUrgent: isUrgent ?? this.isUrgent,
      status: status ?? this.status,
      breakdown: breakdown ?? this.breakdown,
    );
  }
}
