import 'package:flutter/widgets.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'home_state.freezed.dart';

@freezed
abstract class HomeState with _$HomeState {
  const factory HomeState({
    required List<Widget> pages,
    required int currentPageIndex,
  }) = _HomeState;
  factory HomeState.initial() => HomeState(pages: [], currentPageIndex: 0);
}
