import 'package:background_downloader/background_downloader.dart' hide Database;
import 'package:flutter_downloader/bloc/download_cubit/download_state.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

import '../constants/app_strings.dart';

class DownloadDB {
  static final DownloadDB _instance = DownloadDB._internal();
  factory DownloadDB() => _instance;

  DownloadDB._internal();
  Database? _db;

  Future<Database> get database async {
    if (_db != null) return _db!;
    _db = await _initDB();
    return _db!;
  }

  Future<Database> _initDB() async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, AppStrings.dbName);
    return await openDatabase(
      path,
      version: 1,
      onCreate: (db, version) async {
        await db.execute('''
            CREATE TABLE downloads (
            id TEXT PRIMARY KEY,
            url TEXT,
            filename TEXT,
            status TEXT,
            localPath TEXT,
            progress REAL,
            downloadBytes REAL,
            totalBytes INTEGER,
            speed REAL,
            pausedProgress REAL,
            pausedBytes REAL
            )
          ''');
      },
    );
  }

  Future<void> updateDownload(DownloadItem item) async {
    final db = await database;
    await db.update(
      AppStrings.dbTableName,
      {
        'url': item.url,
        'filename': item.filename,
        'status': item.status.toString(),
        'localPath': item.localPath,
        'progress': item.progress,
        'downloadBytes': item.downloadBytes,
        'totalBytes': item.totalBytes,
        'speed': item.speed,
        'pausedProgress': item.pausedProgress,
        'pausedBytes': item.pausedBytes,
      },
      where: 'id = ?',
      whereArgs: [item.id],
    );
  }

  Future<void> deleteDownload(String id) async {
    final db = await database;
    await db.delete(AppStrings.dbTableName, where: 'id = ?', whereArgs: [id]);
  }

  Future<List<DownloadItem>> getAllDownloads() async {
    final db = await database;
    final maps = await db.query(AppStrings.dbTableName);
    return maps.map((map) {
      final statusString = map['status'] as String;
      final status = TaskStatus.values.firstWhere(
        (s) => s.toString() == statusString,
        orElse: () => TaskStatus.enqueued,
      );

      return DownloadItem(
        id: map['id'] as String,
        url: map['url'] as String,
        filename: map['filename'] as String,
        status: status,
        localPath: map['localPath'] as String?,
        progress: (map['progress'] as num).toDouble(),
        downloadBytes: (map['downloadBytes'] as num).toDouble(),
        totalBytes: map['totalBytes'] as int,
        speed: (map['speed'] as num).toDouble(),
        pausedProgress: (map['pausedProgress'] as num?)?.toDouble(),
        pausedBytes: (map['pausedBytes'] as num?)?.toDouble(),
      );
    }).toList();
  }

  Future<void> clearAll() async {
    final db = await database;
    await db.delete(AppStrings.dbTableName);
  }
}
