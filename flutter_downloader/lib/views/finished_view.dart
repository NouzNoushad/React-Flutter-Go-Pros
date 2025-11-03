import 'package:background_downloader/background_downloader.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../bloc/download_cubit/download_cubit.dart';
import '../bloc/download_cubit/download_state.dart';

class FinishedView extends StatefulWidget {
  const FinishedView({super.key});

  @override
  State<FinishedView> createState() => _FinishedViewState();
}

class _FinishedViewState extends State<FinishedView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Finished')),
      body: BlocBuilder<DownloadCubit, DownloadState>(
        builder: (context, state) {
          final finishedDownloads = state.downloads
              .where((item) => item.status == TaskStatus.complete)
              .toList();

          if (finishedDownloads.isEmpty) {
            return const Center(child: Text('No completed downloads'));
          }
          return ListView.separated(
            padding: EdgeInsets.all(10.0),
            itemBuilder: (context, index) {
              final item = finishedDownloads[index];
              return Container(
                padding: EdgeInsets.all(8.0),
                decoration: BoxDecoration(
                  border: Border.all(),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  spacing: 8.0,
                  children: [
                    Text(item.filename),
                    IconButton(onPressed: () {}, icon: Icon(Icons.delete)),
                  ],
                ),
              );
            },
            separatorBuilder: (context, index) => SizedBox(height: 8),
            itemCount: finishedDownloads.length,
          );
        },
      ),
    );
  }
}
