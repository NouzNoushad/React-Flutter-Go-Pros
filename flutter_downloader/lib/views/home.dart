import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_downloader/bloc/download_cubit/download_cubit.dart';
import 'package:flutter_downloader/bloc/home_cubit/home_cubit.dart';
import 'package:flutter_downloader/views/download_view.dart';

import '../bloc/home_cubit/home_state.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  late HomeCubit _homeCubit;
  late DownloadCubit _downloadCubit;

  @override
  void initState() {
    _homeCubit = context.read<HomeCubit>();
    _downloadCubit = context.read<DownloadCubit>();
    super.initState();
  }

  // appbar
  AppBar _buildAppBar({required HomeState state}) => AppBar(
    title: Text(
      state.pages.isNotEmpty
          ? "Page ${state.currentPageIndex + 1}"
          : "No pages",
    ),
    actions: [
      IconButton(
        onPressed: () {
          Navigator.of(
            context,
          ).push(MaterialPageRoute(builder: (context) => DownloadView()));
        },
        icon: Icon(Icons.download),
      ),
    ],
  );

  // add button
  Widget _buildDownloadButton() => FloatingActionButton(
    onPressed: () {
      String url =
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
      String fileName = url.split('/').last;
      _downloadCubit.startDownload(url, fileName);
    },
    child: Icon(Icons.download),
  );

  // drawer
  Widget _buildDrawer({required HomeState state}) => Drawer(
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        DrawerHeader(child: Center(child: Text('Pages'))),
        Expanded(
          child: ListView(
            children: [
              for (int i = 0; i < state.pages.length; i++)
                ListTile(
                  title: Text('Page ${i + 1}'),
                  selected: i == state.currentPageIndex,
                  trailing: IconButton(
                    onPressed: () {
                      _homeCubit.deletePage(i);
                    },
                    icon: Icon(Icons.close),
                  ),
                  onTap: () {
                    _homeCubit.switchPage(i);
                    Navigator.pop(context);
                  },
                ),
            ],
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Align(
            alignment: Alignment.centerRight,
            child: IconButton(
              onPressed: () {
                _homeCubit.addPage();
                Navigator.pop(context);
              },
              icon: Icon(Icons.add, size: 30),
            ),
          ),
        ),
      ],
    ),
  );

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<HomeCubit, HomeState>(
      builder: (context, state) {
        return Scaffold(
          appBar: _buildAppBar(state: state),
          floatingActionButton: _buildDownloadButton(),
          drawer: _buildDrawer(state: state),
          body: state.pages.isNotEmpty
              ? state.pages[state.currentPageIndex]
              : Center(child: Text('No pages available')),
        );
      },
    );
  }
}
