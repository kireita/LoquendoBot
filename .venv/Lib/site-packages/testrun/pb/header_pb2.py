# flake8: noqa
import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
from google.protobuf import descriptor_pb2
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='header.proto',
  package='',
  syntax='proto2',
  serialized_pb=_b('\n\x0cheader.proto\"\x13\n\x05Video\x12\n\n\x02id\x18\x01 \x02(\t\"#\n\nHeaderInfo\x12\x15\n\x05video\x18\x01 \x02(\x0b\x32\x06.Video\"7\n\x06Header\x12\x19\n\x04info\x18\x01 \x02(\x0b\x32\x0b.HeaderInfo\x12\x12\n\nterminator\x18\x04 \x02(\x05')
)
_sym_db.RegisterFileDescriptor(DESCRIPTOR)




_VIDEO = _descriptor.Descriptor(
  name='Video',
  full_name='Video',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='Video.id', index=0,
      number=1, type=9, cpp_type=9, label=2,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=16,
  serialized_end=35,
)


_HEADERINFO = _descriptor.Descriptor(
  name='HeaderInfo',
  full_name='HeaderInfo',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='video', full_name='HeaderInfo.video', index=0,
      number=1, type=11, cpp_type=10, label=2,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=37,
  serialized_end=72,
)


_HEADER = _descriptor.Descriptor(
  name='Header',
  full_name='Header',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='info', full_name='Header.info', index=0,
      number=1, type=11, cpp_type=10, label=2,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='terminator', full_name='Header.terminator', index=1,
      number=4, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=74,
  serialized_end=129,
)

_HEADERINFO.fields_by_name['video'].message_type = _VIDEO
_HEADER.fields_by_name['info'].message_type = _HEADERINFO
DESCRIPTOR.message_types_by_name['Video'] = _VIDEO
DESCRIPTOR.message_types_by_name['HeaderInfo'] = _HEADERINFO
DESCRIPTOR.message_types_by_name['Header'] = _HEADER

Video = _reflection.GeneratedProtocolMessageType('Video', (_message.Message,), dict(
  DESCRIPTOR = _VIDEO,
  __module__ = 'header_pb2'
  # @@protoc_insertion_point(class_scope:Video)
  ))
_sym_db.RegisterMessage(Video)

HeaderInfo = _reflection.GeneratedProtocolMessageType('HeaderInfo', (_message.Message,), dict(
  DESCRIPTOR = _HEADERINFO,
  __module__ = 'header_pb2'
  # @@protoc_insertion_point(class_scope:HeaderInfo)
  ))
_sym_db.RegisterMessage(HeaderInfo)

Header = _reflection.GeneratedProtocolMessageType('Header', (_message.Message,), dict(
  DESCRIPTOR = _HEADER,
  __module__ = 'header_pb2'
  # @@protoc_insertion_point(class_scope:Header)
  ))
_sym_db.RegisterMessage(Header)


# @@protoc_insertion_point(module_scope)
