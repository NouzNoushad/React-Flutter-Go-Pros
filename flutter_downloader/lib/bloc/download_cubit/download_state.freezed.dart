// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'download_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;
/// @nodoc
mixin _$DownloadState {

 List<DownloadItem> get downloads;
/// Create a copy of DownloadState
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$DownloadStateCopyWith<DownloadState> get copyWith => _$DownloadStateCopyWithImpl<DownloadState>(this as DownloadState, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is DownloadState&&const DeepCollectionEquality().equals(other.downloads, downloads));
}


@override
int get hashCode => Object.hash(runtimeType,const DeepCollectionEquality().hash(downloads));

@override
String toString() {
  return 'DownloadState(downloads: $downloads)';
}


}

/// @nodoc
abstract mixin class $DownloadStateCopyWith<$Res>  {
  factory $DownloadStateCopyWith(DownloadState value, $Res Function(DownloadState) _then) = _$DownloadStateCopyWithImpl;
@useResult
$Res call({
 List<DownloadItem> downloads
});




}
/// @nodoc
class _$DownloadStateCopyWithImpl<$Res>
    implements $DownloadStateCopyWith<$Res> {
  _$DownloadStateCopyWithImpl(this._self, this._then);

  final DownloadState _self;
  final $Res Function(DownloadState) _then;

/// Create a copy of DownloadState
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? downloads = null,}) {
  return _then(_self.copyWith(
downloads: null == downloads ? _self.downloads : downloads // ignore: cast_nullable_to_non_nullable
as List<DownloadItem>,
  ));
}

}


/// Adds pattern-matching-related methods to [DownloadState].
extension DownloadStatePatterns on DownloadState {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _DownloadState value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _DownloadState() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _DownloadState value)  $default,){
final _that = this;
switch (_that) {
case _DownloadState():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _DownloadState value)?  $default,){
final _that = this;
switch (_that) {
case _DownloadState() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( List<DownloadItem> downloads)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _DownloadState() when $default != null:
return $default(_that.downloads);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( List<DownloadItem> downloads)  $default,) {final _that = this;
switch (_that) {
case _DownloadState():
return $default(_that.downloads);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( List<DownloadItem> downloads)?  $default,) {final _that = this;
switch (_that) {
case _DownloadState() when $default != null:
return $default(_that.downloads);case _:
  return null;

}
}

}

/// @nodoc


class _DownloadState implements DownloadState {
  const _DownloadState({final  List<DownloadItem> downloads = const []}): _downloads = downloads;
  

 final  List<DownloadItem> _downloads;
@override@JsonKey() List<DownloadItem> get downloads {
  if (_downloads is EqualUnmodifiableListView) return _downloads;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_downloads);
}


/// Create a copy of DownloadState
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$DownloadStateCopyWith<_DownloadState> get copyWith => __$DownloadStateCopyWithImpl<_DownloadState>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _DownloadState&&const DeepCollectionEquality().equals(other._downloads, _downloads));
}


@override
int get hashCode => Object.hash(runtimeType,const DeepCollectionEquality().hash(_downloads));

@override
String toString() {
  return 'DownloadState(downloads: $downloads)';
}


}

/// @nodoc
abstract mixin class _$DownloadStateCopyWith<$Res> implements $DownloadStateCopyWith<$Res> {
  factory _$DownloadStateCopyWith(_DownloadState value, $Res Function(_DownloadState) _then) = __$DownloadStateCopyWithImpl;
@override @useResult
$Res call({
 List<DownloadItem> downloads
});




}
/// @nodoc
class __$DownloadStateCopyWithImpl<$Res>
    implements _$DownloadStateCopyWith<$Res> {
  __$DownloadStateCopyWithImpl(this._self, this._then);

  final _DownloadState _self;
  final $Res Function(_DownloadState) _then;

/// Create a copy of DownloadState
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? downloads = null,}) {
  return _then(_DownloadState(
downloads: null == downloads ? _self._downloads : downloads // ignore: cast_nullable_to_non_nullable
as List<DownloadItem>,
  ));
}


}

/// @nodoc
mixin _$DownloadItem {

 String get id; String get url; String get filename; TaskStatus get status; String? get localPath; double get progress;
/// Create a copy of DownloadItem
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$DownloadItemCopyWith<DownloadItem> get copyWith => _$DownloadItemCopyWithImpl<DownloadItem>(this as DownloadItem, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is DownloadItem&&(identical(other.id, id) || other.id == id)&&(identical(other.url, url) || other.url == url)&&(identical(other.filename, filename) || other.filename == filename)&&(identical(other.status, status) || other.status == status)&&(identical(other.localPath, localPath) || other.localPath == localPath)&&(identical(other.progress, progress) || other.progress == progress));
}


@override
int get hashCode => Object.hash(runtimeType,id,url,filename,status,localPath,progress);

@override
String toString() {
  return 'DownloadItem(id: $id, url: $url, filename: $filename, status: $status, localPath: $localPath, progress: $progress)';
}


}

