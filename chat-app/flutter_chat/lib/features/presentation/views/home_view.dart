import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_chat/core/helpers/converters.dart';
import 'package:flutter_chat/features/data/chats_service.dart';
import 'package:flutter_chat/features/models/message.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key, required this.room, required this.user});
  final String room;
  final String user;

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  final ChatsService chatsService = ChatsService();
  final TextEditingController _controller = TextEditingController();
  final ConverterHelpers _helpers = ConverterHelpers();
  final ScrollController _scrollController = ScrollController();
  List<Message> messages = [];

  @override
  void initState() {
    chatsService.connect();

    // listen for new messages
    chatsService.messages.listen((data) {
      final msg = Message.fromJson(jsonDecode(data));
      setState(() {
        messages.add(msg);
      });
      _scrollToBottom();
    });

    // load history
    chatsService.fetchMessages(widget.room).then((history) {
      setState(() {
        messages = history;
      });
    });
    super.initState();
  }

  _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  // chat input
  Widget _buildMessageInput() => Padding(
    padding: const EdgeInsets.all(8.0),
    child: Row(
      children: [
        Expanded(
          child: TextField(
            controller: _controller,
            decoration: InputDecoration(
              hintText: 'Write message...',
              enabledBorder: OutlineInputBorder(),
              focusedBorder: OutlineInputBorder(),
            ),
          ),
        ),
        SizedBox(width: 8),
        Container(
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(),
          ),
          child: IconButton(
            onPressed: () {
              chatsService.sendMessage(
                room: widget.room,
                sender: widget.user,
                content: _controller.text.trim(),
              );
              _scrollToBottom();
              _controller.clear();
            },
            icon: Icon(Icons.send),
          ),
        ),
      ],
    ),
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Room: ${widget.room}")),
      body: Column(
        children: [
          Expanded(
            child: Container(
              color: Colors.transparent,
              child: ListView.separated(
                controller: _scrollController,
                padding: EdgeInsets.symmetric(horizontal: 15, vertical: 15),
                itemBuilder: (context, index) {
                  final message = messages[index];
                  final isUser = message.sender == widget.user;
                  return Align(
                    alignment: isUser
                        ? Alignment.centerRight
                        : Alignment.centerLeft,
                    child: Container(
                      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 8),
                      constraints: BoxConstraints(
                        maxWidth: MediaQuery.of(context).size.width * 0.85,
                      ),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(width: 1, color: Colors.black),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          isUser
                              ? SizedBox.shrink()
                              : Text(
                                  message.sender ?? '',
                                  style: TextStyle(
                                    fontWeight: FontWeight.w500,
                                    fontSize: 15,
                                  ),
                                ),
                          Text(message.content ?? ''),
                          Align(
                            alignment: Alignment.centerRight,
                            child: Text(
                              _helpers.convertToTime(message.createdAt ?? ''),
                              style: TextStyle(fontSize: 12),
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
                separatorBuilder: (context, index) => SizedBox(height: 10),
                itemCount: messages.length,
              ),
            ),
          ),
          _buildMessageInput(),
        ],
      ),
    );
  }
}
