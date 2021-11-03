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
  name='header_replay.proto',
  package='',
  syntax='proto2',
  serialized_pb=_b('\n\x13header_replay.proto\"\x18\n\x04S1_3\x12\x10\n\x08video_id\x18\x01 \x02(\t\",\n\x04S1_5\x12\x12\n\nchannel_id\x18\x01 \x02(\t\x12\x10\n\x08video_id\x18\x02 \x02(\t\"0\n\x02S1\x12\x14\n\x05node0\x18\x03 \x02(\x0b\x32\x05.S1_3\x12\x14\n\x05node1\x18\x05 \x02(\x0b\x32\x05.S1_5\"\x1f\n\x0bS3_48687757\x12\x10\n\x08video_id\x18\x01 \x02(\t\"#\n\x02S3\x12\x1d\n\x04node\x18\x8d\xd5\x9b\x17 \x02(\x0b\x32\x0c.S3_48687757\"H\n\x0cHeaderReplay\x12\x11\n\x04info\x18\x01 \x02(\x0b\x32\x03.S1\x12\x11\n\x04\x62ody\x18\x03 \x02(\x0b\x32\x03.S3\x12\x12\n\nterminater\x18\x04 \x02(\x05')
)
_sym_db.RegisterFileDescriptor(DESCRIPTOR)




_S1_3 = _descriptor.Descriptor(
  name='S1_3',
  full_name='S1_3',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='video_id', full_name='S1_3.video_id', index=0,
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
  serialized_start=23,
  serialized_end=47,
)


_S1_5 = _descriptor.Descriptor(
  name='S1_5',
  full_name='S1_5',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='channel_id', full_name='S1_5.channel_id', index=0,
      number=1, type=9, cpp_type=9, label=2,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='video_id', full_name='S1_5.video_id', index=1,
      number=2, type=9, cpp_type=9, label=2,
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
  serialized_start=49,
  serialized_end=93,
)


_S1 = _descriptor.Descriptor(
  name='S1',
  full_name='S1',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='node0', full_name='S1.node0', index=0,
      number=3, type=11, cpp_type=10, label=2,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='node1', full_name='S1.node1', index=1,
      number=5, type=11, cpp_type=10, label=2,
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
  serialized_start=95,
  serialized_end=143,
)


_S3_48687757 = _descriptor.Descriptor(
  name='S3_48687757',
  full_name='S3_48687757',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='video_id', full_name='S3_48687757.video_id', index=0,
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
  serialized_start=145,
  serialized_end=176,
)


_S3 = _descriptor.Descriptor(
  name='S3',
  full_name='S3',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='node', full_name='S3.node', index=0,
      number=48687757, type=11, cpp_type=10, label=2,
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
  serialized_start=178,
  serialized_end=213,
)


_HEADERREPLAY = _descriptor.Descriptor(
  name='HeaderReplay',
  full_name='HeaderReplay',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='info', full_name='HeaderReplay.info', index=0,
      number=1, type=11, cpp_type=10, label=2,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='body', full_name='HeaderReplay.body', index=1,
      number=3, type=11, cpp_type=10, label=2,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='terminater', full_name='HeaderReplay.terminater', index=2,
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
  serialized_start=215,
  serialized_end=287,
)

_S1.fields_by_name['node0'].message_type = _S1_3
_S1.fields_by_name['node1'].message_type = _S1_5
_S3.fields_by_name['node'].message_type = _S3_48687757
_HEADERREPLAY.fields_by_name['info'].message_type = _S1
_HEADERREPLAY.fields_by_name['body'].message_type = _S3
DESCRIPTOR.message_types_by_name['S1_3'] = _S1_3
DESCRIPTOR.message_types_by_name['S1_5'] = _S1_5
DESCRIPTOR.message_types_by_name['S1'] = _S1
DESCRIPTOR.message_types_by_name['S3_48687757'] = _S3_48687757
DESCRIPTOR.message_types_by_name['S3'] = _S3
DESCRIPTOR.message_types_by_name['HeaderReplay'] = _HEADERREPLAY

S1_3 = _reflection.GeneratedProtocolMessageType('S1_3', (_message.Message,), dict(
  DESCRIPTOR = _S1_3,
  __module__ = 'header_replay_pb2'
  # @@protoc_insertion_point(class_scope:S1_3)
  ))
_sym_db.RegisterMessage(S1_3)

S1_5 = _reflection.GeneratedProtocolMessageType('S1_5', (_message.Message,), dict(
  DESCRIPTOR = _S1_5,
  __module__ = 'header_replay_pb2'
  # @@protoc_insertion_point(class_scope:S1_5)
  ))
_sym_db.RegisterMessage(S1_5)

S1 = _reflection.GeneratedProtocolMessageType('S1', (_message.Message,), dict(
  DESCRIPTOR = _S1,
  __module__ = 'header_replay_pb2'
  # @@protoc_insertion_point(class_scope:S1)
  ))
_sym_db.RegisterMessage(S1)

S3_48687757 = _reflection.GeneratedProtocolMessageType('S3_48687757', (_message.Message,), dict(
  DESCRIPTOR = _S3_48687757,
  __module__ = 'header_replay_pb2'
  # @@protoc_insertion_point(class_scope:S3_48687757)
  ))
_sym_db.RegisterMessage(S3_48687757)

S3 = _reflection.GeneratedProtocolMessageType('S3', (_message.Message,), dict(
  DESCRIPTOR = _S3,
  __module__ = 'header_replay_pb2'
  # @@protoc_insertion_point(class_scope:S3)
  ))
_sym_db.RegisterMessage(S3)

HeaderReplay = _reflection.GeneratedProtocolMessageType('HeaderReplay', (_message.Message,), dict(
  DESCRIPTOR = _HEADERREPLAY,
  __module__ = 'header_replay_pb2'
  # @@protoc_insertion_point(class_scope:HeaderReplay)
  ))
_sym_db.RegisterMessage(HeaderReplay)


# @@protoc_insertion_point(module_scope)
