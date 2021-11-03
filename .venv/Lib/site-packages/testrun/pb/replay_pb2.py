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
  name='replay.proto',
  package='replay',
  syntax='proto2',
  serialized_pb=_b('\n\x0creplay.proto\x12\x06replay\"\x16\n\x05STR10\x12\r\n\x05value\x18\x04 \x02(\x05\"\x19\n\x08\x43hatType\x12\r\n\x05value\x18\x01 \x02(\x05\"\xb4\x01\n\x12\x43ontinuationEntity\x12\x0e\n\x06header\x18\x03 \x02(\t\x12\x11\n\ttimestamp\x18\x05 \x02(\x03\x12\n\n\x02s6\x18\x06 \x02(\x05\x12\n\n\x02s7\x18\x07 \x02(\x05\x12\n\n\x02s8\x18\x08 \x02(\x05\x12\n\n\x02s9\x18\t \x02(\x05\x12\x1a\n\x03s10\x18\n \x02(\x0b\x32\r.replay.STR10\x12\"\n\x08\x63hattype\x18\x0e \x02(\x0b\x32\x10.replay.ChatType\x12\x0b\n\x03s15\x18\x0f \x02(\x05\"=\n\x0c\x43ontinuation\x12-\n\x06\x65ntity\x18\xd4\x83\xb6J \x02(\x0b\x32\x1a.replay.ContinuationEntity')
)
_sym_db.RegisterFileDescriptor(DESCRIPTOR)




_STR10 = _descriptor.Descriptor(
  name='STR10',
  full_name='replay.STR10',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='value', full_name='replay.STR10.value', index=0,
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
  serialized_start=24,
  serialized_end=46,
)


_CHATTYPE = _descriptor.Descriptor(
  name='ChatType',
  full_name='replay.ChatType',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='value', full_name='replay.ChatType.value', index=0,
      number=1, type=5, cpp_type=1, label=2,
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
  serialized_start=48,
  serialized_end=73,
)


_CONTINUATIONENTITY = _descriptor.Descriptor(
  name='ContinuationEntity',
  full_name='replay.ContinuationEntity',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='header', full_name='replay.ContinuationEntity.header', index=0,
      number=3, type=9, cpp_type=9, label=2,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='timestamp', full_name='replay.ContinuationEntity.timestamp', index=1,
      number=5, type=3, cpp_type=2, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='s6', full_name='replay.ContinuationEntity.s6', index=2,
      number=6, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='s7', full_name='replay.ContinuationEntity.s7', index=3,
      number=7, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='s8', full_name='replay.ContinuationEntity.s8', index=4,
      number=8, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='s9', full_name='replay.ContinuationEntity.s9', index=5,
      number=9, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='s10', full_name='replay.ContinuationEntity.s10', index=6,
      number=10, type=11, cpp_type=10, label=2,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='chattype', full_name='replay.ContinuationEntity.chattype', index=7,
      number=14, type=11, cpp_type=10, label=2,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='s15', full_name='replay.ContinuationEntity.s15', index=8,
      number=15, type=5, cpp_type=1, label=2,
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
  serialized_start=76,
  serialized_end=256,
)


_CONTINUATION = _descriptor.Descriptor(
  name='Continuation',
  full_name='replay.Continuation',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='entity', full_name='replay.Continuation.entity', index=0,
      number=156074452, type=11, cpp_type=10, label=2,
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
  serialized_start=258,
  serialized_end=319,
)

_CONTINUATIONENTITY.fields_by_name['s10'].message_type = _STR10
_CONTINUATIONENTITY.fields_by_name['chattype'].message_type = _CHATTYPE
_CONTINUATION.fields_by_name['entity'].message_type = _CONTINUATIONENTITY
DESCRIPTOR.message_types_by_name['STR10'] = _STR10
DESCRIPTOR.message_types_by_name['ChatType'] = _CHATTYPE
DESCRIPTOR.message_types_by_name['ContinuationEntity'] = _CONTINUATIONENTITY
DESCRIPTOR.message_types_by_name['Continuation'] = _CONTINUATION

STR10 = _reflection.GeneratedProtocolMessageType('STR10', (_message.Message,), dict(
  DESCRIPTOR = _STR10,
  __module__ = 'replay_pb2'
  # @@protoc_insertion_point(class_scope:replay.STR10)
  ))
_sym_db.RegisterMessage(STR10)

ChatType = _reflection.GeneratedProtocolMessageType('ChatType', (_message.Message,), dict(
  DESCRIPTOR = _CHATTYPE,
  __module__ = 'replay_pb2'
  # @@protoc_insertion_point(class_scope:replay.ChatType)
  ))
_sym_db.RegisterMessage(ChatType)

ContinuationEntity = _reflection.GeneratedProtocolMessageType('ContinuationEntity', (_message.Message,), dict(
  DESCRIPTOR = _CONTINUATIONENTITY,
  __module__ = 'replay_pb2'
  # @@protoc_insertion_point(class_scope:replay.ContinuationEntity)
  ))
_sym_db.RegisterMessage(ContinuationEntity)

Continuation = _reflection.GeneratedProtocolMessageType('Continuation', (_message.Message,), dict(
  DESCRIPTOR = _CONTINUATION,
  __module__ = 'replay_pb2'
  # @@protoc_insertion_point(class_scope:replay.Continuation)
  ))
_sym_db.RegisterMessage(Continuation)


# @@protoc_insertion_point(module_scope)
