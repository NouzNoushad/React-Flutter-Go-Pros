// ignore_for_file: unused_field

import 'dart:io';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:path_provider/path_provider.dart';
import 'package:dio/dio.dart';

/// Simple model for detected video/url
class DetectedVideo {
  final String url;
  final Map<String, String> headers;
  final int contentLength;
  final String contentType;

  DetectedVideo({
    required this.url,
    required this.headers,
    required this.contentLength,
    required this.contentType,
  });
}

class BrowserDownloader extends StatefulWidget {
  const BrowserDownloader({super.key});

  @override
  State<BrowserDownloader> createState() => _BrowserDownloaderState();
}

class _BrowserDownloaderState extends State<BrowserDownloader> {
  late final InAppWebViewController _controller;
  final Dio _dio = Dio();
  final List<DetectedVideo> _detectedVideos = [];
  bool _isDownloading = false;
  double _downloadProgress = 0.0;
  final int _thresholdBytes = 200 * 1024; // 200 KB threshold (adjust)

  @override
  void initState() {
    super.initState();
    // Basic dio options
    _dio.options.followRedirects = true;
    _dio.options.validateStatus = (_) => true;
  }

  Future<void> _tryVerifyResource(
    WebUri resourceUri,
    Map<String, String> headers,
  ) async {
    try {
      final url = resourceUri.toString();
      if (!url.startsWith('http')) return;
      if (url.contains('tiktok.')) return;
      if (url.endsWith('.txt')) return;

      // Quick filter by extension (optional)
      final lower = url.toLowerCase();
      if (lower.endsWith('.css') ||
          lower.endsWith('.js') ||
          lower.endsWith('.png') ||
          lower.endsWith('.jpg') ||
          lower.endsWith('.jpeg') ||
          lower.endsWith('.svg') ||
          lower.endsWith('.woff') ||
          lower.endsWith('.woff2')) {
        return;
      }

      // Try HEAD first (some servers block HEAD)
      Response? head;
      try {
        head = await _dio.requestUri(
          resourceUri,
          options: Options(method: 'HEAD', headers: headers),
          // small timeout for HEAD
        );
      } catch (_) {
        head = null;
      }

      String contentType = head?.headers.value('content-type') ?? '';
      int contentLength =
          int.tryParse(head?.headers.value('content-length') ?? '') ?? -1;

      // If HEAD didn't return useful headers, do a GET but only read headers (stream)
      if ((contentType.isEmpty || contentLength <= 0)) {
        final resp = await _dio.getUri(
          resourceUri,
          options: Options(
            method: 'GET',
            headers: headers,
            responseType: ResponseType.stream,
          ),
        );

        contentType = resp.headers.value('content-type') ?? '';
        contentLength =
            int.tryParse(resp.headers.value('content-length') ?? '') ?? -1;

        // drain stream so connection closes quickly (if any)
        try {
          if (resp.data is Stream) {
            await (resp.data as Stream).drain();
          }
        } catch (_) {}
      }

      final lc = contentType.toLowerCase();
      final isVideo = lc.contains('video');
      final isAudio = lc.contains('audio');

      // threshold check: video > threshold OR audio any size (you can change)
      if ((isVideo && contentLength > _thresholdBytes) ||
          (isAudio && contentLength > 0) ||
          lc.contains('application/octet-stream') &&
              contentLength > _thresholdBytes) {
        // avoid duplicates
        if (!_detectedVideos.any((d) => d.url == url)) {
          final dv = DetectedVideo(
            url: url,
            headers: headers,
            contentLength: contentLength,
            contentType: contentType,
          );
          setState(() {
            _detectedVideos.insert(0, dv);
          });
          // optionally show a small toast/snackbar
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Detected media: ${url.split('/').last}')),
          );
        }
      }
    } catch (e) {
      // ignore errors silently or print for debug
      debugPrint('verify error for $resourceUri : $e');
    }
  }

  // Called by the "sniffing" FAB (or you can auto detect in onLoadResource)
  void _showDetectedList() {
    if (_detectedVideos.isEmpty) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("No video found.")));
      return;
    }

    showDialog(
      context: context,
      builder: (context) {
        return SimpleDialog(
          title: const Text("Choose Video to Download"),
          children: _detectedVideos.map((dv) {
            final display = dv.url.split('/').last.split('?').first;
            return SimpleDialogOption(
              child: Text(display.isEmpty ? dv.url : display),
              onPressed: () {
                Navigator.pop(context);
                _downloadVideo(dv.url, dv.headers);
              },
            );
          }).toList(),
        );
      },
    );
  }

  Future<void> _downloadVideo(String url, Map<String, String> headers) async {
    try {
      setState(() {
        _isDownloading = true;
        _downloadProgress = 0.0;
      });

      Directory downloadsDir = Directory('/storage/emulated/0/Download');
      if (!downloadsDir.existsSync()) {
        downloadsDir = await getExternalStorageDirectory() ?? downloadsDir;
      }

      final timestamp = DateFormat('yyyyMMdd_HHmmss').format(DateTime.now());
      String baseName = url.split('/').last.split('?').first;
      baseName = baseName.isEmpty ? 'video' : baseName;
      String finalName = "${baseName}_$timestamp";
      if (!finalName.toLowerCase().endsWith(".mp4")) {
        finalName += ".mp4";
      }

      final filePath = '${downloadsDir.path}/$finalName';
      final dio = Dio();

      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("Downloading started...")));

      await dio.download(
        url,
        filePath,
        options: Options(headers: headers),
        onReceiveProgress: (received, total) {
          if (total != -1) {
            setState(() {
              _downloadProgress = received / total;
            });
          }
        },
      );

      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text("Downloaded to: $filePath")));
    } catch (e) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text("Download failed: $e")));
    } finally {
      setState(() {
        _isDownloading = false;
        _downloadProgress = 0.0;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Video Downloader"),
        actions: [
          IconButton(
            icon: const Icon(Icons.list),
            onPressed: _showDetectedList,
            tooltip: 'Show detected',
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: InAppWebView(
              initialUrlRequest: URLRequest(url: WebUri('https://google.com')),
              onWebViewCreated: (controller) {
                _controller = controller;
              },
              // This is the important callback: resources loaded by the page
              onLoadResource: (controller, loadedResource) async {
                try {
                  final uri = loadedResource.url;
                  if (uri == null) return;
                  final Map<String, String> headers = {};
                  try {
                    final cookieManager = CookieManager.instance();
                    final cookie = await cookieManager.getCookies(url: uri);
                    if (cookie.isNotEmpty) {
                      final cookieString = cookie
                          .map((c) => "${c.name}=${c.value}")
                          .join("; ");
                      headers['Cookie'] = cookieString;
                    }
                  } catch (_) {}
                  // Start verify (non-blocking)
                  _tryVerifyResource(uri, headers);
                } catch (e) {
                  debugPrint('onLoadResource error: $e');
                }
              },
              onPermissionRequest: (controller, resources) async {
                return PermissionResponse(
                  resources: resources.resources,
                  action: PermissionResponseAction.GRANT,
                );
              },
            ),
          ),
          if (_isDownloading)
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: LinearProgressIndicator(value: _downloadProgress),
            ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _isDownloading ? null : _showDetectedList,
        child: _isDownloading
            ? Stack(
                alignment: Alignment.center,
                children: [
                  SizedBox(
                    height: 24,
                    width: 24,
                    child: CircularProgressIndicator(
                      value: _downloadProgress,
                      strokeWidth: 3,
                    ),
                  ),
                  const Icon(Icons.download, size: 18),
                ],
              )
            : const Icon(Icons.search),
      ),
    );
  }
}
