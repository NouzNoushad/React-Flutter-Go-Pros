class Message {
  String? id;
  String? type;
  String? sender;
  String? room;
  String? content;
  String? replyTo;
  String? replyToMessage;
  String? createdAt;

  Message({
    this.id,
    this.type,
    this.sender,
    this.room,
    this.content,
    this.replyTo,
    this.replyToMessage,
    this.createdAt,
  });

  Message.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    type = json['type'];
    sender = json['sender'];
    room = json['room'];
    content = json['content'];
    replyTo = json['reply_to'];
    replyToMessage = json['reply_to_message'];
    createdAt = json['created_at'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['type'] = type;
    data['sender'] = sender;
    data['room'] = room;
    data['content'] = content;
    data['reply_to'] = replyTo;
    data['reply_to_message'] = replyToMessage;
    data['created_at'] = createdAt;
    return data;
  }
}
