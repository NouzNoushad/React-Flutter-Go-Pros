import 'dart:async';

import 'package:bloc/bloc.dart';

import 'download_state.dart';
import 'package:background_downloader/background_downloader.dart';

class DownloadCubit extends Cubit<DownloadState> {
  DownloadCubit() : super(DownloadState.initial()) {
    _initializeDownloader();
  }

  final FileDownloader _downloader = FileDownloader();
  late final StreamSubscription<TaskUpdate> _updateSub;

  void _initializeDownloader() {
    _updateSub = _downloader.updates.listen(_handleUpdate);
  }

  // handle update
  void _handleUpdate(TaskUpdate update) async {
    switch (update) {
      case TaskProgressUpdate(:final DownloadTask task, :final double progress):
        _updateProgress(task.taskId, progress);
        break;
      case TaskStatusUpdate(:final DownloadTask task, :final TaskStatus status):
        _updateStatus(task, status);
        break;
      default:
        break;
    }
  }

  // update progress
  void _updateProgress(String taskId, double progress) {
    final index = state.downloads.indexWhere((d) => d.id == taskId);
    if (index == -1) return;
    final updatedItem = state.downloads[index].copyWith(progress: progress);
    final updatedList = [...state.downloads];
    updatedList[index] = updatedItem;

    emit(state.copyWith(downloads: updatedList));
  }

  // update status
  void _updateStatus(DownloadTask task, TaskStatus status) async {
    final index = state.downloads.indexWhere((d) => d.id == task.taskId);
    if (index == -1) return;
    var updatedItem = state.downloads[index].copyWith(status: status);
    if (status == TaskStatus.complete) {
      final newPath = await _downloader.moveToSharedStorage(
        task,
        SharedStorage.downloads,
      );
      updatedItem = updatedItem.copyWith(localPath: newPath);
    }
    final updatedList = [...state.downloads];
    updatedList[index] = updatedItem;
    emit(state.copyWith(downloads: updatedList));
  }

  // start download
  Future<void> startDownload(String url, String fileName) async {
    final task = DownloadTask(
      url: url,
      filename: fileName,
      baseDirectory: BaseDirectory.applicationDocuments,
      updates: Updates.statusAndProgress,
    );

    final newItem = DownloadItem(
      id: task.taskId,
      url: url,
      filename: fileName,
      status: TaskStatus.enqueued,
      localPath: null,
    );

    emit(state.copyWith(downloads: [...state.downloads, newItem]));
    await _downloader.enqueue(task);
  }

  // pause download
  Future<void> pauseDownload(String id) async {
    final item = state.downloads.firstWhere((d) => d.id == id);
    final task = DownloadTask(
      url: item.url,
      taskId: item.id,
      filename: item.filename,
    );
    await _downloader.pause(task);
  }

  // resume download
  Future<void> resumeDownload(String id) async {
    final item = state.downloads.firstWhere((d) => d.id == id);
    final task = DownloadTask(
      url: item.url,
      taskId: item.id,
      filename: item.filename,
    );
    await _downloader.resume(task);
  }

  // delete download
  Future<void> deleteDownload(String id) async {
    await _downloader.cancelTasksWithIds([id]);
    emit(
      state.copyWith(
        downloads: state.downloads.where((d) => d.id != id).toList(),
      ),
    );
  }

  @override
  Future<void> close() {
    _updateSub.cancel();
    return super.close();
  }
}
