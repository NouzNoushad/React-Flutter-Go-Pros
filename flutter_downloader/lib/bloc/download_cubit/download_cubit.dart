import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:flutter_downloader/db/download_db.dart';

import 'download_state.dart';
import 'package:background_downloader/background_downloader.dart';

class DownloadCubit extends Cubit<DownloadState> {
  DownloadCubit() : super(DownloadState.initial()) {
    _initializeDownloader();
    _loadSavedDownloads();
  }

  final FileDownloader _downloader = FileDownloader();
  late final StreamSubscription<TaskUpdate> _updateSub;
  final DownloadDB _db = DownloadDB();

  void _initializeDownloader() {
    _updateSub = _downloader.updates.listen(_handleUpdate);
  }

  Future<void> _loadSavedDownloads() async {
    final saved = await _db.getAllDownloads();
    final downloads = saved.map((d) {
      return DownloadItem(
        id: d.id,
        url: d.url,
        filename: d.filename,
        progress: d.progress,
        totalBytes: 0,
        downloadBytes: 0,
        status: d.status,
        localPath: null,
        task: null,
        speed: 0,
      );
    }).toList();

    emit(state.copyWith(downloads: downloads));
  }

  // handle update
  void _handleUpdate(TaskUpdate update) async {
    switch (update) {
      case TaskProgressUpdate(
        :final DownloadTask task,
        :final double progress,
        :final int? expectedFileSize,
        :final double networkSpeed,
      ):
        if (progress >= 0) {
          _updateProgress(
            task.taskId,
            progress,
            expectedFileSize,
            networkSpeed,
          );
        }
        break;
      case TaskStatusUpdate(:final DownloadTask task, :final TaskStatus status):
        _updateStatus(task, status);
        break;
      default:
        break;
    }
  }

  // update progress
  void _updateProgress(
    String taskId,
    double progress,
    int? expectedFileSize,
    double networkSpeed,
  ) async {
    final index = state.downloads.indexWhere((d) => d.id == taskId);
    if (index == -1) return;

    final oldItem = state.downloads[index];
    final double safeProgress = progress.clamp(0, 1);

    final totalBytes = (expectedFileSize != null && expectedFileSize > 0)
        ? expectedFileSize
        : oldItem.totalBytes;
    final downloadedBytes = (totalBytes * safeProgress);

    final safeSpeed = (networkSpeed > 0) ? networkSpeed : oldItem.speed;

    final updatedItem = oldItem.copyWith(
      progress: progress,
      totalBytes: totalBytes,
      downloadBytes: downloadedBytes,
      speed: safeSpeed,
    );
    final updatedList = [...state.downloads];
    updatedList[index] = updatedItem;

    emit(state.copyWith(downloads: updatedList));
    await _db.updateDownload(updatedItem);
  }

  // update status
  void _updateStatus(DownloadTask task, TaskStatus status) async {
    final index = state.downloads.indexWhere((d) => d.id == task.taskId);
    if (index == -1) return;
    final oldItem = state.downloads[index];
    var updatedItem = oldItem.copyWith(status: status);

    if (status == TaskStatus.paused) {
      final safeProgress = oldItem.pausedProgress ?? oldItem.progress;
      final safeBytes = oldItem.pausedBytes ?? oldItem.downloadBytes;
      updatedItem = updatedItem.copyWith(
        progress: safeProgress,
        downloadBytes: safeBytes,
        speed: 0,
      );
    }

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
    await _db.updateDownload(updatedItem);
  }

  // start download
  Future<void> startDownload(String url, String fileName) async {
    final task = DownloadTask(
      url: url,
      filename: fileName,
      baseDirectory: BaseDirectory.applicationDocuments,
      updates: Updates.statusAndProgress,
      allowPause: true,
    );

    final newItem = DownloadItem(
      id: task.taskId,
      url: url,
      filename: fileName,
      status: TaskStatus.enqueued,
      localPath: null,
      task: task,
      progress: 0,
      totalBytes: 0,
      downloadBytes: 0,
      speed: 0,
    );

    emit(state.copyWith(downloads: [...state.downloads, newItem]));
    await _downloader.enqueue(task);
  }

  // pause download
  Future<void> pauseDownload(String id) async {
    final index = state.downloads.indexWhere((d) => d.id == id);
    if (index == -1) return;

    final item = state.downloads[index];
    if (item.task == null) return;

    final updatedItem = item.copyWith(
      pausedBytes: item.downloadBytes,
      pausedProgress: item.progress,
      status: TaskStatus.paused,
    );
    final updatedList = [...state.downloads];
    updatedList[index] = updatedItem;

    emit(state.copyWith(downloads: updatedList));
    await _db.updateDownload(updatedItem);
    await _downloader.pause(item.task!);
  }

  // resume download
  Future<void> resumeDownload(String id) async {
    final index = state.downloads.indexWhere((d) => d.id == id);
    if (index == -1) return;

    final item = state.downloads[index];
    if (item.task == null) return;

    final updatedItem = item.copyWith(status: TaskStatus.running, speed: 0.0);
    final updatedList = [...state.downloads];
    updatedList[index] = updatedItem;

    emit(state.copyWith(downloads: updatedList));
    await _db.updateDownload(updatedItem);
    await _downloader.resume(item.task!);
  }

  // delete download
  Future<void> deleteDownload(String id) async {
    await _downloader.cancelTasksWithIds([id]);
    await _db.deleteDownload(id);
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
