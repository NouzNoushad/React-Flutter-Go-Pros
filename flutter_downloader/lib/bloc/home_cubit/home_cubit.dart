import 'package:bloc/bloc.dart';
import 'package:flutter/cupertino.dart';

import '../../views/custom_page.dart';
import 'home_state.dart';

class HomeCubit extends Cubit<HomeState> {
  HomeCubit() : super(HomeState.initial());

  // add page
  void addPage() {
    final newPages = List<Widget>.from(state.pages)
      ..add(CustomPage(title: 'Page ${state.pages.length + 1}'));
    emit(
      state.copyWith(pages: newPages, currentPageIndex: newPages.length - 1),
    );
  }

  // delete page
  void deletePage(int index) {
    if (state.pages.isEmpty) return;

    final updatedPages = List<Widget>.from(state.pages)..removeAt(index);

    int newIndex = 0;

    if (updatedPages.isEmpty) {
      newIndex = 0;
    } else if (index < updatedPages.length) {
      newIndex = index;
    } else {
      newIndex = updatedPages.length - 1;
    }

    emit(state.copyWith(pages: updatedPages, currentPageIndex: newIndex));
  }

  // switch page
  void switchPage(int index) {
    emit(state.copyWith(currentPageIndex: index));
  }
}
