import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_downloader/bloc/download_cubit/download_cubit.dart';

import '../bloc/download_cubit/download_state.dart';

class DownloadView extends StatefulWidget {
  const DownloadView({super.key});

  @override
  State<DownloadView> createState() => _DownloadViewState();
}

class _DownloadViewState extends State<DownloadView> {
  late DownloadCubit _downloadCubit;

  @override
  void initState() {
    _downloadCubit = context.read<DownloadCubit>();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Downloads')),
      body: BlocBuilder<DownloadCubit, DownloadState>(
        builder: (context, state) {
          if (state.downloads.isEmpty) {
            return const Center(child: Text('No downloads'));
          }
          return ListView.separated(
            padding: EdgeInsets.all(10.0),
            itemBuilder: (context, index) {
              final item = state.downloads[index];
              return ListTile(
                title: Text(item.filename),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  spacing: 8,
                  children: [
                    LinearProgressIndicator(value: item.progress),
                    Text(item.status.toString().split('/').last),
                    Row(
                      children: [
                        IconButton(
                          onPressed: () {
                            _downloadCubit.pauseDownload(item.id);
                          },
                          icon: Icon(Icons.pause),
                        ),
                        IconButton(
                          onPressed: () {
                            _downloadCubit.resumeDownload(item.id);
                          },
                          icon: Icon(Icons.play_arrow),
                        ),
                        IconButton(
                          onPressed: () {
                            _downloadCubit.deleteDownload(item.id);
                          },
                          icon: Icon(Icons.close),
                        ),
                      ],
                    ),
                  ],
                ),
              );
            },
            separatorBuilder: (context, index) => SizedBox(height: 8),
            itemCount: state.downloads.length,
          );
        },
      ),
    );
  }
}
