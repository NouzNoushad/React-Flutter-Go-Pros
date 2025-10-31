import 'package:background_downloader/background_downloader.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'download_state.freezed.dart';

@freezed
abstract class DownloadState with _$DownloadState {
  const factory DownloadState({@Default([]) List<DownloadItem> downloads}) =
      _DownloadState;
  factory DownloadState.initial() => DownloadState();
}

@freezed
abstract class DownloadItem with _$DownloadItem {
  const factory DownloadItem({
    required String id,
    required String url,
    required String filename,
    required TaskStatus status,
    required String? localPath,
    @Default(0.0) double progress,
  }) = _DownloadItem;
}