/// @nodoc
abstract mixin class $DownloadItemCopyWith<$Res>  {
  factory $DownloadItemCopyWith(DownloadItem value, $Res Function(DownloadItem) _then) = _$DownloadItemCopyWithImpl;
@useResult
$Res call({
 String id, String url, String filename, TaskStatus status, String? localPath, double progress
});




}
/// @nodoc
class _$DownloadItemCopyWithImpl<$Res>
    implements $DownloadItemCopyWith<$Res> {
  _$DownloadItemCopyWithImpl(this._self, this._then);

  final DownloadItem _self;
  final $Res Function(DownloadItem) _then;

/// Create a copy of DownloadItem
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? url = null,Object? filename = null,Object? status = null,Object? localPath = freezed,Object? progress = null,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,url: null == url ? _self.url : url // ignore: cast_nullable_to_non_nullable
as String,filename: null == filename ? _self.filename : filename // ignore: cast_nullable_to_non_nullable
as String,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as TaskStatus,localPath: freezed == localPath ? _self.localPath : localPath // ignore: cast_nullable_to_non_nullable
as String?,progress: null == progress ? _self.progress : progress // ignore: cast_nullable_to_non_nullable
as double,
  ));
}

}


/// Adds pattern-matching-related methods to [DownloadItem].
extension DownloadItemPatterns on DownloadItem {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _DownloadItem value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _DownloadItem() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _DownloadItem value)  $default,){
final _that = this;
switch (_that) {
case _DownloadItem():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _DownloadItem value)?  $default,){
final _that = this;
switch (_that) {
case _DownloadItem() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String url,  String filename,  TaskStatus status,  String? localPath,  double progress)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _DownloadItem() when $default != null:
return $default(_that.id,_that.url,_that.filename,_that.status,_that.localPath,_that.progress);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String url,  String filename,  TaskStatus status,  String? localPath,  double progress)  $default,) {final _that = this;
switch (_that) {
case _DownloadItem():
return $default(_that.id,_that.url,_that.filename,_that.status,_that.localPath,_that.progress);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String url,  String filename,  TaskStatus status,  String? localPath,  double progress)?  $default,) {final _that = this;
switch (_that) {
case _DownloadItem() when $default != null:
return $default(_that.id,_that.url,_that.filename,_that.status,_that.localPath,_that.progress);case _:
  return null;

}
}

}

/// @nodoc


class _DownloadItem implements DownloadItem {
  const _DownloadItem({required this.id, required this.url, required this.filename, required this.status, required this.localPath, this.progress = 0.0});
  

@override final  String id;
@override final  String url;
@override final  String filename;
@override final  TaskStatus status;
@override final  String? localPath;
@override@JsonKey() final  double progress;

/// Create a copy of DownloadItem
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$DownloadItemCopyWith<_DownloadItem> get copyWith => __$DownloadItemCopyWithImpl<_DownloadItem>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _DownloadItem&&(identical(other.id, id) || other.id == id)&&(identical(other.url, url) || other.url == url)&&(identical(other.filename, filename) || other.filename == filename)&&(identical(other.status, status) || other.status == status)&&(identical(other.localPath, localPath) || other.localPath == localPath)&&(identical(other.progress, progress) || other.progress == progress));
}


@override
int get hashCode => Object.hash(runtimeType,id,url,filename,status,localPath,progress);

@override
String toString() {
  return 'DownloadItem(id: $id, url: $url, filename: $filename, status: $status, localPath: $localPath, progress: $progress)';
}


}

/// @nodoc
abstract mixin class _$DownloadItemCopyWith<$Res> implements $DownloadItemCopyWith<$Res> {
  factory _$DownloadItemCopyWith(_DownloadItem value, $Res Function(_DownloadItem) _then) = __$DownloadItemCopyWithImpl;
@override @useResult
$Res call({
 String id, String url, String filename, TaskStatus status, String? localPath, double progress
});




}
/// @nodoc
class __$DownloadItemCopyWithImpl<$Res>
    implements _$DownloadItemCopyWith<$Res> {
  __$DownloadItemCopyWithImpl(this._self, this._then);

  final _DownloadItem _self;
  final $Res Function(_DownloadItem) _then;

/// Create a copy of DownloadItem
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? url = null,Object? filename = null,Object? status = null,Object? localPath = freezed,Object? progress = null,}) {
  return _then(_DownloadItem(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,url: null == url ? _self.url : url // ignore: cast_nullable_to_non_nullable
as String,filename: null == filename ? _self.filename : filename // ignore: cast_nullable_to_non_nullable
as String,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as TaskStatus,localPath: freezed == localPath ? _self.localPath : localPath // ignore: cast_nullable_to_non_nullable
as String?,progress: null == progress ? _self.progress : progress // ignore: cast_nullable_to_non_nullable
as double,
  ));
}


}

// dart format on
