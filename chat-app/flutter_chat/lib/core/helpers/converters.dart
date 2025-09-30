import 'package:intl/intl.dart';

abstract class Helpers {
  String convertToTime(String dateTime);
}

class ConverterHelpers extends Helpers {
  // convert to time
  @override
  String convertToTime(String dateTime) {
    DateTime dt = DateTime.parse(dateTime);
    String formatTime = DateFormat.jm().format(dt);
    return formatTime;
  }
}
