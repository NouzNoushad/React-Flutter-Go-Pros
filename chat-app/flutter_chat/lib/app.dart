import 'package:flutter/material.dart';
import 'package:flutter_chat/config/themes/theme.dart';

import 'features/presentation/views/home_view.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: AppTheme.theme,
      debugShowCheckedModeBanner: false,
      home: HomeView(room: "general", user: "bob"),
    );
  }
}
