String formatBytes(num bytes) {
  const kb = 1024;
  const mb = kb * 1024;
  if (bytes >= mb) {
    return "${(bytes / mb).toStringAsFixed(2)} MB";
  } else if (bytes >= kb) {
    return "${(bytes / kb).toStringAsFixed(2)} KB";
  } else {
    return "${bytes.toStringAsFixed(2)} B";
  }
}
